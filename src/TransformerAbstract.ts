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

    public processIncludedResources(scope: Scope, data: any): any[] {
        let includedData = [];
        const includes = this.figureOutWhichIncludes(scope);

        for (const include of includes) {
            includedData = this.includeResourcesIfAvailable(scope, data, includedData, include);
        }
        return includedData;
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

    protected callIncludeMethod(scope: Scope, includedName: string, data: any): ResourceInterface {
        const scopeIdentifier = scope.getIdentifiers(includedName);
        const params = scope.getManager().getIncludeParams(scopeIdentifier);

        const replaceHyphens = includedName.replace('-', ' ').replace('_', ' ');
        const uppercaseEachWord = replaceHyphens.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        const replaceWhitespaces = uppercaseEachWord.replace(' ', '');
        const methodName = 'include' + replaceWhitespaces;
        // todo: $resource = call_user_func([$this, $methodName], $data, $params);
        // @ts-ignore
        const resource = this.methodName.call(this, data, params);

        return null;
    }

    protected primitive(data: any, transformer: any, resourceKey: string): any {
        // todo: implement this
    }

    protected item(data: any, transformer: any, resourceKey: any = null): Item {
        return new Item(data, transformer, resourceKey);
    }

    protected collection(data: any, transformer: TransformerAbstract, resourceKey: string): Collection {
        // todo: implement this
        return null;
    }

    protected null(): any {
        return new NullResource();
    }

    private includeResourcesIfAvailable(scope: Scope, data: any, includedData: any, include: string): any[] {
        const resource = this.callIncludeMethod(scope, include, data);
        if (resource) {
            const childScope = scope.embedChildScope(include, resource);

            if (childScope.getResource() instanceof Primitive) {
                includedData[include] = childScope.transformPrimitiveResource();
            } else {
                includedData[include] = childScope.toArray();
            }
        }
        return includedData;
    }
}
