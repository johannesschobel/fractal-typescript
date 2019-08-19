import {TransformerAbstract} from '../../../src/TransformerAbstract';

export class NullIncludeBookTransformer extends TransformerAbstract {
    protected defaultIncludes = [
        'author'
    ];

    public transform() {
        return {
            a: 'b'
        }
    }

    public includeAuthor() {
        return this.null();
    }
}
