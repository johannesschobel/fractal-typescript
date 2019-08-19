import {TransformerAbstractMock} from '../__mocks__/TransformerAbstractMock';
import {Manager} from '../src/Manager';
import {Collection} from '../src/resource/Collection';
import {Item} from '../src/resource/Item';
import {ResourceAbstract} from '../src/resource/ResourceAbstract';
import {Scope} from '../src/Scope';
import {TransformerAbstract} from '../src/TransformerAbstract';

describe('TransformerAbstract Tests', () => {

    test('test setAvailbleIncludes', () => {
        const transformer = new TransformerAbstractMock();
        expect(transformer.setAvailableIncludes(['foo'])).toBeInstanceOf(TransformerAbstract);
    });

    test('test getAvailableIncludes', () => {
        const transformer = new TransformerAbstractMock();
        transformer.setAvailableIncludes(['foo', 'bar']);
        expect(transformer.getAvailableIncludes()).toEqual(['foo', 'bar']);
    });

    test('test setDefaultIncludes', () => {
        const transformer = new TransformerAbstractMock();
        expect(transformer.setDefaultIncludes(['foo'])).toBeInstanceOf(TransformerAbstract);
    });

    test('test getDefaultIncludes', () => {
        const transformer = new TransformerAbstractMock();
        transformer.setDefaultIncludes(['foo', 'bar']);
        expect(transformer.getDefaultIncludes()).toEqual(['foo', 'bar']);
    });

    test('test setCurrentScope', () => {
        const transformer = new TransformerAbstractMock();
        const manager = new Manager();
        const scope = new Scope(manager, new ResourceAbstract());
        expect(transformer.setCurrentScope(scope)).toBeInstanceOf(TransformerAbstract);
    });

    test('test getCurrentScope', () => {
        const transformer = new TransformerAbstractMock();
        const manager = new Manager();
        const scope = new Scope(manager, new ResourceAbstract());
        transformer.setCurrentScope(scope);
        expect(transformer.getCurrentScope()).toEqual(scope);
    });

    test('test processEmbeddedResourcesNoAvailableIncludes', () => {
        const transformer = new TransformerAbstractMock();

        const manager = new Manager();
        manager.parseIncludes('foo');

        const scope = new Scope(manager, new ResourceAbstract());
        expect(transformer.processIncludedResources(scope, {some: 'data'})).toBeFalsy();
    });

    test('test processIncludedAvailableResources', () => {
        const manager = new Manager();
        manager.parseIncludes('book');
        const transformer = new TransformerAbstractMock();

        // @ts-ignore
        transformer.includeBook = () => new Item({included: 'thing'}, function () {
            return this;
        });

        transformer.setAvailableIncludes(['book', 'publisher']);
        // @ts-ignore
        const scope = new Scope(manager, new Item([], transformer));
        const included = transformer.processIncludedResources(scope, ['meh']);
        expect(included).toEqual({book: {data: {included: 'thing'}}});
    });

    test('test processExcludedAvailableResources', () => {
        const manager = new Manager();
        manager.parseIncludes('book');
        const transformer = new TransformerAbstractMock();
        // @ts-ignore
        const scope = new Scope(manager, new Item([], transformer));

        // @ts-ignore
        transformer.includePublisher = () => new Item({another: 'thing'}, function () {
            return this;
        });

        manager.parseIncludes('book,publisher');
        manager.parseExcludes('book');

        transformer.setAvailableIncludes(['book', 'publisher']);

        const included = transformer.processIncludedResources(scope, ['meh']);
        expect(included).toEqual({publisher: {data: {another: 'thing'}}});
    });

    test('test processExcludedDefaultResources', () => {
        const manager = new Manager();
        const transformer = new TransformerAbstractMock();
        // @ts-ignore
        const scope = new Scope(manager, new Item([], transformer));

        // @ts-ignore
        transformer.includePublisher = () => new Item({another: 'thing'}, function () {
            return this;
        });

        manager.parseIncludes('book,publisher');
        manager.parseExcludes('book');

        transformer.setAvailableIncludes(['book', 'publisher']);

        const included = transformer.processIncludedResources(scope, ['meh']);
        expect(included).toEqual({publisher: {data: {another: 'thing'}}});
    });

    test('test processIncludedAvailableResourcesEmptyEmbed', () => {
        const manager = new Manager();
        manager.parseIncludes('book');
        const transformer = new TransformerAbstractMock();
        // @ts-ignore
        transformer.includeBook = () => null;
        transformer.setAvailableIncludes(['book']);

        // @ts-ignore
        const scope = new Scope(manager, new Item([], transformer));
        const included = transformer.processIncludedResources(scope, ['meh']);
        expect(included).toBeFalsy();
    });

    test('test processEmbeddedDefaultResources', () => {
        const manager = new Manager();
        const transformer = new TransformerAbstractMock();

        // @ts-ignore
        transformer.includeBook = () => new Item({included: 'thing'}, function () {
            return this;
        });

        transformer.setDefaultIncludes(['book']);
        // @ts-ignore
        const scope = new Scope(manager, new Item([], transformer));
        const included = transformer.processIncludedResources(scope, ['meh']);
        expect(included).toEqual({book: {data: {included: 'thing'}}});
    });

    test('test includedItems', () => {
        const manager = new Manager();
        manager.parseIncludes('book');

        const transformer = new TransformerAbstractMock();
        // @ts-ignore
        transformer.includeBook = () => new Item({included: 'thing'}, function () {
            return this;
        });

        transformer.setAvailableIncludes(['book']);
        // @ts-ignore
        const scope = new Scope(manager, new Item([], transformer));
        const included = transformer.processIncludedResources(scope, ['meh']);
        expect(included).toEqual({book: {data: {included: 'thing'}}});
    });

    test('test includedCollection', () => {
        const manager = new Manager();
        manager.parseIncludes('book');

        const collectionData = [
            {included: 'thing'},
            {another: 'thing'}
        ];

        const transformer = new TransformerAbstractMock();
        // @ts-ignore
        transformer.includeBook = () => new Collection(collectionData, function () {
            return this;
        });

        transformer.setAvailableIncludes(['book']);
        // @ts-ignore
        const scope = new Scope(manager, new Item([], transformer));
        const included = transformer.processIncludedResources(scope, ['meh']);
        expect(included).toEqual({book: {data: collectionData}});
    });

    test('test processEmbeddedDefaultResourcesEmptyEmbed', () => {
        const transformer = new TransformerAbstractMock();
        // @ts-ignore
        transformer.includeBook = () => null;

        transformer.setDefaultIncludes(['book']);
        // @ts-ignore
        const scope = new Scope(new Manager(), new Item([], transformer));
        const included = transformer.processIncludedResources(scope, ['meh']);

        expect(included).toBeFalsy();
    });

    test('test item', () => {
        const mock = new TransformerAbstractMock();
        const item = mock.item([], () => {}, null);
        expect(item).toBeInstanceOf(Item);
    });

});
