import { Index } from "./indices";
import { ObjectStore } from "./object_store";

// IndexedDB is structured like this:
// Database: application creates databases
// Object Stores: children of databases, with imposed schemas
//
// Schemas + indices are imposed on object stores, not databases.
// Source: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

// Currently opening a new database for each object store.
// Opening a db is costly but more DBs increases transaction throughput and ease of schema migration.
// TODO: Possibly inline name attributes (e.g. dbName == storeName).

const openDBs: { [name: string]: IDBDatabase } = {};

// Note that version MUST be an integer.
//
// If you want to update the schema (indices), then you should increase the version number,
// which will trigger a schema migration. Never decrease the version number.
export function db_open(dbName: string, version: number, storeAttr: ObjectStore): Promise<void> {
    return new Promise(function (resolve, reject) {
        const request = indexedDB.open(dbName, version);
        
        request.onerror = (error) => reject('Error opening database: ' + error);
        request.onsuccess = function () {
            openDBs[dbName] = request.result;
            resolve();
        }
        request.onupgradeneeded = function () {
            const db = request.result;
            let store;
            if (storeAttr.key) {
                store = db.createObjectStore(storeAttr.name, { keyPath: storeAttr.key });
            } else {
                store = db.createObjectStore(storeAttr.name, { autoIncrement: true });
            }
            for (let i = 0; i < storeAttr.indices.length; i++) {
                const index : Index = storeAttr.indices[i];
                store.createIndex(index.name, index.name, { unique: index.isUnique });
            }
            store.transaction.oncomplete = (() => {
                openDBs[dbName] = db;
                resolve();
            });
        }
    });
}

// readOnly should equal true if this transaction is read-only and false if it is 
// read-write.
//
// Multiple read-only transactions can run at once, but only one read-write transaction
// can be run at once.
//
// Note that IndexedDB transactions automatically commit if inactive for some period of
// time. They cannot be committed manually.
export function open_txn(dbName: string, storeName: string, readOnly: boolean): IDBTransaction {
    return openDBs[dbName].transaction(storeName, readOnly ? "readonly" : "readwrite");
}

// Gets a single value where the primary key is == key. If you did not specify a primary key,
// the primary key is equal to an integer counter >= 1, which is incremented each time a
// new object is added.
export function get(txn: IDBTransaction, key: string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey | IDBKeyRange): Promise<unknown> {
    const req = txn.objectStore(txn.objectStoreNames[0]).get(key);
    return new Promise<unknown>((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

export function put(txn: IDBTransaction, content: Object) : Promise<void> {
    const store = txn.objectStore(txn.objectStoreNames[0]);
    let req = store.add(content);
    return new Promise<void>((resolve, reject) => {
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}