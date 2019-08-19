import {Item} from '../../src/resource/Item';

describe('Item Tests', () => {

    const simpleCItem = [
        {foo: 'bar'}
    ];

    test('test getData', () => {
        const item = new Item(simpleCItem, () => {});
        expect(item.getData()).toEqual(simpleCItem);
    });

    test('test getTransformer', () => {
        let item = new Item(simpleCItem, () => {});
        expect(typeof item.getTransformer() === 'function').toBeTruthy();

        const transformer = 'thismightbeacallablestring';
        // @ts-ignore
        item = new Item(simpleCItem, transformer);

        expect(item.getTransformer()).toEqual(transformer);
    });

    test('test setResourceKey', () => {
        const item = new Item(simpleCItem, () => {});
        expect(item.setResourceKey('foo')).toEqual(item);
    });

    test('test getResourceKey', () => {
        const item = new Item(simpleCItem, () => {});
        item.setResourceKey('foo');
        expect(item.getResourceKey()).toEqual('foo');
    });
});
