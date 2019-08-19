import {Collection} from '../src/resource/Collection';
import {Item} from '../src/resource/Item';
import {NullResource} from '../src/resource/NullResource';
import Primitive from '../src/resource/Primitive';
import {ResourceInterface} from '../src/resource/ResourceInterface';
import {Scope} from '../src/Scope';

export abstract class TransformerAbstract {

    protected availableIncludes: any[] = [];
    protected defaultIncludes: any[] = [];
    protected currentScope: Scope;

    public getAvailableIncludes(): any[] {
        return this.availableIncludes;
    }

    public getDefaultIncludes(): any[] {
        return this.defaultIncludes;
    }

    public getCurrentScope() {
        return this.currentScope;
    }

    public figureOutWhichIncludes(scope: Scope): any[] {
        const includes = this.getDefaultIncludes();

        for (const include of this.getAvailableIncludes()) {
            if (scope.isRequested(include)) {
                includes.push(include);
            }
        }

        for (const include of includes) {
            if (scope.isExcluded(include)) {
                const index = includes.indexOf(include);
                includes.splice(index, 1);
            }
        }

        return includes;
    }

    public processIncludedResources(scope: Scope, data: any): any {
        let includedData = {};
        const includes = this.figureOutWhichIncludes(scope);

        for (const include of includes) {
            includedData = this.includeResourcesIfAvailable(scope, data, includedData, include);
        }
        return Object.keys(includedData).length === 0 ? false : includedData;
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
        return [];
    }

    public item(data: any, transformer: any, resourceKey: any = null): Item {
        return new Item(data, transformer, resourceKey);
    }

    protected callIncludeMethod(scope: Scope, includedName: string, data: any): any {
        const scopeIdentifier = scope.getIdentifiers(includedName);
        const params = scope.getManager().getIncludeParams(scopeIdentifier);

        const replaceHyphens = includedName.replace('-', ' ').replace('_', ' ');
        const uppercaseEachWord = replaceHyphens.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        const replaceWhitespaces = uppercaseEachWord.replace(' ', '');
        const methodName = 'include' + replaceWhitespaces;
        // @ts-ignore
        const resource;
        // @ts-ignore
        if (this.__proto__[methodName] !== undefined) {
            // @ts-ignore
            resource =  this.__proto__[methodName].apply(this, [data, params]);
        } else {
            // @ts-ignore
            resource = this[methodName].apply(this, [data, params]);
        }

        if (resource === null) {
            return false;
        }

        if (!this.isResourceInterface(resource)) {
            throw new Error('Invalid return value');
        }

        return resource;
    }

    protected primitive(data: any, transformer: any, resourceKey: string): any {
        // @ts-ignore
        return new Primitive(data, transformer, resourceKey);
    }

    protected collection(data: any,
                         transformer: (n: any) => any| TransformerAbstract,
                         transformerClass: TransformerAbstract = null,
                         resourceKey: string): Collection {
        return new Collection(data, transformer, transformerClass, resourceKey);
    }

    protected null(): any {
        return new NullResource();
    }

    private isResourceInterface(resource: ResourceInterface): resource is ResourceInterface {
        if (resource === null) {
            return false;
        } else {
        return (resource as ResourceInterface).getData() !== undefined; }
    }

    private includeResourcesIfAvailable(scope: Scope, data: any, includedData: {}, include: string): {} {
        const resource = this.callIncludeMethod(scope, include, data);
        if (resource) {
            const childScope = scope.embedChildScope(include, resource);

            if (childScope.getResource() instanceof Primitive) {
                // @ts-ignore
                includedData[include] = childScope.transformPrimitiveResource();
            } else {
                // @ts-ignore
                includedData[include] = childScope.toArray();
            }
        }
        return includedData;
    }
}
