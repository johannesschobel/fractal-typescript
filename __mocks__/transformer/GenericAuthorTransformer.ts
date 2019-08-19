import {TransformerAbstract} from '../../src/TransformerAbstract';

export class GenericAuthorTransformer extends TransformerAbstract {

    public transform(author: any): any {
        return author;
    }

}
