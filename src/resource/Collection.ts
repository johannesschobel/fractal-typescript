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
        return this.hasPaginatorInterface(this.paginator)
    }

    public getCursor(): CursorInterface {
        return this.cursor;
    }

    public hasCursor(): boolean {
        return this.hasCursorInterface(this.cursor);
    }

    public setPaginator(paginator: PaginatorInterface): this {
        this.paginator = paginator;
        return this;
    }

    public setCursor(cursor: CursorInterface): this {
        this.cursor = cursor;
        return this;
    }

    private hasCursorInterface(cursor: CursorInterface | PaginatorInterface): cursor is CursorInterface {
        if (cursor === undefined) {
            return false;
        } else {
            return (cursor as CursorInterface).getCurrent() !== undefined;
        }
    }

    private hasPaginatorInterface(paginator: PaginatorInterface | CursorInterface): paginator is PaginatorInterface {
        if (paginator === undefined) {
            return false;
        } else {
            return (paginator as PaginatorInterface).getCurrentPage() !== undefined;
        }
    }
}
