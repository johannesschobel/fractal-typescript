import {PaginatorInterface} from '../../../src/paginaton/PaginatorInterface';

export class PaginatorMock implements PaginatorInterface {
    public getCount(): number {
        return 0;
    }

    public getCurrentPage(): number {
        return 0;
    }

    public getLastPage(): number {
        return 0;
    }

    public getPerPage(): number {
        return 0;
    }

    public getTotal(): number {
        return 0;
    }

    public getUrl(page: number): string {
        return '';
    }

}
