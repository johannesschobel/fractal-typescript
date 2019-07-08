import {Manager} from "../Manager";
import {Item} from "../resource/Item";
import {Scope} from "../Scope";
import {ResourceAbstract} from "../resource/ResourceAbstract";
import {TransformerAbstract} from "../TransformerAbstract";
import Primitive from "../resource/Primitive";
import {Collection} from "../resource/Collection";
import Cursor from "../paginaton/Cursor";

test("test embedChildScope", () => {
    let manager = new Manager();

    let resource = new Item({"foo": "bar"}, function () {
    });

    let scope = new Scope(manager, resource, "book");
    let childScope = scope.embedChildScope("author", resource);

    expect(childScope).toBeInstanceOf(Scope);
});

test("test getManager", () => {
    let resource = new Item({"foo": "bar"}, function () {
    });

    let scope = new Scope(new Manager(), resource, "book");

    expect(scope.getManager()).toBeInstanceOf(Manager);
});

test("test getResource", () => {
    let resource = new Item({"foo": "bar"}, function () {
    });

    let scope = new Scope(new Manager(), resource, "book");

    expect(scope.getResource()).toBeInstanceOf(ResourceAbstract);
    expect(scope.getResource()).toBeInstanceOf(Item);
});

test("test toArray", () => {
    let manager = new Manager();
    let resource = new Item({"foo": "bar"}, function () {
        return this;
    });

    let scope = new Scope(manager, resource);

    expect(scope.toArray()).toStrictEqual({data: {"foo": "bar"}});
});

test("test toJson", () => {
    let manager = new Manager();
    let resource = new Item({"foo": "bar"}, function () {
        return this;
    });

    let scope = new Scope(manager, resource);

    expect(scope.toJson()).toStrictEqual('{"data":{"foo":"bar"}}');
});

test("test toJsonWithOption", () => {
    let manager = new Manager();
    let resource = new Item({"foo": "bar"}, function () {
        return this;
    });

    let scope = new Scope(manager, resource);

    // todo: implement function toJson with parameters
    // expect(scope.toJson()).toStrictEqual('{"data":{"foo":"bar"}}');
});

test("test getCurrentScope", () => {
    let manager = new Manager();

    let resource = new Item({"name": "Larry Ullman"}, function () {
    });

    let scope = new Scope(manager, resource, "book");
    expect(scope.getScopeIdentifier()).toStrictEqual("book");

    let childScope = scope.embedChildScope("author", resource);
    expect(childScope.getScopeIdentifier()).toStrictEqual("author");

    let grandChildScope = childScope.embedChildScope("profile", resource);
    expect(grandChildScope.getScopeIdentifier()).toStrictEqual("profile");
});


test("test getIdentifier", () => {
    // todo: implemement getIdentifers()

    let manager = new Manager();

    let resource = new Item({"name": "Larry Ullman"}, function () {
    });

    let scope = new Scope(manager, resource, "book");
    expect(scope.getIdentifiers()).toStrictEqual("book");

    let childScope = scope.embedChildScope("author", resource);
    expect(childScope.getIdentifiers()).toStrictEqual("book.author");

    let grandChildScope = childScope.embedChildScope("profile", resource);
    expect(grandChildScope.getIdentifiers()).toStrictEqual("book.author.profile");
});

test("test getParentScopes", () => {
    let manager = new Manager();

    let resource = new Item({"name": "Larry Ullman"}, function () {
    });

    let scope = new Scope(manager, resource, "book");

    let childScope = scope.embedChildScope("author", resource);

    expect(childScope.getParentScopes()).toEqual(expect.arrayContaining(["book"]));

    let grandChildScope = childScope.embedChildScope("profile", resource);

    expect(grandChildScope.getParentScopes()).toEqual(expect.arrayContaining(["book", "author"]));
});

test("test isRequested", () => {
    // todo: implement isRequested()

    let manager = new Manager();
    manager.parseIncludes(["foo", "bar", "baz.bart"]);

    let scope = new Scope(manager, new ResourceAbstract());

    expect(scope.isRequested("foo")).toBeTruthy();
    expect(scope.isRequested("bar")).toBeTruthy();
    expect(scope.isRequested("baz")).toBeTruthy();
    expect(scope.isRequested("baz.chart")).toBeTruthy();
    expect(scope.isRequested("nope")).toBeFalsy();

});

test("test isExcluded", () => {
    // todo: implement parseExcludeds()

    let manager = new Manager();
    manager.parseIncludes(["foo", "bar", "baz.bart"]);

    let scope = new Scope(manager, new ResourceAbstract());
    let childScope = scope.embedChildScope("baz", new ResourceAbstract());

    manager.parseExcludes(["bar"]);

    expect(scope.isExcluded("foo")).toBeFalsy();
    expect(scope.isExcluded("bar")).toBeTruthy();
    expect(scope.isExcluded("baz.bart")).toBeFalsy();

    manager.parseExcludes(["baz.bart"]);

    expect(scope.isExcluded("baz")).toBeFalsy();
    expect(scope.isExcluded("baz.bart")).toBeTruthy();
});

test("test toArrayWithSideLoadedIncludes", () => {
    // todo: Manager.parseIncludes()
});

test("test pushParentScope", () => {
    // todo: implement pushParentScope()
    let manager = new Manager();

    let resource = new Item({"name": "Larry Ullman"}, function () {
    });

    let scope = new Scope(manager, resource);

    expect(1).toEqual(scope.pushParentScope("book"));
    expect(2).toEqual(scope.pushParentScope("author"));
    expect(3).toEqual(scope.pushParentScope("profile"));

    expect(scope.getParentScopes()).toEqual(expect.arrayContaining(["book", "author", "profile"]));
});

test("test runAppropriateTransformerWithPrimitive", () => {
    // todo: implement transformPrimitiveResource()
    let manager = new Manager();

    // todo: figure out how to mock correctly!
    // let transformer = new TransformerAbstract();
    let transformer = null;

    let resource = new Primitive("test", transformer);

    let scope = manager.createData(resource);

    expect(scope.transformPrimitiveResource()).toEqual("simple string");

    resource = new Primitive(10, function (x) {
        return x + 10;
    });

    scope = manager.createData(resource);

    expect(scope.transformPrimitiveResource()).toEqual(20);
});

test("test runAppropriateTransformerWithItem", () => {
    // todo
});

test("test runAppropriateTransformerWithCollection", () => {
    // todo
});

test("test createDataWithClassFuckKnows", () => {
    // todo
});

test("test paginatorOutput", () => {
    // todo
});

test("test cursorOutput", () => {
    let manager = new Manager();

    let inputData = [
        {
            foo: "bar",
            baz: "ban"
        }
    ];

    let collection = new Collection(inputData, function () {
        return this;
    });

    let cursor = new Cursor(0, "ban", "ban", 2);

    collection.setCursor(cursor);

    let rootScope = manager.createData(collection);

    let expectedOutput = [{
        "data": inputData,
        "meta": {
            "cursor": {
                "current": 0,
                "prev": "ban",
                "next": "ban",
                "count": 2
            }
        }
    }];

    expect(rootScope.toArray()).toEqual(expectedOutput);
});

test("test defaultIncludeSuccess", () => {
    // todo
});

test("test primitiveResourceIncludeSuccess", () => {
    // todo
});

test("test nullResourceIncludeSuccess", () => {
    // todo
});

test("test toArrayWithFieldsets", () => {
    // todo
});

test("test toArrayWithFieldsetsAndMandatorySerializerFields", () => {
    // todo
});

test("test toArrayWithIncludesAndFieldsets", () => {
    // todo
});

test("test toArrayWithSideloadedIncludesAndFieldsets", () => {
    // todo
});