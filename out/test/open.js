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
    var store = new index_1.ObjectStore("OS", indices, "id");
    index_1.db_open("DB", 1, store);
});
