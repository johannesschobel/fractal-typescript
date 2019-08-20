import {ArraySerializer} from '../serializer/ArraySerializer';

export class DataArraySerializer extends ArraySerializer {

    public collection(resourceKey: string, data: any[]): [] | {} {
        return {data};
    }

    public item(resourceKey: string, data: any[]): any {
        return {data};
    }

    public null(): any {
        return {
            data: []
        };
    }
}
