export class Index {
    name: string;
    isUnique: boolean;

    constructor(indexName: string, isUnique: boolean) {
        this.name = indexName;
        this.isUnique = isUnique;
    }
}