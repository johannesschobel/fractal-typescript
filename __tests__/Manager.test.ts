import {Manager} from '../src/Manager';
import {ParamBag} from '../src/ParamBag';
import {Item} from '../src/resource/Item';
import {Scope} from '../src/Scope';

class PrivateManagerExtendsClass extends Manager {
    public testableTrimToAcceptRecursionLevel(includeName: string): string {
        return super.trimToAcceptRecursionLevel(includeName);
    }
}

describe('Manager Tests', () => {

    test('test trimToAcceptRecusionLevel below recursionlimit', () => {
        const underTest = new PrivateManagerExtendsClass();
        const includePath = '.one.two.three.four';
        const includePathAfterOperation = underTest.testableTrimToAcceptRecursionLevel(includePath);
        expect(includePathAfterOperation).toEqual(includePath);
    });

    test('test trimToAcceptRecusionLevel above recursionlimit', () => {
        const underTest = new PrivateManagerExtendsClass();
        const includePath = '.one.two.three.four.five.six.seven.eight.nine';
        const trimmed = '.ten.eleven';
        const includePathAfterOperation = underTest.testableTrimToAcceptRecursionLevel(includePath + trimmed);
        expect(includePathAfterOperation).toEqual(includePath);
    });

    test('test parseIncludeSelfie', () => {
        const manager = new Manager();
        expect(manager.parseIncludes(null, ['foo'])).toBeInstanceOf(Manager);
    });

    test('test parseInclude', () => {
        const manager = new Manager();

        manager.parseIncludes('foo,bar');
        expect(manager.getRequestedIncluddes()).toEqual(['foo', 'bar']);

        manager.parseIncludes(null, ['foo', 'bar', 'bar.baz']);
        expect(manager.getRequestedIncluddes()).toEqual(['foo', 'bar', 'bar.baz']);

        manager.parseIncludes(null, ['foo', 'foo', 'bar']);
        expect(manager.getRequestedIncluddes()).toEqual(['foo', 'bar']);

        manager.parseIncludes(null, ['foo.bar']);
        expect(manager.getRequestedIncluddes()).toEqual(['foo', 'foo.bar']);

        manager.parseIncludes('foo:limit(5|1):order(-something):anotherparam');
        let params = { params: {limit: '', order: '', anotherparam: ''}};
        // @ts-ignore
        params = manager.getIncludeParams('foo');
        expect(params).toBeInstanceOf(ParamBag);
        expect(params.params.limit).toEqual(['5', '1']);
        expect(params.params.order).toEqual(['-something']);
        expect(params.params.anotherparam).toEqual(['']);
        // @ts-ignore
        expect(params.totallymadeup).toBeUndefined();
    });

    test('test parseExcludeSelfie', () => {
        const manager = new Manager();
        expect(manager.parseExcludes(null, ['foo'])).toBeInstanceOf(Manager);
    });

    test('test parseExcludes', () => {
        const manager = new Manager();

        manager.parseExcludes('foo,bar');
        expect(manager.getRequestedExcludes()).toEqual(['foo', 'bar']);

        manager.parseExcludes(null, ['foo', 'bar', 'bar.baz']);
        expect(manager.getRequestedExcludes()).toEqual(['foo', 'bar', 'bar.baz']);

        manager.parseExcludes(null, ['foo', 'foo', 'bar']);
        expect(manager.getRequestedExcludes()).toEqual(['foo', 'bar']);

        manager.parseExcludes(null, ['foo.bar']);
        expect(manager.getRequestedExcludes()).toEqual(['foo.bar']);
    });

    test('test recursionLimiting', () => {
        const manager = new Manager();

        manager.parseIncludes('a.b.c.d.e.f.g.h.i.j.NEVER');
        expect(manager.getRequestedIncluddes()).toEqual([
            'a',
            'a.b',
            'a.b.c',
            'a.b.c.d',
            'a.b.c.d.e',
            'a.b.c.d.e.f',
            'a.b.c.d.e.f.g',
            'a.b.c.d.e.f.g.h',
            'a.b.c.d.e.f.g.h.i',
            'a.b.c.d.e.f.g.h.i.j'
        ]);

        manager.setRecursionLimit(3);
        manager.parseIncludes('a.b.c.NEVER');
        expect(manager.getRequestedIncluddes()).toEqual([
            'a',
            'a.b',
            'a.b.c'
        ]);
    });

    test('test createDataWithCallback', () => {
        const manager = new Manager();

        const resource = new Item({foo: 'bar'}, function () { return this; });

        const rootScope = manager.createData(resource);

        expect(rootScope).toBeInstanceOf(Scope);
        expect(rootScope.toArray()).toEqual({data: { foo: 'bar'}});
        expect(rootScope.toJson()).toEqual('{"data":{"foo":"bar"}}');
    });

    test('test parseFieldsets', () => {
        const manager = new Manager();

        const fields = {
          articles: 'title,body',
          people: 'name'
        };

        const expectedFieldset = {
            articles: ['title', 'body'],
            people: ['name']
        };

        manager.parseFieldsets(fields);
        expect(manager.getRequestedFieldsets()).toEqual(expectedFieldset);

        const paramBag = new ParamBag(expectedFieldset.articles);
        expect(manager.getFieldset('articles')).toEqual(paramBag);

        manager.parseFieldsets({foo: 'bar,baz,bar'});
        expect(manager.getRequestedFieldsets()).toEqual({foo: ['bar', 'baz']});

        manager.parseFieldsets({foo: 'bar,'});
        expect(manager.getRequestedFieldsets()).toEqual({foo: ['bar']});

        manager.parseFieldsets({foo: ['bar', 'baz']});
        expect(manager.getRequestedFieldsets()).toEqual({foo: ['bar', 'baz']});

        expect(manager.getFieldset('inexistent')).toEqual(null);
    });

});
