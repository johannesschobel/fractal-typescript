import {Manager} from '../src/Manager';
import Cursor from '../src/paginaton/Cursor';
import {Collection} from '../src/resource/Collection';
import {Item} from '../src/resource/Item';
import Primitive from '../src/resource/Primitive';
import {ResourceAbstract} from '../src/resource/ResourceAbstract';
import {Scope} from '../src/Scope';

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

    test('test toJsonWithOption', () => {
        const manager = new Manager();
        const resource = new Item({foo: 'bar'}, () => {
            return this;
        });

        const scope = new Scope(manager, resource);

        // todo: implement function toJson with parameters
        // expect(scope.toJson()).toStrictEqual('{"data":{"foo":"bar"}}');
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
        // todo: Manager.parseIncludes()
    });

    test('test pushParentScope', () => {
        const manager = new Manager();

        const resource = new Item({name: 'Larry Ullman'}, () => {});

        const scope = new Scope(manager, resource);

        expect(1).toEqual(scope.pushParentScope('book'));
        expect(2).toEqual(scope.pushParentScope('author'));
        expect(3).toEqual(scope.pushParentScope('profile'));

        expect(scope.getParentScopes()).toEqual(expect.arrayContaining(['book', 'author', 'profile']));
    });

    test('test runAppropriateTransformerWithPrimitive', () => {
        // todo: implement transformPrimitiveResource()
        const manager = new Manager();

        // todo: figure out how to mock correctly!
        // let transformer = new TransformerAbstract();
        let transformer: null;
        transformer = null;

        let resource = new Primitive('test', transformer);

        let scope = manager.createData(resource);

        expect(scope.transformPrimitiveResource()).toEqual('simple string');

        resource = new Primitive(10, (x: any) => {
            return x + 10;
        });

        scope = manager.createData(resource);

        expect(scope.transformPrimitiveResource()).toEqual(20);
    });

    test('test runAppropriateTransformerWithItem', () => {
        // todo
    });

    test('test runAppropriateTransformerWithCollection', () => {
        // todo
    });

    test('test createDataWithClassFuckKnows', () => {
        // todo
    });

    test('test paginatorOutput', () => {
        // todo
    });

    test('test cursorOutput', () => {
        const manager = new Manager();

        const inputData = [
            {
                baz: 'ban',
                foo: 'bar'
            }
        ];

        const collection = new Collection(inputData, () => {
            return this;
        });

        const cursor = new Cursor(0, 'ban', 'ban', 2);

        collection.setCursor(cursor);

        const rootScope = manager.createData(collection);

        const expectedOutput = [{
            data: inputData,
            meta: {
                cursor: {
                    count: 2,
                    current: 0,
                    next: 'ban',
                    prev: 'ban'
                }
            }
        }];

        expect(rootScope.toArray()).toEqual(expectedOutput);
    });

    test('test defaultIncludeSuccess', () => {
        // todo
    });

    test('test primitiveResourceIncludeSuccess', () => {
        // todo
    });

    test('test nullResourceIncludeSuccess', () => {
        // todo
    });

    test('test toArrayWithFieldsets', () => {
        // todo
    });

    test('test toArrayWithFieldsetsAndMandatorySerializerFields', () => {
        // todo
    });

    test('test toArrayWithIncludesAndFieldsets', () => {
        // todo
    });

    test('test toArrayWithSideloadedIncludesAndFieldsets', () => {
        // todo
    });

});
