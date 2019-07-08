import {Manager} from "../Manager";
import {Item} from "../resource/Item";
import {Scope} from "../Scope";
import {ResourceAbstract} from "../resource/ResourceAbstract";

test("test embed child scope", () => {
    let manager = new Manager();

    let resource = new Item([], function(){});

    let scope = new Scope(manager, resource, "book");
    let childScope = scope.embedChildScope("author", resource);

    expect(childScope).toBeInstanceOf(Scope);
});

test("test get manager", () => {
   let resource = new Item([], function () {});

   let scope = new Scope(new Manager(), resource, "book");

   expect(scope.getManager()).toBeInstanceOf(Manager);
});

test("test get resource", () => {
   let resource = new Item([], function () {});

   let scope = new Scope(new Manager(), resource, "book");

   expect(scope.getResource()).toBeInstanceOf(ResourceAbstract);
   expect(scope.getResource()).toBeInstanceOf(Item);
});