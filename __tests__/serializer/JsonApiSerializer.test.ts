import {JsonApiBookTransformer} from '../../__mocks__/transformer/JsonApiBookTransformer';
import {Manager} from '../../src/Manager';
import {Collection} from '../../src/resource/Collection';
import {Item} from '../../src/resource/Item';
import {Scope} from '../../src/Scope';
import {JsonApiSerializer} from '../../src/serializer/JsonApiSerializer';

describe('JsonApiSerializer Tests', () => {

    let manager: Manager;

    beforeAll(() => {
        manager = new Manager();
        manager.setSerializer(new JsonApiSerializer());
    });

    test('test serializeCollectionWithExtraMeta', () => {
        const booksData = [
            {
                _author: {
                    id: 1,
                    name: 'Dave'
                },
                id: 1,
                meta: {
                    foo: 'bar'
                },
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    id: 2,
                    name: 'Bob'
                },
                id: 2,
                meta: {
                    bar: 'baz'
                },
                title: 'Bar',
                year: 1997
            }
        ];

        const resource = new Collection(booksData, null, new JsonApiBookTransformer(), 'books');
        const scope = new Scope(manager, resource);

        const expected = {
            data: [
                {
                    attributes: {
                        title: 'Foo',
                        year: 1991
                    },
                    id: 1,
                    meta: {
                        foo: 'bar'
                    },
                    type: 'books'
                },
                {
                    attributes: {
                        title: 'Bar',
                        year: 1997
                    },
                    id: 2,
                    meta: {
                        bar: 'baz'
                    },
                    type: 'books'
                }
            ]
        };

        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializeItemResourceWithHasOneInclude', () => {
        manager.parseIncludes('author');

        const bookData = {
            _author: {
                id: 1,
                name: 'Dave'
            },
            id: 1,
            title: 'Foo',
            year: 1991
        };

        const resource = new Item(bookData, null, new JsonApiBookTransformer(), 'books');
        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                attributes: {
                    title: 'Foo',
                    year: 1991
                },
                id: 1,
                relationships: {
                    author: {
                        data: {
                            id: 1,
                            type: 'people'
                        }
                    }
                },
                type: 'books'
            },
            included: {
                attributes: {
                    name: 'Dave'
                },
                id: 1,
                type: 'people'
            }
        };

        expect(scope.toArray()).toEqual(expected);
    });
});
