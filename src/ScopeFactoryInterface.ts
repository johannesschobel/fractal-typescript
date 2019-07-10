import {Manager} from '~/Manager';
import {ResourceInterface} from '~/resource/ResourceInterface';
import {Scope} from '~/Scope';

export interface ScopeFactoryInterface {

    createScopeFor(
        manager: Manager, resource: ResourceInterface, scopeIdentifier: string
    ): Scope;

    createChildScopeFor(
        manager: Manager, parentScope: Scope, resource: ResourceInterface, scopeIdentifier: string
    ): Scope;
}
