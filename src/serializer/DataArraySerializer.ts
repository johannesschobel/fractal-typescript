import {ArraySerializer} from "../serializer/ArraySerializer";

export class DataArraySerializer extends ArraySerializer{

    public collection(resourceKey: string, data: Array<any>): Array<any> {
        return data;
    }

    public item(resourceKey: string, data: Array<any>): Array<any> {
        return data;
    }

    public null(): Array<any> {
        return [];
    }
}