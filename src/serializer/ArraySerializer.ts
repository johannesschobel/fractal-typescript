import {SerializerAbstract} from "../serializer/SerializerAbstract";
import {ResourceInterface} from "../resource/ResourceInterface";
import {PaginatorInterface} from "../paginaton/PaginatorInterface";
import {CursorInterface} from "../paginaton/CursorInterface";

export class ArraySerializer extends SerializerAbstract{

    public collection(resourceKey: string, data: Array<any>): Array<any> {
        // todo: implement this
        return null;
    }

    public item(resourceKey: string, data: Array<any>): Array<any>{
        return data;
    }

    public null(): Array<any>{
        return [];
    }

    public includedData(resource: ResourceInterface, data: Array<any>): Array<any> {
        return data;
    }

    public meta(meta: Array<any>): any{
        if(meta === undefined || meta.length === 0){
            return [];
        }
        return {
            "meta": meta
        };
    }

    public paginator(paginator: PaginatorInterface): Array<any> {
        // todo: implement this
        return undefined;
    }

    public cursor(cursor: CursorInterface): Array<any>{
        // todo: implement this
        return undefined;
    }

}
