import {Manager} from './Manager';
import {Book} from './models/Book';
import {Collection} from './resource/Collection';

const fractal = new Manager();

const books: Book[] = [
    {
        authorEmail: 'philip@example.org',
        authorName: 'Philip K Dick',
        id: '1',
        title: 'Hogfather',
        yr: 1998
    },
    {
        authorEmail: 'george@example.org',
        authorName: 'George R. R. Satan',
        id: '2',
        title: 'Game Of Kill Everyone',
        yr: 2014
    }
];

const resource = new Collection(books, function () {
    return {
        author: {
            email: this.author_email,
            name: this.author_name
        },
        id: this.id,
        links: {
            rel: 'self',
            uri: '/books/' + this.id
        },
        title: this.title,
        year: this.yr
    };
});

const array = fractal.createData(resource).toArray();
console.log(fractal.createData(resource).toJson());
