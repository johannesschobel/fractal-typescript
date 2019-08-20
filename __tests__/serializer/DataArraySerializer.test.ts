import {GenericBookTransformer} from '../../__mocks__/transformer/GenericBookTransformer';
import {Manager} from '../../src/Manager';
import {Collection} from '../../src/resource/Collection';
import {Item} from '../../src/resource/Item';
import {NullResource} from '../../src/resource/NullResource';
import {Scope} from '../../src/Scope';
import {DataArraySerializer} from '../../src/serializer/DataArraySerializer';

describe('DataArraySerializer Tests', () => {

    test('test serializingItemResource', () => {
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new DataArraySerializer());

        const bookData = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };

        const resource = new Item(bookData, null, new GenericBookTransformer(), 'book');
        const scope = new Scope(manager, resource);

        // withoutMetadata
        const expected = {
            data: {
                author: {
                    data: {
                        name: 'Dave'
                    }
                },
                title: 'Foo',
                year: 1991
            }
        };
        expect(scope.toArray()).toEqual(expected);

        // single field
        manager.parseFieldsets({book: 'title'});
        const expectedSingleField = {
            data: {
                title: 'Foo'
            }
        };
        expect(scope.toArray()).toEqual(expectedSingleField);

        // multiple field
        manager.parseFieldsets({book: 'title,year'});
        const expectedMultipleFields = {
            data: {
                title: 'Foo',
                year: 1991
            }
        };
        expect(scope.toArray()).toEqual(expectedMultipleFields);
    });

    test('test serializingItemResourceWithRelationshipField', () => {
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new DataArraySerializer());

        const bookData = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };

        const resource = new Item(bookData, null, new GenericBookTransformer(), 'book');
        manager.parseFieldsets({book: 'title,author', author: 'name'});
        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                author: {
                    data: {
                        name: 'Dave'
                    }
                },
                title: 'Foo'
            }
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingItemResourceWithMetadata', () => {
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new DataArraySerializer());

        const bookData = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };

        const resource = new Item(bookData, null, new GenericBookTransformer(), 'book');
        resource.setMetaValue('foo', 'bar');
        manager.parseFieldsets({book: 'title,author', author: 'name'});
        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                author: {
                    data: {
                        name: 'Dave'
                    }
                },
                title: 'Foo'
            },
            meta: {
                foo: 'bar'
            }
        };
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingCollectionResource', () => {
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new DataArraySerializer());

        const booksData = [
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

        const resource = new Collection(booksData, null, new GenericBookTransformer(), 'books');
        const scope = new Scope(manager, resource);

        // without metadata
        const expectedWithoutMetaData = {
            data: [
                {
                    author: {
                        data: {
                            name: 'Dave'
                        }
                    },
                    title: 'Foo',
                    year: 1991
                },
                {
                    author: {
                        data: {
                            name: 'Bob'
                        }
                    },
                    title: 'Bar',
                    year: 1997
                }
            ]
        };
        expect(scope.toArray()).toEqual(expectedWithoutMetaData);

        // single field
        manager.parseFieldsets({books: 'title'});
        const expectedSingleField = {
            data: [
                {
                    title: 'Foo'
                },
                {
                    title: 'Bar'
                }
            ]
        };
        expect(scope.toArray()).toEqual(expectedSingleField);

        // multiple fields
        manager.parseFieldsets({books: 'title,year'});
        const expectedMultipleFields = {
            data: [
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
        expect(scope.toArray()).toEqual(expectedMultipleFields);
    });

    test('test serializingCollectionResourceWithRelationshipField', () => {
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new DataArraySerializer());

        const booksData = [
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

        const resource = new Collection(booksData, null, new GenericBookTransformer(), 'books');
        const scope = new Scope(manager, resource);

        manager.parseFieldsets({books: 'title,author', author: 'name'});
        const expectedRelationsshipField = {
            data: [
                {
                    author: {
                        data: {
                            name: 'Dave'
                        }
                    },
                    title: 'Foo'
                },
                {
                    author: {
                        data: {
                            name: 'Bob'
                        }
                    },
                    title: 'Bar'
                }
            ]
        };
        expect(scope.toArray()).toEqual(expectedRelationsshipField);
    });

    test('test serializingCollectionResourceWithMetadata', () => {
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new DataArraySerializer());

        const booksData = [
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

        const resource = new Collection(booksData, null, new GenericBookTransformer(), 'books');
        resource.setMetaValue('foo', 'bar');
        const scope = new Scope(manager, resource);

        const expected = {
            data: [
                {
                    author: {
                        data: {
                            name: 'Dave'
                        }
                    },
                    title: 'Foo',
                    year: 1991
                },
                {
                    author: {
                        data: {
                            name: 'Bob'
                        }
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
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new DataArraySerializer());

        const bookData = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };

        const resource = new NullResource(bookData, null, new GenericBookTransformer(), 'book');
        const scope = new Scope(manager, resource);

        // @ts-ignore
        const expected = {data: []};
        expect(scope.toArray()).toEqual(expected);

        // single field
        manager.parseFieldsets({book: 'title'});
        expect(scope.toArray()).toEqual(expected);

        // multiple fields
        manager.parseFieldsets({book: 'title,year'});
        expect(scope.toArray()).toEqual(expected);

        // relationship field
        manager.parseFieldsets({book: 'title,author', author: 'name'});
        expect(scope.toArray()).toEqual(expected);
    });

    test('test serializingNullResourceWithMetaData', () => {
        const manager = new Manager();
        manager.parseIncludes('author');
        manager.setSerializer(new DataArraySerializer());

        const bookData = {
            _author: {
                name: 'Dave'
            },
            title: 'Foo',
            year: 1991
        };

        const resource = new NullResource(bookData, null, new GenericBookTransformer(), 'book');
        resource.setMetaValue('foo', 'bar');
        const scope = new Scope(manager, resource);

        const expected = {
            data: [] as any[],
            meta: {
                foo: 'bar'
            }
        };
        expect(scope.toArray()).toEqual(expected);
    });
});
