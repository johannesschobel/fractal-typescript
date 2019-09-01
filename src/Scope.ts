import {Manager} from '../src/Manager';
import {ResourceTransformationResult} from '../src/models/ResourceTransformationResult';
import {TransformationResult} from '../src/models/TransformationResult';
import {ParamBag} from '../src/ParamBag';
import {ResourceInterface} from '../src/resource/ResourceInterface';
import {SerializerAbstract} from '../src/serializer/SerializerAbstract';
import {Collection} from './resource/Collection';
import {Item} from './resource/Item';
import {NullResource} from './resource/NullResource';
import Primitive from './resource/Primitive';
import {ResourceAbstract} from './resource/ResourceAbstract';
import {TransformerAbstract} from './TransformerAbstract';

export class Scope {

    protected availableIncludes: any[] = [];
    protected scopeIdentifier: string;
    protected manager: Manager;
    protected resource: ResourceAbstract;
    protected parentScopes: string[] = [];

    public constructor(manager: Manager, resource: ResourceAbstract, scopeIdentifier: string = null) {
        this.scopeIdentifier = scopeIdentifier;
        this.manager = manager;
        this.resource = resource;
    }

    public embedChildScope(scopeIdentifier: string, resource: ResourceInterface): Scope {
        return this.manager.createData(resource, scopeIdentifier, this);
    }

    public getScopeIdentifier(): string {
        return this.scopeIdentifier;
    }

    public getIdentifiers(appendIdentifier: string = null): string {
        let identifierParts: string[] = [];

        if (this.parentScopes.length > 0) {
            identifierParts = identifierParts.concat(this.parentScopes);
        }
        identifierParts.push(this.scopeIdentifier);
        if (appendIdentifier !== null) {
            identifierParts.push(appendIdentifier);
        }

        return identifierParts.filter((el) => el !== null).join('.');
    }

    public getParentScopes(): string[] {
        return this.parentScopes;
    }

    public getManager(): Manager {
        return this.manager;
    }

    public getResource(): ResourceInterface {
        return this.resource;
    }

    public isRequested(checkScopeSegment: string): boolean {
        let scopeArray: string[] = [];
        if (this.parentScopes.length > 0) {
            scopeArray = this.parentScopes.slice(1);
            scopeArray.push(this.scopeIdentifier, checkScopeSegment);
        } else {
            scopeArray = [checkScopeSegment];
        }
        const scopeString = scopeArray.join('.');

        return this.manager.getRequestedIncludes().some((entries) => entries === scopeString);
    }

    public isExcluded(checkScopeSegment: string): boolean {
        let scopeArray = [];
        if (this.parentScopes[0] != null) {
            scopeArray = this.parentScopes.slice(1);
            scopeArray.push(this.scopeIdentifier, checkScopeSegment);
        } else {
            scopeArray.push(checkScopeSegment);
        }

        const scopeString = scopeArray.join('.');
        return this.manager.getRequestedExcludes().indexOf(scopeString) > -1;
    }

    public pushParentScope(identifierSegment: string): number {
        this.parentScopes.push(identifierSegment);
        return this.parentScopes.length;
    }

    public setParentScopes(parentScopes: string[]): this {
        this.parentScopes = parentScopes;
        return this;
    }

    public toObject(): TransformationResult<any> {
        const resourceTransformers: ResourceTransformationResult = this.executeResourceTransformers();
        const rawData = resourceTransformers.transformedData;
        const rawIncludedData = resourceTransformers.includedData;

        const serializer = this.manager.getSerializer();

        let data = this.serializeResource(serializer, rawData);

        if (serializer.sideloadIncludes()) {
            let includedData = serializer.includedData(this.resource, rawIncludedData);

            data = serializer.injectData(data, rawIncludedData);

            if (this.isRootScope()) {
                includedData = serializer.filterIncludes(includedData, data);
            }

            data =  {...data, ...includedData}
        }

        if (this.availableIncludes.length !== 0) {
            data = serializer.injectAvailableIncludeData(data, this.availableIncludes);
        }

        if (this.resource instanceof Collection) {
            let pagination = null;
            if (this.resource.hasCursor()) {
                pagination = serializer.cursor(this.resource.getCursor());
            } else if (this.resource.hasPaginator()) {
                pagination = serializer.paginator(this.resource.getPaginator());
            }

            if (pagination !== null) {
                const key = Object.keys(pagination)[0];
                this.resource.setMetaValue(key, pagination[key]);
            }
        }

        const meta = serializer.meta(this.resource.getMeta());

        if (data === null) {
            if (meta !== null && meta.meta !== undefined) {
                return meta;
            }
            return null;
        }

        return {...data, ...meta};
    }

    public toString(): string {
        return JSON.stringify(this.toObject());
    }

    public transformPrimitiveResource(): any {
        if (!(this.resource instanceof Primitive)) {
            throw new Error('Argument should be instance of Primitive');
        }

        const transformer = this.resource.getTransformer();
        const data = this.resource.getData();

        let transformedData;
        if (null === transformer) {
            transformedData = data;
        } else if (this.isFunction(transformer)) {
            transformedData = transformer.apply(data);
        } else {
            transformer.setCurrentScope(this);
            transformedData = transformer.transform(data);
        }
        return transformedData;
    }

    protected isRootScope(): boolean {
        return this.parentScopes[0] !== undefined;
    }

    protected executeResourceTransformers(): ResourceTransformationResult {
        const transformer = this.resource.getTransformer();
        const data = this.resource.getData();

        let transformedData = [];
        let includedData = [];

        if (this.resource instanceof Item) {
            const fireTransformer = this.fireTransformer(transformer, data);
            transformedData = fireTransformer.transformedData;
            includedData = fireTransformer.includedData;
        } else if (this.resource instanceof Collection) {
            for (const dataEntry of data) {
                const fireTransformer = this.fireTransformer(transformer, dataEntry);
                transformedData.push(fireTransformer.transformedData);
                includedData.push(fireTransformer.includedData);
            }
        } else if (this.resource instanceof NullResource) {
            transformedData = null;
            includedData = null;
        } else {
            throw new Error('Argument resource should be an instance of Item or Collection');
        }

        return new ResourceTransformationResult(transformedData, includedData);
    }

    protected serializeResource(serializer: SerializerAbstract, data: {}): any[] {
        const resourceKey = this.resource.getResourceKey();

        if (this.resource instanceof Collection) {
            return serializer.collection(resourceKey, data);
        }

        if (this.resource instanceof Item) {
            return serializer.item(resourceKey, data);
        }
        return serializer.null();
    }

    protected fireTransformer(transformer: () => any | TransformerAbstract, data: any): ResourceTransformationResult {
        let includedData = [];
        let transformedData = [];

        if (this.isFunction(transformer)) {
            transformedData = transformer.apply(data);
        } else if (transformer instanceof TransformerAbstract) {
            transformer.setCurrentScope(this);
            transformedData = transformer.transform(data);
        }

        if (transformer instanceof TransformerAbstract && this.transformerHasIncludes(transformer)) {
            includedData = this.fireIncludedTransformers(transformer, data);
            transformedData = this.manager.getSerializer().mergeIncludes(transformedData, includedData);
        }

        transformedData = this.filterFieldsets(transformedData);

        return new ResourceTransformationResult(transformedData, includedData);
    }

    protected fireIncludedTransformers(transformer: TransformerAbstract, data: {}): any[] {
        this.availableIncludes = transformer.getAvailableIncludes();
        const processIncludedResources = transformer.processIncludedResources(this, data);
        return processIncludedResources ? processIncludedResources : [];
    }

    protected transformerHasIncludes(transformer: TransformerAbstract): boolean {
        if (!(transformer instanceof TransformerAbstract)) {
            return false;
        }
        const defaultIncludes = transformer.getDefaultIncludes();
        const availableIncludes = transformer.getAvailableIncludes();
        return defaultIncludes.length !== 0 || availableIncludes.length !== 0;
    }

    protected filterFieldsets(data: {}): any {
        if (!this.hasFilterFieldset()) {
            return data;
        }
        const serializer = this.manager.getSerializer();
        const requestedFieldset = this.getFilterFielset();
        let requestedKey: any = {key: ''};
        requestedKey = requestedFieldset.params;
        return Object.keys(data)
            .filter((key) => requestedKey.includes(key))
            .reduce((obj, key) => {
                // @ts-ignore
                obj[key] = data[key];
                return obj;
            }, {});
    }

    protected getFilterFielset(): ParamBag {
        return this.manager.getFieldset(this.getResourceType());
    }

    protected hasFilterFieldset(): boolean {
        return this.getFilterFielset() !== null;
    }

    protected getResourceType(): string {
        return this.resource.getResourceKey();
    }

    private isFunction(functionToCheck: any): boolean {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
}