import {TransformerAbstract} from '../../src/TransformerAbstract';
import {JsonApiBookTransformer} from './JsonApiBookTransformer';

export class JsonApiAuthorTransformer extends TransformerAbstract {

    protected availableIncludes = [
        'published'
    ];

    public transform(author: {}) {
        // @ts-ignore
        delete author._published;
        return author;
    }

    public includePublished(author: {}) {
        // @ts-ignore
        return this.collection(author._published, new JsonApiBookTransformer(), 'books');
    }

}
