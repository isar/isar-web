"use strict";
// Tests for the put and get operations of IndexedDB.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var ava_1 = __importDefault(require("ava"));
require("fake-indexeddb/auto");
var txn;
ava_1.default.before(function () { return __awaiter(void 0, void 0, void 0, function () {
    var indices, store;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                indices = [new index_1.Index("id", true), new index_1.Index("age", false)];
                store = new index_1.ObjectStore("OS", indices, "id");
                return [4 /*yield*/, index_1.db_open("DB", 1, store)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.beforeEach(function () {
    txn = index_1.open_txn("DB", "OS", false);
});
// Test Execution Order:
// The before hook runs first.
// put #1, put #2, and put #3 run sequentially, with the beforeEach hook before each.
// The get operations then run asynchronously (and possibly concurrently), with the beforeEach hook before each.
ava_1.default.serial('put #1 should resolve', function () {
    return index_1.put(txn, { id: "123", age: 12 });
});
ava_1.default('get (primary key from put #1) should return object from put #1', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                return [4 /*yield*/, index_1.get(txn, "123")];
            case 1:
                data = _a.sent();
                t.true(data.id == "123" && data.age == 12);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial('put #2 (with duplicate primary key) should fail', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, index_1.put(txn, { id: "123", age: 15 })];
            case 1:
                _a.sent();
                t.fail();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                t.pass();
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
ava_1.default('get (primary key from put #1 & 2) should return object from put #1', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                return [4 /*yield*/, index_1.get(txn, "123")];
            case 1:
                data = _a.sent();
                t.true(data.id == "123" && data.age == 12);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial('put #3 (with new primary key) should resolve', function () {
    return index_1.put(txn, { id: "321", age: 13 });
});
ava_1.default('get (primary key from put #3) should return object from put #3', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t.plan(1);
                return [4 /*yield*/, index_1.get(txn, "321")];
            case 1:
                data = _a.sent();
                t.true(data.id == "321" && data.age == 13);
                return [2 /*return*/];
        }
    });
}); });
