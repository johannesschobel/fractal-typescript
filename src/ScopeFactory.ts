import {Manager} from './Manager';
import {ResourceAbstract} from './resource/ResourceAbstract';
import {Scope} from './Scope';
import {ScopeFactoryInterface} from './ScopeFactoryInterface';

export class ScopeFactory implements ScopeFactoryInterface {

    public createScopeFor(manager: Manager, resource: ResourceAbstract, scopeIdentifier: any): Scope {
        return new Scope(manager, resource, scopeIdentifier);
    }

    public createChildScopeFor(
        manager: Manager, parentScopeInstance: Scope, resource: ResourceAbstract, scopeIdentifier: string
    ): Scope {
        const scopeInstance = this.createScopeFor(manager, resource, scopeIdentifier);

        const scopeArray = parentScopeInstance.getParentScopes();
        // scopeArray = parentScopeInstance.getScopeIdentifier();

        scopeInstance.setParentScopes(scopeArray);
        return scopeInstance;
    }
}
