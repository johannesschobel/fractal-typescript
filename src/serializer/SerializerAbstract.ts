import {CursorInterface} from '../paginaton/CursorInterface';
import {PaginatorInterface} from '../paginaton/PaginatorInterface';
import {ResourceInterface} from '../resource/ResourceInterface';
import {Serializer} from '../serializer/Serializer';

export abstract class SerializerAbstract implements Serializer {

    public abstract collection(resourceKey: string, data: {}): any;

    public abstract item(resourceKey: string, data: {}): any;

    public abstract null(): any;

    public abstract includedData(resource: ResourceInterface, data: any[]): any;

    public abstract meta(meta: any[]): any;

    public abstract paginator(paginator: PaginatorInterface): any;

    public abstract cursor(cursor: CursorInterface): any;

    public mergeIncludes(transformedData: any, includedData: any): any {
        // @ts-ignore
        if (transformedData.length === undefined) {
            return {...transformedData, ...includedData};
        } else {
            if (!this.sideloadIncludes()) {
                // @ts-ignore
                return transformedData.concat(includedData)
            }
            return transformedData;
        }
    }

    public sideloadIncludes(): boolean {
        return false;
    }

    public injectData(data: any[], rawIncludedData: any[]): any {
        return data;
    }

    public filterIncludes(includedData: any[], data: any[]): any {
        return includedData;
    }

    public getMandatoryFields(): any {
        return [];
    }

    public injectAvailableIncludeData(data: any, availableIncludes: any) {
        return data;
    }
}
