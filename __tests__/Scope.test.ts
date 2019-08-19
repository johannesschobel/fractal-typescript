import {Manager} from '../src/Manager';
import Cursor from '../src/paginaton/Cursor';
import {Collection} from '../src/resource/Collection';
import {Item} from '../src/resource/Item';
import {NullResource} from '../src/resource/NullResource';
import Primitive from '../src/resource/Primitive';
import {ResourceAbstract} from '../src/resource/ResourceAbstract';
import {Scope} from '../src/Scope';
import {ArraySerializer} from '../src/serializer/ArraySerializer';
import {DataArraySerializer} from '../src/serializer/DataArraySerializer';
import {ArraySerializerWithNull} from './Stub/ArraySerializerWithNull';
import {DefaultIncludeBookTransformer} from './Stub/Transformer/DefaultIncludeBookTransformer';
import {NullIncludeBookTransformer} from './Stub/Transformer/NullIncludeBookTransformer';
import {PrimitiveIncludeBookTransformer} from './Stub/Transformer/PrimitiveIncludeBookTransformer';
import {TransformerAbstractMock} from './Stub/TransformerAbstractMock';

describe('Scope Tests', () => {

    test('test embedChildScope', () => {
        const manager = new Manager();
        const resource = new Item({foo: 'bar'}, () => {
        });

        const scope = new Scope(manager, resource, 'book');
        const childScope = scope.embedChildScope('author', resource);

        expect(childScope).toBeInstanceOf(Scope);
    });

    test('test getManager', () => {
        const resource = new Item({foo: 'bar'}, () => {
        });
        const scope = new Scope(new Manager(), resource, 'book');

        expect(scope.getManager()).toBeInstanceOf(Manager);
    });

    test('test getResource', () => {
        // tslint:disable-next-line:no-empty
        const resource = new Item({foo: 'bar'}, () => {
        });
        const scope = new Scope(new Manager(), resource, 'book');

        expect(scope.getResource()).toBeInstanceOf(ResourceAbstract);
        expect(scope.getResource()).toBeInstanceOf(Item);
    });

    test('test toArray', () => {
        const manager = new Manager();
        const resource = new Item({foo: 'bar'}, function () {
            return this;
        });

        const scope = new Scope(manager, resource);

        expect(scope.toArray()).toStrictEqual({data: {foo: 'bar'}});
    });

    test('test toJson', () => {
        const manager = new Manager();
        const resource = new Item({foo: 'bar'}, function () {
            return this;
        });

        const scope = new Scope(manager, resource);

        expect(scope.toJson()).toStrictEqual('{"data":{"foo":"bar"}}');
    });

    test('test getCurrentScope', () => {
        const manager = new Manager();

        const resource = new Item({name: 'Larry Ullman'}, () => {
        });

        const scope = new Scope(manager, resource, 'book');
        expect(scope.getScopeIdentifier()).toStrictEqual('book');

        const childScope = scope.embedChildScope('author', resource);
        expect(childScope.getScopeIdentifier()).toStrictEqual('author');

        const grandChildScope = childScope.embedChildScope('profile', resource);
        expect(grandChildScope.getScopeIdentifier()).toStrictEqual('profile');
    });

    test('test getIdentifier', () => {
        const manager = new Manager();

        const resource = new Item({name: 'Larry Ullman'}, () => {
        });

        const scope = new Scope(manager, resource, 'book');
        expect(scope.getIdentifiers()).toStrictEqual('book');

        const childScope = scope.embedChildScope('author', resource);
        expect(childScope.getIdentifiers()).toStrictEqual('book.author');

        const grandChildScope = childScope.embedChildScope('profile', resource);
        expect(grandChildScope.getIdentifiers()).toStrictEqual('book.author.profile');
    });

    test('test getParentScopes', () => {
        const manager = new Manager();

        const resource = new Item({name: 'Larry Ullman'}, () => {
        });

        const scope = new Scope(manager, resource, 'book');

        const childScope = scope.embedChildScope('author', resource);

        expect(childScope.getParentScopes()).toEqual(expect.arrayContaining(['book']));

        const grandChildScope = childScope.embedChildScope('profile', resource);

        expect(grandChildScope.getParentScopes()).toEqual(expect.arrayContaining(['book', 'author']));
    });

    test('test isRequested', () => {
        const manager = new Manager();
        manager.parseIncludes(null, ['foo', 'bar', 'baz.bart']);

        const scope = new Scope(manager, new ResourceAbstract());

        expect(scope.isRequested('foo')).toBeTruthy();
        expect(scope.isRequested('bar')).toBeTruthy();
        expect(scope.isRequested('baz')).toBeTruthy();
        expect(scope.isRequested('baz.bart')).toBeTruthy();
        expect(scope.isRequested('nope')).toBeFalsy();

    });

    test('test isExcluded', () => {
        const manager = new Manager();
        manager.parseIncludes(null, ['foo', 'bar', 'baz.bart']);

        const scope = new Scope(manager, new ResourceAbstract());
        scope.embedChildScope('baz', new ResourceAbstract());

        manager.parseExcludes('bar');

        expect(scope.isExcluded('foo')).toBeFalsy();
        expect(scope.isExcluded('bar')).toBeTruthy();
        expect(scope.isExcluded('baz.bart')).toBeFalsy();

        manager.parseExcludes(null, ['baz.bart']);

        expect(scope.isExcluded('baz')).toBeFalsy();
        expect(scope.isExcluded('baz.bart')).toBeTruthy();
    });

    test('test toArrayWithSideLoadedIncludes', () => {
        const serializer = new ArraySerializer();
        serializer.sideloadIncludes = () => true;
        // @ts-ignore
        // tslint:disable-next-line:only-arrow-functions
        serializer.item = function () {
            return {
                data: {
                    bar: 'baz'
                }
            };
        };
        // @ts-ignore
        // tslint:disable-next-line:only-arrow-functions
        serializer.includedData = function () {
            return {
                sideloaded: {
                    book: {
                        yin: 'yang'
                    }
                }
            }
        };

        const manager = new Manager();
        manager.parseIncludes('book');
        manager.setSerializer(serializer);

        const transformer = new TransformerAbstractMock();
        transformer.getAvailableIncludes = () => ['book'];
        transformer.transform = function () {
            return this;
        };
        transformer.processIncludedResources = () => ({book: {yin: 'yang'}});

        const resource = new Item({bar: 'baz'}, null, transformer, null);

        const scope = new Scope(manager, resource);

        const expected = {
            data: {
                bar: 'baz'
            },
            sideloaded: {
                book: {
                    yin: 'yang'
                }
            }
        };

        expect(scope.toArray()).toEqual(expected);
    });

    test('test pushParentScope', () => {
        const manager = new Manager();

        const resource = new Item({name: 'Larry Ullman'}, () => {
        });

        const scope = new Scope(manager, resource);

        expect(1).toEqual(scope.pushParentScope('book'));
        expect(2).toEqual(scope.pushParentScope('author'));
        expect(3).toEqual(scope.pushParentScope('profile'));

        expect(scope.getParentScopes()).toEqual(expect.arrayContaining(['book', 'author', 'profile']));
    });

    test('test runAppropriateTransformerWithPrimitive', () => {
        const manager = new Manager();

        const transformer = new TransformerAbstractMock();
        transformer.transform = () => 'simple string';
        // @ts-ignore
        transformer.setCurrentScope = () => [];

        // @ts-ignore
        let resource = new Primitive('test', transformer);
        let scope = manager.createData(resource);

        expect(scope.transformPrimitiveResource()).toEqual('simple string');

        resource = new Primitive(10, function (): number {
            return this + 10;
        });

        scope = manager.createData(resource);

        expect(scope.transformPrimitiveResource()).toEqual(20);
    });

    test('test runAppropriateTransformerWithItem', () => {
        const manager = new Manager();

        const transformer = new TransformerAbstractMock();
        transformer.transform = () => ({foo: 'bar'});
        transformer.getAvailableIncludes = () => [];
        transformer.getDefaultIncludes = () => [];
        // @ts-ignore
        transformer.setCurrentScope = () => [];

        // @ts-ignore
        const resource = new Item({foo: 'bar'}, transformer);
        const scope = manager.createData(resource);

        expect(scope.toArray()).toEqual({data: {foo: 'bar'}});
    });

    test('test runAppropriateTransformerWithCollection', () => {
        const manager = new Manager();

        const transformer = new TransformerAbstractMock();
        transformer.transform = () => ({foo: 'bar'});
        transformer.getAvailableIncludes = () => [];
        transformer.getDefaultIncludes = () => [];
        // @ts-ignore
        transformer.setCurrentScope = () => [];

        // @ts-ignore
        const resource = new Collection([{foo: 'bar'}], transformer);
        const scope = manager.createData(resource);

        expect(scope.toArray()).toEqual({data: [{foo: 'bar'}]});
    });

    test('test createDataWithClassFuckKnows', () => {
        const manager = new Manager();
        const transformer = new TransformerAbstractMock();
        const resource = new ResourceAbstract();
        const scope = manager.createData(resource);
        expect(() => {
            scope.toArray()
        }).toThrowError();
    });

    test('test cursorOutput', () => {
        const manager = new Manager();

        const inputData = [
            {
                baz: 'ban',
                foo: 'bar'
            }
        ];

        const collection = new Collection(inputData, function () {
            return this;
        });

        const cursor = new Cursor(0, 'ban', 'ban', 2);

        collection.setCursor(cursor);

        const rootScope = manager.createData(collection);

        const expectedOutput = {
            data: inputData,
            meta: {
                cursor: {
                    count: 2,
                    current: 0,
                    next: 'ban',
                    prev: 'ban'
                }
            }
        };

        expect(rootScope.toArray()).toEqual(expectedOutput);
    });

    test('test defaultIncludeSuccess', () => {
        const manager = new Manager();
        manager.setSerializer(new ArraySerializer());

        const resource = new Item([], null, new DefaultIncludeBookTransformer());

        const scope = new Scope(manager, resource);

        const expected = {
            a: 'b',
            author: {
                c: 'd'
            }
        };

        expect(scope.toArray()).toEqual(expected);
    });

    test('test primitiveResourceIncludeSuccess', () => {
        const manager = new Manager();
        manager.setSerializer(new ArraySerializerWithNull());

        const resource = new Item({price: 49}, null, new PrimitiveIncludeBookTransformer());

        const scope = new Scope(manager, resource);

        const expected = {
            a: 'b',
            price: 49
        };

        expect(scope.toArray()).toEqual(expected);
    });

    test('test nullResourceIncludeSuccess', () => {
        const manager = new Manager();
        manager.setSerializer(new ArraySerializer());

        const resource = new Item({}, null, new NullIncludeBookTransformer());

        const scope = new Scope(manager, resource);

        const expected = {
            a: 'b',
            author: null as any
        };

        expect(scope.toArray()).toEqual(expected);
    });

    test('test nullResourceDataAndJustMeta', () => {
        const manager = new Manager();
        manager.setSerializer(new ArraySerializerWithNull());

        const resource = new NullResource();
        resource.setMeta({foo: 'bar'});

        const scope = new Scope(manager, resource);

        const expected = {
            meta: {
                foo: 'bar'
            }
        };

        expect(scope.toArray()).toEqual(expected);
    });

    test('test toArrayWithFieldsets', () => {
        const manager = new Manager();

        const resource = new Item({foo: 'bar', baz: 'qux'}, function () {
            return this;
        }, null, 'resourceName');

        const scope = new Scope(manager, resource);

        const fieldsetsToParse = {resourceName: 'foo'};

        manager.parseFieldsets(fieldsetsToParse);

        const expected = {
            data: {
                foo: 'bar'
            }
        };

        expect(scope.toArray()).toEqual(expected);
    });

    test('test toArrayWithFieldsetsAndMandatorySerializerFields', () => {
        const serializer = new DataArraySerializer();
        serializer.getMandatoryFields = () => ['foo'];

        const resource = new Item({foo: 'bar', baz: 'qux'}, function () {
            return this;
        }, null, 'resourceName');

        const manger = new Manager();
        manger.setSerializer(serializer);

        const scope = new Scope(manger, resource);

        const expected = {
            data: {
                baz: 'qux',
                foo: 'bar'
            }
        };

        manger.parseFieldsets({resourceName: 'foo,baz'});
        expect(scope.toArray()).toEqual(expected);
    });

    test('test toArrayWithIncludesAndFieldsets', () => {
        const transformer = new TransformerAbstractMock();
        transformer.getAvailableIncludes = () => ['book'];
        transformer.transform = () => this;
        transformer.processIncludedResources = () => ({book: {yin: 'yang'}});

        // @ts-ignore
        const resource = new Item({foo: 'bar', baz: 'qux'}, transformer, null, 'resourceName');

        const manger = new Manager();
        const scope = new Scope(manger, resource);

        manger.parseIncludes('book');
        manger.parseFieldsets({resource: 'foo'});

        const expected = {
            data: {
                book: {
                    yin: 'yang'
                }
            }
        };

        expect(scope.toArray()).toEqual(expected);
    });

});
