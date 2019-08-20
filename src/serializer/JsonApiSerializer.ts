import {PaginatorInterface} from '~/paginaton/PaginatorInterface';
import {ResourceInterface} from '~/resource/ResourceInterface';
import {ArraySerializer} from '../../src/serializer/ArraySerializer';

export class JsonApiSerializer extends ArraySerializer {
    protected baseUrl: string;
    protected rootObjects: {};

    constructor(baseUrl: string = null) {
        super();
        this.baseUrl = baseUrl;
        this.rootObjects = {};
    }

    public collection(resourceKey: string, data: {}): {} {
        const resources = [] as any[];

        for (const resource of Object.keys(data)) {
        }

        return {data: resources};
    }

    public item(resourceKey: string, data: {}): {} {
        const id = this.getIdFromData(data);

        // todo

        return {};
    }

    public paginator(paginator: PaginatorInterface): {} {
        // todo
        return {};
    }

    public meta(meta: {}): {} {
        // todo
        return {};
    }

    public null(): {} {
        return {data: null}
    }

    public includedData(resource: ResourceInterface, data: {}): {} {
        // todo
        return {};
    }

    public sideloadIncludes(): boolean {
        return true;
    }

    public injectData(data: any[], rawIncludedData: any[]): any[] {
        // todo
        return [];
    }

    public filterIncludes(includedData: any[], data: any[]): any[] {
        // todo
        return [];
    }

    public getMandatoryFields(): string[] {
        return ['id'];
    }

    public injectAvailableIncludeData(data: {}, availableIncludes: any): any {
        // todo
        return;
    }

    protected filterRootObject(object: {}): boolean {
        // todo
        return true;
    }

    protected setRootObjects(objects: []): void {
        // todo
    }

    protected isRootObject(object: {}): boolean {
        // todo
        return false;
    }

    protected isCollection(data: {}): boolean {
        // todo
        return true;
    }

    protected isNull(data: {}): boolean {
        // todo
        return false;
    }

    protected isEmpty(data: {}): boolean {
        // todo
        return false;
    }

    protected fileRelationships(data: {}, relationship: []): {} {
        // todo
        return {};
    }

    protected parseRelationships(includedData: {}): {} {
        // todo
        return {};
    }

    protected getIdFromData(data: {}): number {
        // todo
        return 0;
    }

    protected pullOutNestedIncludedData(data: {}): {} {
        // todo
        return {};
    }

    protected shouldIncludeLinks(): boolean {
        // todo
        return false;
    }

    private createIncludeObjects(includeObject: {}): {} {
        // todo
        return {};
    }

    private createRootObject(data: {}): void {
        // todo
    }

    private fileRelationshipAsCollection(data: {}, relationship: {}, key: string): {} {
        // todo
        return {};
    }

    private fillRelationshipAsSingleResource(data: {}, relationship: {}, key: string) {
        // todo
        return {};
    }

    private buildRelationship(inlcudeKey: string, relationsip: {}, includeObject: {}, key: string): {} {
        // todo
        return {};
    }

    private addIncludeKeyToRElationsIfNotSet(includeKey: string, relationship: {}): {} {
        // todo
        return {};
    }

    private addIncludedDataToRelationship(includeObject: {}, relationship: {}): {} {
        // todo
        return {};
    }

    private addRelationsipLinks(resource: {}, relationshipKey: string): {} {
        // todo
        return {};
    }

    private serializeIncludedObjectsWithCacheKey(includedObjects: {}, linkedIds: [], serializedData: {}): {} {
        // todo
        return {};
    }
}
