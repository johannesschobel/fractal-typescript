import {Book} from "./models/Book";
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

let array = fractalTypescript.transformData(books, "array");
console.log(array);
let json = fractalTypescript.transformData(books,"json");
console.log(json);