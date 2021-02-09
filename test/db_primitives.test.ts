import { db_open } from '../src/index';

test('opening a database resolves correctly', () => {
    expect(db_open).resolves;
});