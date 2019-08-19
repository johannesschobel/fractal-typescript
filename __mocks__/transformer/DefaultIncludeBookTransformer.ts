import {TransformerAbstract} from '../../src/TransformerAbstract';
import {GenericAuthorTransformer} from './GenericAuthorTransformer';

export class DefaultIncludeBookTransformer extends TransformerAbstract {
    protected defaultIncludes = [
        'author'
    ];

    public transform() {
        return {
            a: 'b'
        }
    }

    public includeAuthor() {
        return this.item({c: 'd'}, new GenericAuthorTransformer());
    }
}
