import { db_open, Index, ObjectStore } from "../src/index";
import test from 'ava';
import 'fake-indexeddb/auto';

test.serial('DB open operation should resolve', () => {
    const indices = [new Index("id", true), new Index("age", false)];
    const store = new ObjectStore("OS", indices, "id");

    db_open("DB", 1, store);
});