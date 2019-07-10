import {CursorInterface} from '../paginaton/CursorInterface';
import {PaginatorInterface} from '../paginaton/PaginatorInterface';

export interface Serializer {
    collection(resourceKey: string, data: any[]): any[];
    item(resourceKey: string, data: any[]): any[];
    null(): any[];
    meta(meta: any[]): any[];
    paginator(paginator: PaginatorInterface): any[];
    cursor(cursor: CursorInterface): any[];
    mergeIncludes(transformedData: any[], includedData: any[]): any[];
    sideloadIncludes(): boolean;
    injectData(data: any[], rawIncludedData: any[]): any[];
    filterIncludes(includedData: any[], data: any[]): any[];
}
