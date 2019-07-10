import {Manager} from '../Manager';
import {Item} from '../resource/Item';
import {ResourceAbstract} from '../resource/ResourceAbstract';
import {Scope} from '../Scope';

test('test embedChildScope', () => {
    const manager = new Manager();

    const resource = new Item({foo: 'bar'}, () => {});

    const scope = new Scope(manager, resource, 'book');
    const childScope = scope.embedChildScope('author', resource);

    expect(childScope).toBeInstanceOf(Scope);
});

test('test getManager', () => {
    const resource = new Item({foo: 'bar'}, () => {});

    const scope = new Scope(new Manager(), resource, 'book');

    expect(scope.getManager()).toBeInstanceOf(Manager);
});

test('test getResource', () => {
    // tslint:disable-next-line:no-empty
    const resource = new Item({foo: 'bar'}, () => {});

    const scope = new Scope(new Manager(), resource, 'book');

    expect(scope.getResource()).toBeInstanceOf(ResourceAbstract);
    expect(scope.getResource()).toBeInstanceOf(Item);
});

test('test toArray', () => {
    const manager =  new Manager();
    const resource = new Item({foo: 'bar'}, function () {
        return this;
    });

    const scope = new Scope(manager, resource);

    expect(scope.toArray()).toStrictEqual({data: {foo: 'bar'}});
});

test('test toJson', () => {
    const manager =  new Manager();
    const resource = new Item({foo: 'bar'}, function () {
        return this;
    });

    const scope = new Scope(manager, resource);

    expect(scope.toJson()).toStrictEqual('{"data":{"foo":"bar"}}');
});

test('test toJsonWithOption', () => {
    const manager =  new Manager();
    const resource = new Item({foo: 'bar'}, () => {
        return this;
    });

    const scope = new Scope(manager, resource);

    // todo
    // expect(scope.toJson()).toStrictEqual('{"data":{"foo":"bar"}}');
});

test('test getIdentifier', () => {
    // todo
});
