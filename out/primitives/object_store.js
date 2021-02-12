"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStore = void 0;
var ObjectStore = /** @class */ (function () {
    function ObjectStore(name, indices, primaryKey) {
        this.name = name;
        this.indices = indices;
        this.key = primaryKey;
    }
    return ObjectStore;
}());
exports.ObjectStore = ObjectStore;
