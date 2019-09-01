# fractal-typescript

| master | development |
| :---:  | :----------:|
|![CircleCI](https://circleci.com/gh/Dakesi95/fractal-typescript.svg?style=svg&circle-token=e5487cad6b8f556625394d66411eb41d4f739f58) | [![CircleCI](https://circleci.com/gh/Dakesi95/fractal-typescript/tree/development.svg?style=svg&circle-token=e5487cad6b8f556625394d66411eb41d4f739f58)](https://circleci.com/gh/Dakesi95/fractal-typescript/tree/development)

An adaptation of the famous php [fractal-framework](https://github.com/thephpleague/fractal) for typescript.


## Documentation

`fractal-typescript` has [documentation](https://docs.github.com/Dakesi95/fractal-typescript), powered by [compodoc](https://compodoc.app/).

Contribute to this documentation in the [gh-pages branch](https://github.com/Dakesi95/fractal-typescript/tree/gh-pages).

## Testing

``` bash
$ npm run test
```

## Installation
* Download source code of fractal-typescript from github
* Build source code running `tsc`command
* Open project where you want to use fractal-typescript
* Install local version of fractal-typescript using `npm i {path to project}`
* Start using fractal-typescript as classical import+

## Usage
* Fractal-typescript can be used similar to its php equivalent
* Fractal-typescript provides three serializer:
  * ArraySerializer
  * DataArraySerializer
  * JsonApiSerializer
* Custom transformers can also be used (see advanced example below)  

## Simple example
```typescript
import {Collection, Manager, Scope} from "fractal-typescript";

const fractal = new Manager();

const books: Array<Book> = [
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


const resource = new Collection(books, function() {
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

const result: TransformationResult<BookTransformed> = fractal.createData(resource).toObject();
const string = fractal.createData(resource).toString();
```

## Advanced example
This example shows an advanced usage of fractal-typescript using custom transformer classes serialized with the JsonApiSerializer.
### index.ts
```typescript
import {Item, JsonApiSerializer, Manager, Scope} from "fractal-typescript";

const manager = new Manager();

const baseUrl = 'http://example.com';
const jsonApiSerializer = new JsonApiSerializer(baseUrl);
manager.setSerializer(jsonApiSerializer);

const data = {
_author: {
  id: 1,
  name: 'Dave'
}
id: 1,
title: 'Foo',
year: 1991
};

const resource = new Item(data, null, new JsonApiBookTransformer(), 'books');
const scope = new Scope(manager, resource);
const result = scope.toObject();
```

### JsonApiBookTransformer
```typescript
import {TransformerAbstract} from "fractal-typescript/dist/TransformerAbstract";
import {JsonApiAuthorTransformer} from "./JsonApiAuthorTransformer";
import {JsonApiBook} from "./JsonApiBook";

export class JsonApiBookTransformer extends TransformerAbstract {

    protected tempAuthor = {};
    protected tempCoAuthor = {};
    protected availableIncludes = [
        'author',
        'co-author',
        'author-with-meta'
    ];

    public transform(book: JsonApiBook) {
        this.tempAuthor = book._author;
        delete book._author;
        this.tempCoAuthor = book._co_author;
        delete book._co_author;
        return book;
    }

    public includeAuthor(book: JsonApiBook) {
        if (book._author !== undefined) {
            return;
        }

        if (book._author === null) {
            return this.null();
        }

        return this.item(this.tempAuthor, new JsonApiAuthorTransformer(), 'people');
    }

    public includeAuthorWithMeta(book: JsonApiBook) {
        if (book._author !== undefined) {
            return;
        }

        if (book._author === null) {
            return this.null();
        }
        const resource = this.item(this.tempAuthor, new JsonApiAuthorTransformer(), 'people');
        resource.setMeta({foo: 'bar'});
        return resource;
    }

    public includeCoAuthor(book: JsonApiBook) {
        if (book._co_author !== undefined) {
            return;
        }

        if (book._co_author === null) {
            return this.null();
        }

        return this.item(this.tempCoAuthor, new JsonApiAuthorTransformer(), 'people');
    }
}
```

### JsonApiAuthorTransformer
```typescript
import {JsonApiBookTransformer} from './JsonApiBookTransformer';
import {TransformerAbstract} from "fractal-typescript/dist/TransformerAbstract";

export class JsonApiAuthorTransformer extends TransformerAbstract {

    protected tempPublished = {};
    protected availableIncludes = [
        'published'
    ];

    public transform(author: {}) {
        this.tempPublished = author._published;
        delete author._published;
        return author;
    }

    public includePublished(author: {}) {
        return this.collection(this.tempPublished, null, new JsonApiBookTransformer(), 'books');
    }

}

```` 

## Links
* [Fractal Source Code](https://github.com/thephpleague/fractal)
* [Fractal Documentation](https://fractal.thephpleague.com)


## Maintainers

- [Daniel Kempf](https://github.com/Dakesi95)
- [Paul Romahn](https://github.com/romahnp)
