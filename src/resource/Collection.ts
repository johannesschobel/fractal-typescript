import {CursorInterface} from '../paginaton/CursorInterface';
import {PaginatorInterface} from '../paginaton/PaginatorInterface';
import {ResourceAbstract} from '../resource/ResourceAbstract';

export class Collection extends ResourceAbstract {

    protected data: any[];
    protected paginator: PaginatorInterface;
    protected cursor: CursorInterface;

    public getPaginator(): PaginatorInterface {
        return this.paginator;
    }

    public hasPaginator(): boolean {
        // todo implement this
        // return this.paginator instanceof PaginatorInterface;
        return null;
    }

    public getCursor(): CursorInterface {
        return this.cursor;
    }

    public hasCursor(): boolean {
        // todo implement this
        // return this.cursor instanceof CursorInterface;
        return null;
    }

    public setPaginator(paginator: PaginatorInterface): this {
        this.paginator = paginator;
        return this;
    }

    public setCursor(cursor: CursorInterface): this {
        this.cursor = cursor;
        return this;
    }
}
