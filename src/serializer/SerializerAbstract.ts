import {ResourceInterface} from "~/resource/ResourceInterface";
import {PaginatorInterface} from "~/paginaton/PaginatorInterface";
import {CursorInterface} from "~/paginaton/CursorInterface";
import {Serializer} from "~/serializer/Serializer";

export abstract class SerializerAbstract implements Serializer{

    public abstract collection(resourceKey: string, data: Array<any>): Array<any>;

    public abstract item(resourceKey: string, data: Array<any>): Array<any>;

    public abstract null(): Array<any>;

    public abstract includedData(resource: ResourceInterface, data: Array<any>): Array<any>;

    public abstract meta(meta: Array<any>): Array<any>;

    public abstract paginator(paginator: PaginatorInterface): Array<any>;

    public abstract cursor(cursor: CursorInterface): Array<any>;

    public mergeIncludes(transformedData: Array<any>, includedData: Array<any>): Array<any>{
        if(!this.sideloadIncludes()){
            return transformedData.concat(includedData)
        }
        return transformedData;
    }

    public sideloadIncludes(): boolean{
        return false;
    }

    public injectData(data: Array<any>, rawIncludedData: Array<any>): Array<any>{
        return data;
    }

    public filterIncludes(includedData: Array<any>, data: Array<any>): Array<any>{
        return includedData;
    }

    public getMandatoryFields(): Array<any>{
        return [];
    }

}