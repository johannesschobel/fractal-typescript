import {Manager} from '../src/Manager';
import {ResourceAbstract} from '../src/resource/ResourceAbstract';
import {Scope} from '../src/Scope';
import {ScopeFactory} from '../src/ScopeFactory';
import {ScopeFactoryInterface} from '../src/ScopeFactoryInterface';

describe('ScopeFactory Tests', () => {

    test('test implementsScopeFactoryInterface', () => {
        const scopeFactory = new ScopeFactory();
        expect(instanceOfScopeFactoryInterface(scopeFactory)).toBeTruthy();
    });

    test('test createsScope', () => {
        const sut = new ScopeFactory();

        const manager = new Manager();
        const resource = new ResourceAbstract();
        const scopeIdentifier = 'foo_identifier';

        const scope = sut.createScopeFor(manager, resource, scopeIdentifier);

        expect(scope).toBeInstanceOf(Scope);
        expect(scope.getResource()).toEqual(resource);
        expect(scope.getScopeIdentifier()).toEqual(scopeIdentifier);
    });

    test('test createsSCopesWithParent', () => {
        const manager = new Manager();
        let resource = new ResourceAbstract();
        let scopeIdentifier = 'parent_identifier';
        let scope = new Scope(manager, resource, scopeIdentifier);
        scope.setParentScopes(['parent_scope']);

        resource = new ResourceAbstract();
        scopeIdentifier = 'foo_identifier';

        const expectedParentScopes = [
            'parent_scope',
            'parent_identifier'
        ];

        const sut = new ScopeFactory();
        scope = sut.createChildScopeFor(manager, scope, resource, scopeIdentifier);

        expect(scope).toBeInstanceOf(Scope);
        expect(scope.getResource()).toEqual(resource);
        expect(scope.getScopeIdentifier()).toEqual(scopeIdentifier);
        expect(scope.getParentScopes()).toEqual(expectedParentScopes);
    });

    function instanceOfScopeFactoryInterface(object: any): object is ScopeFactoryInterface {
        return 'createScopeFor' in object && 'createChildScopeFor' in object;
    }

});
