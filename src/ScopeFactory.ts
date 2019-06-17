import {ScopeFactoryInterface} from "./ScopeFactoryInterface";
import {Manager} from "./Manager";
import {ResourceInterface} from "./resource/ResourceInterface";
import {Scope} from "./Scope";

export class ScopeFactory implements ScopeFactoryInterface{

    public createScopeFor(manager: Manager, resource: ResourceInterface, scopeIdentifier: any){
        return new Scope(manager, resource, scopeIdentifier);
    }

    public createChildScopeFor(manager: Manager, parentScopeInstance: Scope, resource: ResourceInterface, scopeIdentifier: string): Scope {
        let scopeInstance = this.createScopeFor(manager, resource, scopeIdentifier);

        let scopeArray = parentScopeInstance.getParentScopes();
        // scopeArray = parentScopeInstance.getScopeIdentifier();

        scopeInstance.setParentScopes(scopeArray);
        return scopeInstance;
    }

}