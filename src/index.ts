import {Book} from "./models/Book";
import {Manager} from "./Manager";
import {Collection} from "./resource/Collection";

let fractal = new Manager();

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


let resource = new Collection(books, function() {
    return {
        "id": this.id,
        "title": this.title,
        "year": this.yr,
        "author": {
            "name": this.author_name,
            "email": this.author_email
        },
        "links": {
            "rel": "self",
            "uri": "/books/" + this.id
        }
    };
});

let array = fractal.createData(resource).toArray();
console.log(fractal.createData(resource).toJson());