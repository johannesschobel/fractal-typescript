export class TransformationResult {
    public data: {} | any;
    public meta?: {};

    constructor(data: {}, meta: {}) {
        this.data = data;
        this.meta = meta;
    }
}
