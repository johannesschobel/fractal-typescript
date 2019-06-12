import {Book} from "../models/Book";

export class FractalTypescript {

    private transformer = (books: Array<Book>) => {
        let result: Array<any> = [];
        for (const book of books) {
            result.push({
                "id": book.id,
                "title": book.title,
                "year": book.yr,
                "author": {
                    "name": book.author_name,
                    "email": book.author_email
                },
                "links": {
                    "rel": "self",
                    "uri": "/books/" + book.id
                }
            });
        }
        return result;
    };

    public transformData(data: Array<any>, option: string) {
        if (option === "array") {
            return this.transformer(data);
        } else if (option === "json") {
            let result = this.transformer(data);
            return JSON.stringify(result);
        }
    }
}