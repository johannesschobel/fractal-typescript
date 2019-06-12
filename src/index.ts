import {Book} from "../models/Book";
import {FractalTypescript} from "./FractalTypescript";

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

// let array = fractalTypescript.createData(books, transformer, "array");
let json = FractalTypescript.createData(books, transformer, "json");