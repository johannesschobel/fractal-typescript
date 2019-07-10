import {Collection} from '~/resource/Collection';
import {ResourceInterface} from '~/resource/ResourceInterface';
import {Scope} from '~/Scope';

export abstract class TransformerAbstract {

    protected availableIncludes: any[] = [];
    protected defaultIncludes: any[] = [];
    protected currentScope: Scope;

    public getAvailableIncludes(): any[] {
        return this.availableIncludes;
    }

    public getDefaultIncludes(): any[] {
        return this.availableIncludes;
    }

    public getCurrentScope() {
        return this.currentScope;
    }

    public figureOutWhichIncludes(scope: Scope): any[] {
        // todo: implement this
        return null;
    }

    public processIncludedResources(scope: Scope, data: any): any[] {
        // todo: implement this
        return null;
    }

    public setAvailableIncludes(availableIncludes: any[]): this {
        this.availableIncludes = availableIncludes;
        return this;
    }

    public setDefaultIncludes(defaultIncludes: any[]): this {
        this.defaultIncludes = defaultIncludes;
        return this;
    }

    public setCurrentScope(currentScope: Scope): this {
        this.currentScope = currentScope;
        return this;
    }

    public transform(data: any): any {
        // todo implement this
        return null;
    }

    protected callIncludedMethod(scope: Scope, includedName: string, data: any): ResourceInterface {
        // todo: implement this
        return null;
    }

    protected primitive(data: any, transformer: any, resourceKey: string): any {
        // todo: implement this
    }

    protected collection(data: any, transformer: TransformerAbstract, resourceKey: string): Collection {
        // todo: implement this
        return null;
    }

    protected null(): any {
        return null;
    }

    private includeResourcesIfAvailable(scope: Scope, data: any, includedData: any[], include: string): any[] {
        // todo: implement this
        return null;
    }
}
