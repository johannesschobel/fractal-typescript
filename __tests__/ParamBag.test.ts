import {ParamBag} from '../src/ParamBag';

describe('ParamBag Tests', () => {

    test('test oldFashionedGet', () => {
        const params = new ParamBag({one: 'potato', two: 'potato2'});
        expect(params.get('one')).toEqual('potato');
        expect(params.get('two')).toEqual('potato2');
    });

    test('test gettingValuesTheOldFashionedWayArray', () => {
        const params = new ParamBag({one: ['potato', 'tomato']});
        expect(params.get('one')).toEqual(['potato', 'tomato']);
    });

    test('test objectAccess', () => {
        let params = {params: {foo: 'bar', baz: 'ban'}};
        // @ts-ignore
        params = new ParamBag({foo: 'bar', baz: 'ban'});
        expect(params.params.foo).toEqual('bar');
        expect(params.params.baz).toEqual('ban');
        // @ts-ignore
        expect(params.unkown).toBeUndefined();
    });

    test('test objectAccessIsset', () => {
        const params = new ParamBag({foo: 'bar'});
        expect(params.isset('foo')).toBeTruthy();
        expect(params.isset('unknown')).toBeFalsy();
    });

    test('test objectAccessSetFails', () => {
        const params = new ParamBag({foo: 'bar'});
        expect(() => {ParamBag.set('foo', 'value'); }).toThrowError();
    });

    test('test objectAccessUnsetFails', () => {
        const params = new ParamBag({foo: 'bar'});
        expect(() => {ParamBag.unset('foo'); }).toThrowError();
    });

});
