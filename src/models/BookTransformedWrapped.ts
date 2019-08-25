import {BookTransformed} from '~/models/BookTransformed';

export class BookTransformedWrapped {
    public data: BookTransformed[];
    public meta?: {};

    constructor(data: BookTransformed[], meta: {}) {
        this.data = data;
        this.meta = meta;
    }
}
