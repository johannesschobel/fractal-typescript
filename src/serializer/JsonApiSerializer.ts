// tslint:disable-next-line:no-var-requires
const JSONAPISerializer = require('json-api-serializer');

export class JsonApiSerializer {

    public data = {
        author: {
            age: '80',
            email: 'Kaley-Maggio@example.com',
            firstName: 'Kaley',
            gender: 'male',
            id: '1',
            lastName: 'Maggio'
        },
        body: 'The shortest article. Ever.',
        comments: [
            {
                _id: '1',
                body: 'First !',
                created: '2015-08-14T18:42:16.475Z'
            },
            {
                _id: '2',
                body: 'I Like !',
                created: '2015-09-14T18:42:12.475Z'
            },
            {
                _id: '3',
                body: 'Awesome',
                created: '2015-09-15T18:42:12.475Z'
            }
        ],
        created: '2015-05-22T14:56:29.000Z',
        id: '1',
        photos: [
            'ed70cf44-9a34-4878-84e6-0c0e4a450cfe',
            '24ba3666-a593-498c-9f5d-55a4ee08c72e',
            'f386492d-df61-4573-b4e3-54f6f5d08acf'
        ],
        tags: ['1', '2'],
        title: 'JSON API paints my bikeshed!',
        updated: '2015-05-22T14:56:28.000Z'
    };

    public serializer = new JSONAPISerializer();

    // register resource types like this
    public registerTypes() {
        // Register 'article' type
        this.serializer.register('article', {
            blacklist: ['updated'],         // An array of blacklisted attributes. Default = []
            id: 'id',                       // The attributes to use as the reference. Default = 'id'.
            links: {
                // An object or a function that describes links.
                self(data: any) {
                    // Can be a function or a string value ex: { self: '/articles/1'}
                    return '/articles/' + data.id;
                }
            },
            relationships: {
                // An object defining some relationships.
                author: {
                    type: 'people',         // The type of the resource
                    // tslint:disable-next-line:object-literal-sort-keys
                    links(data: any) {
                        // An object or a function that describes Relationships links
                        return {
                            related: '/articles/' + data.id + '/author',
                            self: '/articles/' + data.id + '/relationships/author'
                        };
                    }
                },
                comments: {
                    schema: 'only-body',     // A custom schema
                    type: 'comment'
                },
                photos: {
                    type: 'photo'
                },
                tags: {
                    type: 'tag'
                }
            },
            topLevelLinks: {
                // An object or a function that describes top level links.
                self: '/articles'       // Can be a function (with extra data argument) or a string value
            },
            topLevelMeta(data: any, extraData: any) {
                // An object or a function that describes top level meta.
                return {
                    count: extraData.count,
                    total: data.length
                };
            }
        });

        // Register 'people' type
        this.serializer.register('people', {
            id: 'id',
            links: {
                self(data: any) {
                    return '/peoples/' + data.id;
                }
            }
        });

        // Register 'tag' type
        this.serializer.register('tag', {
            id: 'id'
        });

        // Register 'photo' type
        this.serializer.register('photo', {
            id: 'id'
        });

        // Register 'comment' type with a custom schema
        this.serializer.register('comment', 'only-body', {
            id: '_id'
        });
    }

    public serialize() {
        this.serializer.serializeAsync('article', this.data, {count: 2})
            .then((result: any) => {
                console.log(result);
            });
    }
}
