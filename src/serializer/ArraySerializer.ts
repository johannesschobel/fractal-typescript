import {CursorInterface} from '../paginaton/CursorInterface';
import {PaginatorInterface} from '../paginaton/PaginatorInterface';
import {ResourceInterface} from '../resource/ResourceInterface';
import {SerializerAbstract} from '../serializer/SerializerAbstract';

export class ArraySerializer extends SerializerAbstract {

    public collection(resourceKey: string, data: any[]): any[] {
        // todo: implement this
        return null;
    }

    public item(resourceKey: string, data: any[]): any[] {
        return data;
    }

    public null(): any[] {
        return [];
    }

    public includedData(resource: ResourceInterface, data: any[]): any[] {
        return data;
    }

    public meta(meta: any[]): any {
        if (meta === undefined || meta.length === 0) {
            return [];
        }
        return {
            '{meta}': meta
        };
    }

    public paginator(paginator: PaginatorInterface): any[] {
        // todo: implement this
        return undefined;
    }

    public cursor(cursor: CursorInterface): any[] {
        // todo: implement this
        return undefined;
    }

}
