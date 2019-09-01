import {Manager} from '../src/Manager';
import {ResourceInterface} from '../src/resource/ResourceInterface';
import {Scope} from '../src/Scope';

export interface ScopeFactoryInterface {

    createScopeFor(
        manager: Manager, resource: ResourceInterface, scopeIdentifier: string
    ): Scope;

    createChildScopeFor(
        manager: Manager, parentScope: Scope, resource: ResourceInterface, scopeIdentifier: string
    ): Scope;
}
