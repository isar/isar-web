import { db_open, Index, ObjectStore } from "../src/index";
import test from 'ava';
import 'fake-indexeddb/auto';

test('DB open operation should resolve', async () => {
    const indices = [new Index("id", true), new Index("age", false)];
    const store = new ObjectStore("OS", indices, "id");

    await db_open("DB", 1, store);
});