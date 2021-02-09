const openDBs: { [name: string]: IDBDatabase} = {};

// Note that version MUST be an integer.
export function db_open (name: string, version: number) : Promise<void> {
    return new Promise(function (resolve, reject) {
        const request = window.indexedDB.open(name, version);
        request.onerror = (error) => reject('Error opening database: ' + error);
        request.onsuccess = function () { 
            openDBs[name] = request.result;
            resolve();
        }
    });
}