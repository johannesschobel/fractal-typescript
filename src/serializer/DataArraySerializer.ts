import {ArraySerializer} from "../serializer/ArraySerializer";

export class DataArraySerializer extends ArraySerializer{

    public collection(resourceKey: string, data: Array<any>): any {
        return {
            "data": data
        };
    }

    public item(resourceKey: string, data: Array<any>): any {
        return {
            "data": data
        };
    }

    public null(): any {
        return {
            "data": []
        };
    }
}