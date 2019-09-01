import {PaginatorMock} from '../../__mocks__/pagination/PaginatorMock';
import {JsonApiAuthorTransformer} from '../../__mocks__/transformer/JsonApiAuthorTransformer';
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

        expect(scope.toObject()).toEqual(expected);
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

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeItemResourceWithMetaOneRelationship', () => {
        manager.parseIncludes('author-with-meta');

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
                    'author-with-meta': {
                        data: {
                            id: 1,
                            type: 'people'
                        },
                        meta: {
                            foo: 'bar'
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

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeItemResourceWithMetaOneDasherizedInclude', () => {
        manager.parseIncludes('co-author');

        const bookData = {
            _author: {
                id: 1,
                name: 'Dave'
            },
            _co_author: {
                id: 2,
                name: 'Jim'
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
                    'co-author': {
                        data: {
                            id: 2,
                            type: 'people'
                        }
                    }
                },
                type: 'books'
            },
            included: {
                attributes: {
                    name: 'Jim'
                },
                id: 2,
                type: 'people'
            }
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeItemResourceWithHasManyIncludes', () => {
        manager.parseIncludes('published');

        const authorData = {
            _published: [
                {
                    id: 1,
                    title: 'Foo',
                    year: 1991
                },
                {
                    id: 2,
                    title: 'Bar',
                    year: 2015
                }
            ],
            id: 1,
            name: 'Dave'
        };

        const resource = new Item(authorData, null, new JsonApiAuthorTransformer(), 'people');
        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                attributes: {
                    name: 'Dave'
                },
                id: 1,
                relationships: {
                    published: {
                        data: [
                            {
                                id: 1,
                                type: 'books'
                            },
                            {
                                id: 2,
                                type: 'books'
                            }
                        ]
                    }
                },
                type: 'people'
            },
            included: [
                {
                    attributes: {
                        title: 'Foo',
                        year: 1991
                    },
                    id: 1,
                    type: 'books'
                },
                {
                    attributes: {
                        title: 'Bar',
                        year: 2015
                    },
                    id: 2,
                    type: 'books'
                }
            ]
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeItemResourceWithEmptyHasManyIncludes', () => {
        manager.parseIncludes('published');

        const authorData = {
            _published: [] as any[],
            id: 1,
            name: 'Dave'
        };

        const resource = new Item(authorData, null, new JsonApiAuthorTransformer(), 'people');
        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                attributes: {
                    name: 'Dave'
                },
                id: 1,
                relationships: {
                    published: {
                        data: [] as any[]
                    }
                },
                type: 'people'
            }
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeItemResourceWithoutIncludes', () => {
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
                type: 'books'
            }
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeItemResourceWithMeta', () => {
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
        resource.setMetaValue('foo', 'bar');

        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                attributes: {
                    title: 'Foo',
                    year: 1991
                },
                id: 1,
                type: 'books'
            },
            meta: {
                foo: 'bar'
            }
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeItemResourceWithMetaInBody', () => {
        const bookData = {
            _author: {
                id: 1,
                name: 'Dave'
            },
            id: 1,
            meta: {
                something: 'something'
            },
            title: 'Foo',
            year: 1991
        };

        const resource = new Item(bookData, null, new JsonApiBookTransformer(), 'books');
        resource.setMetaValue('foo', 'bar');

        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                attributes: {
                    title: 'Foo',
                    year: 1991
                },
                id: 1,
                meta: {
                    something: 'something'
                },
                type: 'books'
            },
            meta: {
                foo: 'bar'
            }
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeCollectionResourceWithoutIncludes', () => {
        const booksData = [
            {
                _author: {
                    id: 1,
                    name: 'Dave'
                },
                id: 1,
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    id: 2,
                    name: 'Bob'
                },
                id: 2,
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
                    type: 'books'
                },
                {
                    attributes: {
                        title: 'Bar',
                        year: 1997
                    },
                    id: 2,
                    type: 'books'
                }
            ]
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeCollectionResourceWithMeta', () => {
        const booksData = [
            {
                _author: {
                    id: 1,
                    name: 'Dave'
                },
                id: 1,
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    id: 2,
                    name: 'Bob'
                },
                id: 2,
                title: 'Bar',
                year: 1997
            }
        ];

        const resource = new Collection(booksData, null, new JsonApiBookTransformer(), 'books');
        resource.setMetaValue('foo', 'bar');
        const scope = new Scope(manager, resource);

        const expected = {
            data: [
                {
                    attributes: {
                        title: 'Foo',
                        year: 1991
                    },
                    id: 1,
                    type: 'books'
                },
                {
                    attributes: {
                        title: 'Bar',
                        year: 1997
                    },
                    id: 2,
                    type: 'books'
                }
            ],
            meta: {
                foo: 'bar'
            }
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeCollectionResourceWithSelfLink', () => {
        const baseUrl = 'http://example.com';
        manager.setSerializer(new JsonApiSerializer(baseUrl));

        const booksData = {
            _author: {
                id: 1,
                name: 'Dave'
            },
            id: 1,
            title: 'Foo',
            year: 1991
        };

        const resource = new Item(booksData, null, new JsonApiBookTransformer(), 'books');
        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                attributes: {
                    title: 'Foo',
                    year: 1991
                },
                id: 1,
                links: {
                    self: 'http://example.com/books/1'
                },
                relationships: {
                    'author': {
                        links: {
                            related: 'http://example.com/books/1/author',
                            self: 'http://example.com/books/1/relationships/author'
                        }
                    },
                    'author-with-meta': {
                        links: {
                            related: 'http://example.com/books/1/author-with-meta',
                            self: 'http://example.com/books/1/relationships/author-with-meta'
                        }
                    },
                    'co-author': {
                        links: {
                            related: 'http://example.com/books/1/co-author',
                            self: 'http://example.com/books/1/relationships/co-author'
                        }
                    }
                },
                type: 'books'
            }
        };

        expect(scope.toObject()).toEqual(expected);
    });

    test('test serializeCollectionResourceWithPaginator', () => {
        const baseUrl = 'http://example.com';
        manager.setSerializer(new JsonApiSerializer(baseUrl));

        const total = 10;
        const count = 2;
        const perPage = 2;
        const currentPage = 2;
        const lastPage = 5;
        const previousUrl = 'http://example.com/books/?page=1';
        const currentUrl = 'http://example.com/books/?page=2';
        const nextUrl = 'http://example.com/books/?page=3';
        const lastUrl = 'http://example.com/books/?page=5';

        const paginator = new PaginatorMock();
        paginator.getCurrentPage = () => currentPage;
        paginator.getLastPage = () => lastPage;
        paginator.getTotal = () => total;
        paginator.getCount = () => count;
        paginator.getPerPage = () => perPage;

        const booksData = [
            {
                _author: {
                    id: 1,
                    name: 'Dave'
                },
                id: 1,
                title: 'Foo',
                year: 1991
            },
            {
                _author: {
                    id: 2,
                    name: 'Bob'
                },
                id: 2,
                title: 'Bar',
                year: 1997
            }
        ];

        const resource = new Collection(booksData, null, new JsonApiBookTransformer(), 'books');
        resource.setPaginator(paginator);
        const scope = new Scope(manager, resource);

        const expected = {
            data: [
                {
                    attributes: {
                        title: 'Foo',
                        year: 1991
                    },
                    id: 1,
                    links: {
                        self: 'http://example.com/books/1'
                    },
                    type: 'books'
                },
                {
                    attributes: {
                        title: 'Bar',
                        year: 1997
                    },
                    id: 2,
                    links: {
                        self: 'http://example.com/books/2'
                    },
                    type: 'books'
                }
            ],
            links: {
                first: '',
                last: '',
                next: '',
                prev: '',
                self: ''
            },
            meta: {
                pagination: {
                    count: 2,
                    current_page: 2,
                    per_page: 2,
                    total: 10,
                    total_pages: 5
                }
            }

        };

        scope.toObject()
    });

})
;
