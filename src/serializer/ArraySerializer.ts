import {CursorInterface} from '../paginaton/CursorInterface';
import {PaginatorInterface} from '../paginaton/PaginatorInterface';
import {ResourceInterface} from '../resource/ResourceInterface';
import {SerializerAbstract} from '../serializer/SerializerAbstract';

export class ArraySerializer extends SerializerAbstract {

    public collection(resourceKey: string, data: {}): {} {
        if (resourceKey === null) {
            return resourceKey;
        } else {
            const returnValue = {};
            // @ts-ignore
            const test = returnValue[resourceKey] = [];
            // @ts-ignore
            test[resourceKey] = data;
            return test;
        }
    }

    public item(resourceKey: string, data: {}): {} {
        return data;
    }

    public null(): any {
        return null;
    }

    public includedData(resource: ResourceInterface, data: any[]): any {
        return data;
    }

    public meta(meta: any[]): any {
        if (meta === undefined || meta.length === 0) {
            return [];
        }
        return {
            meta
        };
    }

    public paginator(paginator: PaginatorInterface): any {
        const currentPage = paginator.getCurrentPage();
        const lastPage = paginator.getLastPage();

        const pagination = {
            count: paginator.getCount(),
            current_page: currentPage,
            links: {
                next: '',
                previous: ''
            },
            per_page: paginator.getPerPage(),
            total: paginator.getTotal(),
            total_pages: lastPage
        };

        if (currentPage > 1) {
            pagination.links.previous = paginator.getUrl(currentPage - 1);
        }

        if (currentPage < lastPage) {
            pagination.links.next = paginator.getUrl(currentPage + 1);
        }

        return {
            pagination
        };
    }

    public cursor(cursor: CursorInterface): any {
        return {
            cursor: {
                count: cursor.getCount(),
                current: cursor.getCurrent(),
                next: cursor.getNext(),
                prev: cursor.getPrev()
            }
        };
    }

}
