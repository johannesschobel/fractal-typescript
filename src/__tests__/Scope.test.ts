import {Manager} from "../Manager";
import {Item} from "../resource/Item";
import {Scope} from "../Scope";
import {ResourceAbstract} from "../resource/ResourceAbstract";

test("test embedChildScope", () => {
    let manager = new Manager();

    let resource = new Item({"foo": "bar"}, function(){});

    let scope = new Scope(manager, resource, "book");
    let childScope = scope.embedChildScope("author", resource);

    expect(childScope).toBeInstanceOf(Scope);
});

test("test getManager", () => {
    let resource = new Item({"foo": "bar"}, function () {});

    let scope = new Scope(new Manager(), resource, "book");

    expect(scope.getManager()).toBeInstanceOf(Manager);
});

test("test getResource", () => {
    let resource = new Item({"foo": "bar"}, function () {});

    let scope = new Scope(new Manager(), resource, "book");

    expect(scope.getResource()).toBeInstanceOf(ResourceAbstract);
    expect(scope.getResource()).toBeInstanceOf(Item);
});

test("test toArray", () => {
    let manager =  new Manager();
    let resource = new Item({"foo": "bar"}, function(){
        return this;
    });

    let scope = new Scope(manager, resource);

    expect(scope.toArray()).toStrictEqual({data: {"foo": "bar"}});
});

test("test toJson", () => {
    let manager =  new Manager();
    let resource = new Item({"foo": "bar"}, function(){
        return this;
    });

    let scope = new Scope(manager, resource);

    expect(scope.toJson()).toStrictEqual('{"data":{"foo":"bar"}}');
});

test("test toJsonWithOption", () => {
    let manager =  new Manager();
    let resource = new Item({"foo": "bar"}, function(){
        return this;
    });

    let scope = new Scope(manager, resource);

    // todo
    // expect(scope.toJson()).toStrictEqual('{"data":{"foo":"bar"}}');
});


test("test getIdentifier", () => {
    // todo
});

