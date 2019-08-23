import {TransformerAbstract} from '../../src/TransformerAbstract';
import {GenericAuthorTransformer} from './GenericAuthorTransformer';
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

    public includeAuthor(book: JsonApicBookInterface){
        if (book._author !== undefined) {
            return;
        }

        if (book._author === null) {
            return this.null();
        }

        return this.item(book._author, new JsonApiBookTransformer(), 'people');
    }

    public includeAuthorWithMeta(book: JsonApicBookInterface) {
        if (book._author !== undefined) {
            return;
        }

        if (book._author === null) {
            return this.null();
        }

        return this.item(book._author, new JsonApiBookTransformer(), 'people').setMeta({foo: 'bar'});
    }

    public includeCoAuthor(book: JsonApicBookInterface){
        if (book._co_author !== undefined) {
            return;
        }

        if (book._co_author === null) {
            return this.null();
        }

        return this.item(book._co_author, new JsonApiBookTransformer(), 'people');
    }
}
