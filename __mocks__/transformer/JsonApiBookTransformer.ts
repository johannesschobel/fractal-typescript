import {TransformerAbstract} from '../../src/TransformerAbstract';
import {JsonApiAuthorTransformer} from './JsonApiAuthorTransformer';
import {JsonApicBookInterface} from './JsonApiBookInterface';

export class JsonApiBookTransformer extends TransformerAbstract {

    protected tempAuthor = {};
    protected tempCoAuthor = {};
    protected availableIncludes = [
        'author',
        'co-author',
        'author-with-meta'
    ];

    public transform(book: JsonApicBookInterface) {
        this.tempAuthor = book._author;
        delete book._author;
        this.tempCoAuthor = book._co_author;
        delete book._co_author;
        return book;
    }

    public includeAuthor(book: JsonApicBookInterface) {
        if (book._author !== undefined) {
            return;
        }

        if (book._author === null) {
            return this.null();
        }

        return this.item(this.tempAuthor, new JsonApiAuthorTransformer(), 'people');
    }

    public includeAuthorWithMeta(book: JsonApicBookInterface) {
        if (book._author !== undefined) {
            return;
        }

        if (book._author === null) {
            return this.null();
        }
        const resource = this.item(this.tempAuthor, new JsonApiAuthorTransformer(), 'people');
        resource.setMeta({foo: 'bar'});
        return resource;
    }

    public includeCoAuthor(book: JsonApicBookInterface) {
        if (book._co_author !== undefined) {
            return;
        }

        if (book._co_author === null) {
            return this.null();
        }

        return this.item(this.tempCoAuthor, new JsonApiAuthorTransformer(), 'people');
    }
}
