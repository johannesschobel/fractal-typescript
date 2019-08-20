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
        let resources = [] as any[];

        for (const resource of Object.keys(data)) {
            // @ts-ignore
            resources = this.item(resourceKey, resource).data;
        }

        return {data: resources};
    }

    public item(resourceKey: string, data: {meta: {}, links: {}}): {} {
        const id = this.getIdFromData(data);

        const resource = {
            data: {
                attributes: data,
                id,
                type: resourceKey
            }
        };

        // @ts-ignore
        delete resource.data.attributes.id;

        let customLinks: {};
        if (resource.data.attributes.links !== undefined) {
            customLinks = data.links;
            delete resource.data.attributes.links;
        }

        if (resource.data.attributes.meta !== undefined) {
            // @ts-ignore
            resource.data.meta = data.meta;
            delete resource.data.attributes.meta;
        }

        const attributes = resource.data.attributes;
        if (Object.entries(attributes).length === 0 && attributes.constructor === Object) {
            // @ts-ignore
            resource.data.attributes = {};
        }

        if (this.shouldIncludeLinks()) {
            // @ts-ignore
            resource.data.links = {
                self: this.baseUrl + '/' + resourceKey + '/' + id
            };
            if (customLinks !== undefined) {
                // @ts-ignore
                resource.data.links = {...resource.data.links, ...customLinks}
            }
        }

        return resource;
    }

    public paginator(paginator: PaginatorInterface): {} {
        const currentPage = paginator.getCurrentPage();
        const lastPage = paginator.getLastPage();

        const pagination = {
            count: paginator.getCount(),
            current_page: currentPage,
            links: {
                first: '',
                last: '',
                next: '',
                prev: '',
                self: ''
            },
            per_page: paginator.getPerPage(),
            total: paginator.getTotal(),
            total_pages: lastPage
        };

        pagination.links.self = paginator.getUrl(currentPage);
        pagination.links.first = paginator.getUrl(1);

        if (currentPage > 1) {
            pagination.links.prev = paginator.getUrl(currentPage - 1);
        }

        if (currentPage < lastPage) {
            pagination.links.next = paginator.getUrl(currentPage + 1);
        }

        pagination.links.last = paginator.getUrl(lastPage);
        return {pagination};
    }

    public meta(meta: {}): {} {
        if (meta === undefined) {
           return {};
        }

        const result = { meta };

        // @ts-ignore
        if (result.meta.pagination !== undefined) {
           // @ts-ignore
            result.links = result.meta.pagination.links;
           // @ts-ignore
            delete result.meta.pagination.links;
        }

        return result;
    }

    public null(): {} {
        return {data: null}
    }

    public includedData(resource: ResourceInterface, data: {}): {} {
        const pullOutNestedIncludedData = this.pullOutNestedIncludedData(data);
        const serializedData = pullOutNestedIncludedData[0];
        const linkedIds = pullOutNestedIncludedData[1];

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

    protected pullOutNestedIncludedData(data: {}): any[] {
        // todo
        const includedData = {};
        const linkedIds = {};
        return [includedData, linkedIds];
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
