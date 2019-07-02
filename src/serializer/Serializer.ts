import {PaginatorInterface} from "~/paginaton/PaginatorInterface";
import {CursorInterface} from "~/paginaton/CursorInterface";

export interface Serializer{

    collection(resourceKey: string, data: Array<any>): Array<any>;
    item(resourceKey: string, data: Array<any>): Array<any>;
    null(): Array<any>;
    meta(meta: Array<any>): Array<any>;
    paginator(paginator: PaginatorInterface): Array<any>;
    cursor(cursor: CursorInterface): Array<any>;
    mergeIncludes(transformedData: Array<any>, includedData: Array<any>): Array<any>;
    sideloadIncludes(): boolean;
    injectData(data: Array<any>, rawIncludedData: Array<any>): Array<any>;
    filterIncludes(includedData: Array<any>, data: Array<any>): Array<any>;

}