import { db_open, Index, ObjectStore } from "../src/index";
import test from 'ava';
import 'fake-indexeddb/auto';

test.serial('DB open operation should resolve', () => {
    const indices = [new Index("id", true), new Index("age", false)];
    const stores = [new ObjectStore("OS", indices, "id")];

    db_open("open", 1, stores);
});

test.serial('DB open operation with incremented version should resolve', () => {
    const indices = [new Index("id", true), new Index("age", false)];
    const stores = [new ObjectStore("OS", indices, "id")];

    db_open("open", 2, stores);
});

test.serial('DB open operation with incremented version + new schema should resolve', () => {
    const indices = [new Index("id", true), new Index("age", false), new Index("pos", false)];
    const stores = [new ObjectStore("OS", indices, "id")];

    db_open("open", 3, stores);
});