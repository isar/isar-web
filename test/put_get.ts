// Tests for the put and get operations of IndexedDB.

import { put, db_open, open_txn, Index, ObjectStore, get } from "../src/index";
import test from 'ava';
import 'fake-indexeddb/auto';

let txn : IDBTransaction;

test.before(async () => {
    const indices = [new Index("id", true), new Index("age", false)];
    const store = new ObjectStore("OS", indices, "id");

    await db_open("DB", 1, store);
});

test.beforeEach(() => {
    txn = open_txn("DB", "OS", false);
});

// Test Execution Order:
// The before hook runs first.
// put #1, put #2, and put #3 run sequentially, with the beforeEach hook before each.
// The get operations then run asynchronously (and possibly concurrently), with the beforeEach hook before each.

test.serial('put #1 should resolve', () => {
    return put(txn, {id: "123", age: 12});
});

test('get (primary key from put #1) should return object from put #1', async t => {
    t.plan(1);
    const data : any = await get(txn, "123");
    t.true(data.id == "123" && data.age == 12);
});

test.serial('put #2 (with duplicate primary key) should fail', async t => {
    try {
        await put(txn, { id: "123", age: 15 });
        t.fail();
    } catch (e) {
        t.pass();
    }
});

test('get (primary key from put #1 & 2) should return object from put #1', async t => {
    t.plan(1);
    const data : any = await get(txn, "123");
    t.true(data.id == "123" && data.age == 12);
});

test.serial('put #3 (with new primary key) should resolve', () => {
    return put(txn, {id: "321", age: 13});
});

test('get (primary key from put #3) should return object from put #3', async t => {
    t.plan(1);
    const data : any = await get(txn, "321");
    t.true(data.id == "321" && data.age == 13);
});