import {TransformerAbstract} from '../../src/TransformerAbstract';

export class PrimitiveIncludeBookTransformer extends TransformerAbstract {
    protected defaultIncludes = [
        'price'
    ];

    public transform() {
        return {
            a: 'b'
        }
    }

    public includePrice(book: any[]) {
        // @ts-ignore
        // tslint:disable-next-line:only-arrow-functions
        return this.primitive(book.price, function () {
            return this;
        });
    }
}
