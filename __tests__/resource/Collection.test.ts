import {PaginatorInterface} from '~/paginaton/PaginatorInterface';
import Cursor from '../../src/paginaton/Cursor';
import {Collection} from '../../src/resource/Collection';
import {PaginatorMock} from '../stub/pagination/PaginatorMock';
import {TransformerAbstractMock} from '../stub/TransformerAbstractMock';

describe('Collection Tests', () => {

    const simpleCollection = [
        {foo: 'bar'},
        {baz: 'ban'}
    ];

    test('test getData', () => {
        const resource = new Collection(simpleCollection, function () {
            return this;
        }, new TransformerAbstractMock());
        expect(resource.getData()).toEqual(simpleCollection);
    });

    test('test setData', () => {
        const collection = new Collection();
        collection.setData('foo');
        expect(collection.getData()).toEqual('foo');
    });

    test('test getTransformer', () => {
        const resource = new Collection(simpleCollection, () => { });
        expect(typeof resource.getTransformer() === 'function').toBeTruthy();
    });

    test('test setTransformer', () => {
        const collection = new Collection();
        collection.setTransformer('foo');
        expect(collection.getTransformer()).toEqual('foo');
    });

    test('test setCursor', () => {
        const cursor = new Cursor();
        const collection = new Collection();
        collection.setCursor(cursor);
        expect(collection.getCursor()).toBeInstanceOf(Cursor);
    });

    test('test getSetPaginator', () => {
        const paginator = new PaginatorMock();
        const collection = new Collection();
        expect(collection.setPaginator(paginator)).toBeInstanceOf(Collection);
        expect(instanceOfPaginatorInterface(collection.getPaginator())).toBeTruthy()
    });

    test('test getSetMeta', () => {
        const collection = new Collection();
        expect(collection.setMetaValue('foo', 'bar')).toBeInstanceOf(Collection);

        expect(collection.getMeta()).toEqual({foo: 'bar'});
        expect(collection.getMetaValue('foo')).toEqual('bar');
        collection.setMeta({baz: 'bat'});
        expect(collection.getMeta()).toEqual({baz: 'bat'});
    });

    test('test setResourceKey', () => {
        const collection = new Collection();
        expect(collection.setResourceKey('foo')).toBeInstanceOf(Collection);
    });

    test('test getResourceKey', () => {
        const collection = new Collection();
        collection.setResourceKey('foo');
        expect(collection.getResourceKey()).toEqual('foo');
    });

    function instanceOfPaginatorInterface(object: any): object is PaginatorInterface {
        return 'getCurrentPage' in object;
    }

});
