import {ArraySerializer} from '../src/serializer/ArraySerializer';

export class ArraySerializerWithNull extends ArraySerializer {
    public null(): any {
        return null;
    }
}
