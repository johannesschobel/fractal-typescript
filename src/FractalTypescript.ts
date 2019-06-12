import {BookTransformer} from "./BookTransformer";

export class FractalTypescript {

    public transformData(data: Array<any>, option: string) {
        if (option === "array") {
            return BookTransformer.transformer(data);
        } else if (option === "json") {
            let result = BookTransformer.transformer(data);
            return JSON.stringify(result);
        }
    }
}