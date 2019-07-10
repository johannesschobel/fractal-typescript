import {Manager} from '~/Manager';
import {ParamBag} from '~/ParamBag';
import {ResourceInterface} from '~/resource/ResourceInterface';
import {SerializerAbstract} from '~/serializer/SerializerAbstract';
import {Collection} from './resource/Collection';
import {Item} from './resource/Item';
import {NullResource} from './resource/NullResource';
import {ResourceAbstract} from './resource/ResourceAbstract';
import {TransformerAbstract} from './TransformerAbstract';

export class Scope {

    protected availableIncludes: any[] = [];
    protected scopeIdentifier: string;
    protected manager: Manager;
    protected resource: ResourceAbstract;
    protected parentScopes: any[] = [];

    constructor(manager: Manager, resource: ResourceAbstract, scopeIdentifier: string = null) {
        this.scopeIdentifier = scopeIdentifier;
        this.manager = manager;
        this.resource = resource;
    }

    public embedChildScope(scopeIdentifier: string, resource: ResourceAbstract) {
        return this.manager.createData(resource, scopeIdentifier, this);
    }

    public getScopeIdentifier(): string {
        return this.scopeIdentifier;
    }

    public getIdentifiers(): string {
        // todo: implement this
        return null;
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
        // todo: implement this
        return;
    }

    public isExcluded(checkScopeSegment: string): boolean {
        // todo: implement this
        return null;
    }

    public pushParentScope(identifierSegment: string): number {
        // todo: implement this
        return null;
    }

    public setParentScopes(parentScopes: string[]): this {
        this.parentScopes = parentScopes;
        return this;
    }

    public toArray(): any[] {
        const resourceTransformers = this.executeResourceTransformers();
        const rawData = resourceTransformers[0];
        const rawIncludedData = resourceTransformers[1];

        const serializer = this.manager.getSerializer();

        const data = this.serializeResource(serializer, rawData);

        if (serializer.sideloadIncludes()) {
            // todo: implement this
        }

        if (this.resource instanceof Collection) {
            let pagination = null;
            if (this.resource.hasCursor()) {
                pagination = serializer.cursor(this.resource.getCursor());
            } else if (this.resource.hasPaginator()) {
                pagination = serializer.paginator(this.resource.getPaginator());
            }

            if (pagination !== null) {
                // todo: implement this
            }
        }

        const meta = serializer.meta(this.resource.getMeta());

        if (data === null) {
            if (meta !== null) {
                return meta;
            }
            return null;
        }

        return {...data, ...meta};
    }

    public toJson(): string {
        // todo: check whether options are possible
        return JSON.stringify(this.toArray());
    }

    public transformPrimitiveResource(): any {
        // todo implement this
        return null;
    }

    protected executeResourceTransformers(): any[] {
        const transformer = this.resource.getTransformer();
        const data = this.resource.getData();

        let transformedData = [];
        let includedData = [];

        if (this.resource instanceof Item) {
            const fireTransformer = this.fireTransformer(transformer, data);
            transformedData = fireTransformer[0];
            includedData = fireTransformer[1];
        } else if (this.resource instanceof Collection) {
            for (const dataEntry of data) {
                const fireTransformer = this.fireTransformer(transformer, dataEntry);
                transformedData.push(fireTransformer[0]);
                includedData.push(fireTransformer[1]);
            }
        } else if (this.resource instanceof NullResource) {
            transformedData = null;
            includedData = [];
        } else {
            throw new Error('Argument resource should be an instance of Item or Collection')
        }

        return [transformedData, includedData];
    }

    protected serializeResource(serializer: SerializerAbstract, data: any): any[] {
        const resourceKey = this.resource.getResourceKey();

        if (this.resource instanceof Collection) {
            return serializer.collection(resourceKey, data);
        }

        if (this.resource instanceof Item) {
            return serializer.item(resourceKey, data);
        }

        return serializer.null();
    }

    protected fireTransformer(transformer: CallableFunction | TransformerAbstract, data: any): any {
        let includedData = [];
        let transformedData;

        if (this.isFunction(transformer)) {
            // @ts-ignore
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

        return [transformedData, includedData];
    }

    protected fireIncludedTransformers(transformer: TransformerAbstract, data: any): any[] {
        // todo implement this
        return [];
    }

    protected transformerHasIncludes(transformer: TransformerAbstract): boolean {
        // todo implement this
        return null;
    }

    protected isRootScope(): boolean {
        // todo implement this
        return null;
    }

    protected filterFieldsets(data: any[]): any[] {
        // todo implement this
        return data;
    }

    protected getFilterFielset(): ParamBag {
        // todo implement this
        return null;
    }

    protected hasFilterFieldset(): boolean {
        // todo implement this
        return null;
    }

    protected getResourceType(): string {
        // todo implement this
        return null;
    }

    private isFunction(functionToCheck: any): boolean {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
}
