"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_open = void 0;
var openDBs = {};
// Note that version MUST be an integer.
function db_open(name, version) {
    return new Promise(function (resolve, reject) {
        var request = window.indexedDB.open(name, version);
        request.onerror = function (error) { return reject('Error opening database: ' + error); };
        request.onsuccess = function () {
            openDBs[name] = request.result;
            resolve();
        };
    });
}
exports.db_open = db_open;
