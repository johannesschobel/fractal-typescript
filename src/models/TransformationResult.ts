export class TransformationResult<T>  {
    public data: T[];
    public meta?: {};

    constructor(data: T[], meta: {}) {
        this.data = data;
        this.meta = meta;
    }
}
