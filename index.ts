import {Book} from "./models/Book";
import {FractalTypescript} from "~/FractalTypescript";

let fractalTypescript = new FractalTypescript();

let books: Array<Book> = [
    {
        "id": "1",
        "title": "Hogfather",
        "yr": 1998,
        "author_name": "Philip K Dick",
        "author_email": "philip@example.org",
    },
    {
        "id": "2",
        "title": "Game Of Kill Everyone",
        "yr": 2014,
        "author_name": "George R. R. Satan",
        "author_email": "george@example.org",
    }
];

let transformer = (books: Array<Book>) => {
    for (const book of books) {
        return {
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
        };
    }

};

let array = fractalTypescript.createData(transformer, "toArray");
let json = fractalTypescript.createData(transformer, "toJson");