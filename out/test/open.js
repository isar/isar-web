"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var ava_1 = __importDefault(require("ava"));
require("fake-indexeddb/auto");
ava_1.default.serial('DB open operation should resolve', function () {
    var indices = [new index_1.Index("id", true), new index_1.Index("age", false)];
    var stores = [new index_1.ObjectStore("OS", indices, "id")];
    index_1.db_open("open", 1, stores);
});
ava_1.default.serial('DB open operation with incremented version should resolve', function () {
    var indices = [new index_1.Index("id", true), new index_1.Index("age", false)];
    var stores = [new index_1.ObjectStore("OS", indices, "id")];
    index_1.db_open("open", 2, stores);
});
ava_1.default.serial('DB open operation with incremented version + new schema should resolve', function () {
    var indices = [new index_1.Index("id", true), new index_1.Index("age", false), new index_1.Index("pos", false)];
    var stores = [new index_1.ObjectStore("OS", indices, "id")];
    index_1.db_open("open", 3, stores);
});
