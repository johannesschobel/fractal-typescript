import {ScopeFactoryInterface} from "./ScopeFactoryInterface";
import {Manager} from "./Manager";
import {Scope} from "./Scope";
import {ResourceAbstract} from "./resource/ResourceAbstract";

export class ScopeFactory implements ScopeFactoryInterface{

    public createScopeFor(manager: Manager, resource: ResourceAbstract, scopeIdentifier: any): Scope{
        return new Scope(manager, resource, scopeIdentifier);
    }

    public createChildScopeFor(manager: Manager, parentScopeInstance: Scope, resource: ResourceAbstract, scopeIdentifier: string): Scope {
        let scopeInstance = this.createScopeFor(manager, resource, scopeIdentifier);

        let scopeArray = parentScopeInstance.getParentScopes();
        scopeArray.push(parentScopeInstance.getScopeIdentifier());

        scopeInstance.setParentScopes(scopeArray);
        return scopeInstance;
    }

}