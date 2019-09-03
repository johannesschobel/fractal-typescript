import {PaginatorInterface} from '../../src/paginaton/PaginatorInterface';

export class PaginatorMock implements PaginatorInterface {
    public getCount(): number {
        return 100;
    }

    public getCurrentPage(): number {
        return 5;
    }

    public getLastPage(): number {
        return 10;
    }

    public getPerPage(): number {
        return 10;
    }

    public getTotal(): number {
        return 100;
    }

    public getUrl(page: number): string {
        return '';
    }

}
