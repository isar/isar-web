import { Index } from "./indices";

export class ObjectStore {
    name: string;
    indices: Index[];
    key: string | undefined;

    constructor(name: string, indices: Index[], primaryKey?: string) {
        this.name = name;
        this.indices = indices;
        this.key = primaryKey;
    }
}