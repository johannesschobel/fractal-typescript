import {Manager} from '../src/Manager';
import {Book} from '../src/models/Book';
import {BookTransformed} from '../src/models/BookTransformed';
import {TransformationResult} from '../src/models/TransformationResult';
import {Collection} from '../src/resource/Collection';

describe('SimpleExample Tests', () => {

    test('test simpleExample', () => {
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

        const object: TransformationResult<BookTransformed> = fractal.createData(resource).toObject();
        const json: string = fractal.createData(resource).toString();

        const expectedArray = {
            data: [
                {
                    author: {},
                    id: '1',
                    links: {
                        rel: 'self',
                        uri: '/books/1'
                    },
                    title: 'Hogfather',
                    year: 1998
                },
                {
                    author: {},
                    id: '2',
                    links: {
                        rel: 'self',
                        uri: '/books/2'
                    },
                    title: 'Game Of Kill Everyone',
                    year: 2014
                }
            ]
        };
        expect(object).toEqual(expectedArray);

        const expectedJson = '{"data":[{"author":{},"id":"1","links":{"rel":"self","uri":"/books/1"},' +
            '"title":"Hogfather","year":1998},{"author":{},"id":"2","links":{"rel":"self","uri":"/books/2"},' +
            '"title":"Game Of Kill Everyone","year":2014}]}';

        expect(json).toEqual(expectedJson);

    });

});
