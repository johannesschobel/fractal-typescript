import {TransformerAbstract} from '../../src/TransformerAbstract';
import {GenericAuthorTransformer} from './GenericAuthorTransformer';
import {GenericBookInterface} from './GenericBookInterface';

export class GenericBookTransformer extends TransformerAbstract {

    protected tempAuthor = {};
    protected availableIncludes = [
        'author'
    ];

    public transform(book: GenericBookInterface) {
        this.tempAuthor = book._author;
        delete book._author;
        return book;
    }

    public includeAuthor(book: GenericBookInterface) {
        return this.item(this.tempAuthor, new GenericAuthorTransformer(), 'author');
    }
}
