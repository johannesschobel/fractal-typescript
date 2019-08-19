import Primitive from '../../src/resource/Primitive';

describe('Primitive Tests', () => {

    const simplePrimitive = 'simple string';

    test('test getData', () => {
        const primitive = new Primitive(simplePrimitive, () => {});
        expect(primitive.getData()).toEqual(simplePrimitive);
    });

    test('test getTransformer', () => {
        const primitive = new Primitive(simplePrimitive, () => {});
        expect(typeof primitive.getTransformer() === 'function').toBeTruthy();
    });

    test('test getResourceKey', () => {
        const primitive = new Primitive(simplePrimitive, () => {});
        primitive.setResourceKey('foo');
        expect(primitive.getResourceKey()).toEqual('foo');
    });

    test('test setResourceKey', () => {
        const primitive = new Primitive(simplePrimitive, () => {});
        expect(primitive.setResourceKey('foo')).toEqual(primitive);
    });

});
