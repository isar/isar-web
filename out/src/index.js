"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStore = exports.Index = void 0;
var indices_1 = require("./primitives/indices");
Object.defineProperty(exports, "Index", { enumerable: true, get: function () { return indices_1.Index; } });
var object_store_1 = require("./primitives/object_store");
Object.defineProperty(exports, "ObjectStore", { enumerable: true, get: function () { return object_store_1.ObjectStore; } });
__exportStar(require("./primitives/db_primitives"), exports);
