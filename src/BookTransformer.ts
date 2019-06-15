import {Book} from "./models/Book";

export class BookTransformer {

    public static transformer = (books: Array<Book>) => {
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

}