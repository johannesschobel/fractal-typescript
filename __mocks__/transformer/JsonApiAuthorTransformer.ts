import {TransformerAbstract} from '../../src/TransformerAbstract';
import {JsonApiBookTransformer} from './JsonApiBookTransformer';

export class JsonApiAuthorTransformer extends TransformerAbstract {

    protected tempPublished = '';
    protected availableIncludes = [
        'published'
    ];

    public transform(author: {}) {
        // @ts-ignore
        this.tempPublished = author._published;
        // @ts-ignore
        delete author._published;
        return author;
    }

    public includePublished(author: {}) {
        // @ts-ignore
        return this.collection(this.tempPublished, null, new JsonApiBookTransformer(), 'books');
    }

}
