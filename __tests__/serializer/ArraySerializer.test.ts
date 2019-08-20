import {PaginatorMock} from '../../__mocks__/pagination/PaginatorMock';
import {GenericBookTransformer} from '../../__mocks__/transformer/GenericBookTransformer';
import {Manager} from '../../src/Manager';
import Cursor from '../../src/paginaton/Cursor';
import {Collection} from '../../src/resource/Collection';
import {Item} from '../../src/resource/Item';
import {NullResource} from '../../src/resource/NullResource';
import {Scope} from '../../src/Scope';
import {ArraySerializer} from '../../src/serializer/ArraySerializer';

describe('ArraySerializer Tests', () => {

    test('test serializingItemResourceRelationsshipField', () => {
        const bookItemInput = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };

        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new Item(bookItemInput, null, new GenericBookTransformer(), 'book');

        const scope = new Scope(manager, resource);

        manager.parseFieldsets({book: 'title,author', author: 'name'});
        const expected = {
            author: {
                name: 'Dave'
            },
            title: 'Foo'
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingItemResourceWithoutMetadata', () => {
        const bookItemInput = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new Item(bookItemInput, null, new GenericBookTransformer(), 'book');

        const scope = new Scope(manager, resource);

        const expected = {
            author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingItemResourceSingleField', () => {
        const bookItemInput = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new Item(bookItemInput, null, new GenericBookTransformer(), 'book');

        const scope = new Scope(manager, resource);

        manager.parseFieldsets({book: 'title'});
        const expected = {title: 'Foo'};
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingItemResourceMultipleField', () => {
        const bookItemInput = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new Item(bookItemInput, null, new GenericBookTransformer(), 'book');

        const scope = new Scope(manager, resource);

        manager.parseFieldsets({book: 'title,year'});
        const expected = {
            title: 'Foo',
            year: 1991
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingItemResourceWithMeta', () => {
        const bookItemInput = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new Item(bookItemInput, null, new GenericBookTransformer(), 'book');

        manager.parseFieldsets([]);
        resource.setMetaValue('foo', 'bar');
        const scope = new Scope(manager, resource);
        const expected = {
            author: {
                name: 'Dave'
            },
            meta: {
                foo: 'bar'
            },
            title: 'Foo',
            year: 1991
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingItemResourceWithMetaAndRelationshipField', () => {
        const bookItemInput = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new Item(bookItemInput, null, new GenericBookTransformer(), 'book');

        manager.parseFieldsets({book: 'title,author', author: 'name'});
        resource.setMetaValue('foo', 'bar');
        const scope = new Scope(manager, resource);
        const expected = {
            author: {
                name: 'Dave'
            },
            meta: {
                foo: 'bar'
            },
            title: 'Foo'
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingCollectionResourceWithoutMetadata', () => {
        const bookCollectionInput = [
            {
                _author: {
                    name: 'Dave'
                },
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    name: 'Bob'
                },
                title: 'Bar',
                year: 1997
            }
        ];
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new Collection(bookCollectionInput, null, new GenericBookTransformer(), 'books');

        const scope = new Scope(manager, resource);

        const expected = {
            books: [
                {
                    author: {
                        name: 'Dave'
                    },
                    title: 'Foo',
                    year: 1991
                },
                {
                    author: {
                        name: 'Bob'
                    },
                    title: 'Bar',
                    year: 1997
                }
            ]
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingCollectionResourceSingleField', () => {
        const bookCollectionInput = [
            {
                _author: {
                    name: 'Dave'
                },
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    name: 'Bob'
                },
                title: 'Bar',
                year: 1997
            }
        ];
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());
        manager.parseFieldsets({books: 'title'});

        const resource = new Collection(bookCollectionInput, null, new GenericBookTransformer(), 'books');

        const scope = new Scope(manager, resource);

        const expected = {
            books: [
                {
                    title: 'Foo'
                },
                {
                    title: 'Bar'
                }
            ]
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingCollectionResourceMultipleFields', () => {
        const bookCollectionInput = [
            {
                _author: {
                    name: 'Dave'
                },
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    name: 'Bob'
                },
                title: 'Bar',
                year: 1997
            }
        ];
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());
        manager.parseFieldsets({books: 'title,year'});

        const resource = new Collection(bookCollectionInput, null, new GenericBookTransformer(), 'books');

        const scope = new Scope(manager, resource);

        const expected = {
            books: [
                {
                    title: 'Foo',
                    year: 1991
                },
                {
                    title: 'Bar',
                    year: 1997
                }
            ]
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingCollectionResourceWithRelationshipField', () => {
        const bookCollectionInput = [
            {
                _author: {
                    name: 'Dave'
                },
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    name: 'Bob'
                },
                title: 'Bar',
                year: 1997
            }
        ];
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());
        manager.parseFieldsets({books: 'title,author', author: 'name'});

        const resource = new Collection(bookCollectionInput, null, new GenericBookTransformer(), 'books');

        const scope = new Scope(manager, resource);

        const expected = {
            books: [
                {
                    author: {
                        name: 'Dave'
                    },
                    title: 'Foo'
                },
                {
                    author: {
                        name: 'Bob'
                    },
                    title: 'Bar'
                }
            ]
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingCollectionResourceWithRelationshipFieldAndMeta', () => {
        const bookCollectionInput = [
            {
                _author: {
                    name: 'Dave'
                },
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    name: 'Bob'
                },
                title: 'Bar',
                year: 1997
            }
        ];
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());
        manager.parseFieldsets([]);

        const resource = new Collection(bookCollectionInput, null, new GenericBookTransformer(), 'books');
        resource.setMetaValue('foo', 'bar');

        const scope = new Scope(manager, resource);

        const expected = {
            books: [
                {
                    author: {
                        name: 'Dave'
                    },
                    title: 'Foo',
                    year: 1991
                },
                {
                    author: {
                        name: 'Bob'
                    },
                    title: 'Bar',
                    year: 1997
                }
            ],
            meta: {
                foo: 'bar'
            }
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingNullResource', () => {
        const bookCollectionInput = [
            {
                _author: {
                    name: 'Dave'
                },
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    name: 'Bob'
                },
                title: 'Bar',
                year: 1997
            }
        ];
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new NullResource(bookCollectionInput, null, new GenericBookTransformer(), 'books');
        const scope = new Scope(manager, resource);

        expect(scope.toArray()).toEqual(null);

        manager.parseFieldsets({books: 'title'});
        expect(scope.toArray()).toEqual(null);

        manager.parseFieldsets({books: 'title,year'});
        expect(scope.toArray()).toEqual(null);

        manager.parseFieldsets({books: 'title, author', author: 'name'});
        expect(scope.toArray()).toEqual(null);

    });

    test('test serializingNullResourceWithMetadata', () => {
        const bookCollectionInput = [
            {
                _author: {
                    name: 'Dave'
                },
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    name: 'Bob'
                },
                title: 'Bar',
                year: 1997
            }
        ];
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new ArraySerializer());

        const resource = new NullResource(bookCollectionInput, null, new GenericBookTransformer(), 'books');
        resource.setMetaValue('foo', 'bar');

        const scope = new Scope(manager, resource);

        const expeceted = {
            meta: {
                foo: 'bar'
            }
        };
        expect(scope.toArray()).toEqual(expeceted);

        manager.parseFieldsets({books: 'title, author', author: 'name'});
        expect(scope.toArray()).toEqual(expeceted);
    });

    test('test paginator', () => {
        const arraySerializer = new ArraySerializer();
        const paginator = new PaginatorMock();
        const expected = {
            pagination: {
                count: 100,
                current_page: 5,
                links: {
                    next: '',
                    previous: ''
                },
                per_page: 10,
                total: 100,
                total_pages: 10
            }
        };
        expect(arraySerializer.paginator(paginator)).toEqual(expected)
    });

    test('test cursor', () => {
        const arraySerializer = new ArraySerializer();
        const cursor = new Cursor(1, 2, 3, 4);
        const expected = {
            cursor: {
                count: 4,
                current: 1,
                next: 3,
                prev: 2
            }
        };
        expect(arraySerializer.cursor(cursor)).toEqual(expected)
    })
});
