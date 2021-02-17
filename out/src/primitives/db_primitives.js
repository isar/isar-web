"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.get = exports.open_txn = exports.db_open = void 0;
// IndexedDB is structured like this:
// Database: application creates databases
// Object Stores: children of databases, with imposed schemas
//
// Schemas + indices are imposed on object stores, not databases.
// Source: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
var openDBs = {};
// Note that version MUST be an integer.
//
// If you want to update the schema (indices), then you should increase the version number,
// which will trigger a schema migration. Never decrease the version number.
function db_open(dbName, version, stores) {
    return new Promise(function (resolve, reject) {
        var request = indexedDB.open(dbName, version);
        request.onerror = function (error) { return reject('Error opening database: ' + error); };
        request.onsuccess = function () {
            openDBs[dbName] = request.result;
            resolve();
        };
        var promises = [];
        request.onupgradeneeded = function () {
            var db = request.result;
            openDBs[dbName] = db;
            var _loop_1 = function (i) {
                var storeAttr = stores[i];
                var store;
                if (storeAttr.key) {
                    store = db.createObjectStore(storeAttr.name, { keyPath: storeAttr.key });
                }
                else {
                    store = db.createObjectStore(storeAttr.name, { autoIncrement: true });
                }
                for (var i_1 = 0; i_1 < storeAttr.indices.length; i_1++) {
                    var index = storeAttr.indices[i_1];
                    store.createIndex(index.name, index.name, { unique: index.isUnique });
                }
                promises.push(new Promise(function (resolve, reject) {
                    store.transaction.oncomplete = (function () {
                        resolve();
                    });
                    store.transaction.onerror = function (err) { return reject(err); };
                }));
            };
            for (var i = 0; i < stores.length; i++) {
                _loop_1(i);
            }
            Promise.all(promises).catch(function (err) { return reject(err); }).then(function () { return resolve(); });
        };
    });
}
exports.db_open = db_open;
// readOnly should equal true if this transaction is read-only and false if it is 
// read-write.
//
// Multiple read-only transactions can run at once, but only one read-write transaction
// can be run at once.
//
// Note that IndexedDB transactions automatically commit if inactive for some period of
// time. They cannot be committed manually.
function open_txn(dbName, storeName, readOnly) {
    return openDBs[dbName].transaction(storeName, readOnly ? "readonly" : "readwrite");
}
exports.open_txn = open_txn;
// Gets a single value where the primary key is == key. If you did not specify a primary key,
// the primary key is equal to an integer counter >= 1, which is incremented each time a
// new object is added.
function get(txn, key) {
    var req = txn.objectStore(txn.objectStoreNames[0]).get(key);
    return new Promise(function (resolve, reject) {
        req.onsuccess = function () { return resolve(req.result); };
        req.onerror = function () { return reject(req.error); };
    });
}
exports.get = get;
function put(txn, content) {
    var store = txn.objectStore(txn.objectStoreNames[0]);
    var req = store.add(content);
    return new Promise(function (resolve, reject) {
        req.onsuccess = function () { return resolve(); };
        req.onerror = function () { return reject(req.error); };
    });
}
exports.put = put;
