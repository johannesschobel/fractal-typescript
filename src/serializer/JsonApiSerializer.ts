import {PaginatorInterface} from '~/paginaton/PaginatorInterface';
import {ResourceInterface} from '~/resource/ResourceInterface';
import {ArraySerializer} from '../../src/serializer/ArraySerializer';

export class JsonApiSerializer extends ArraySerializer {
    protected baseUrl: string;
    protected rootObjects: [];

    constructor(baseUrl: string = null) {
        super();
        this.baseUrl = baseUrl;
        this.rootObjects = [];
    }

    public collection(resourceKey: string, data: []): {} {
        const resources = [] as any[];

        for (const resource of data) {
            // @ts-ignore
            resources.push(this.item(resourceKey, resource).data);
        }

        return {data: resources};
    }

    public item(resourceKey: string, data: { meta: {}, links: {} }): {} {
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

        const result = {meta};

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
        let serializedData: [] = pullOutNestedIncludedData[0];
        let linkedIds = pullOutNestedIncludedData[1];

        for (const key of Object.keys(data)) {
            // @ts-ignore
            if (this.isNull((data[key])) || this.isEmpty(data[key])) {
                continue;
            }

            // @ts-ignore
            const includeObjects = this.createIncludeObjects(data[key]);
            // @ts-ignore
            const serializeIncludedObjectsWithCacheKey = this.serializeIncludedObjectsWithCacheKey(includeObjects,
                linkedIds, serializedData);
            serializedData = serializeIncludedObjectsWithCacheKey[0];
            linkedIds = serializeIncludedObjectsWithCacheKey[1];
        }

        return Object.keys(serializedData)[0] === undefined ? {} : {included: serializedData};
    }

    public sideloadIncludes(): boolean {
        return true;
    }

    public injectData(data: {}, includedData: any[]): {} {
        const relationships = this.parseRelationships(includedData);

        if (Object.keys(relationships)[0] !== undefined) {
            data = this.fillRelationships(data, relationships);
        }
        return data;
    }

    public filterIncludes(includedData: {}, data: any[]): {} {
        // @ts-ignore
        if (includedData.included === undefined) {
            return includedData;
        }

        this.createRootObjects(data);

        // @ts-ignore
        // includedData.included = includedData.included.filter((key) => key !== 'filterRootObject');

        return includedData;
    }

    public getMandatoryFields(): string[] {
        return ['id'];
    }

    public injectAvailableIncludeData(data: {}, availableIncludes: []): any {
        if (!this.shouldIncludeLinks()) {
            return data;
        }

        if (this.isCollection(data)) {
            let resource = {};
            for (const relationshipKey of availableIncludes) {
                resource = this.addRelationsipLinks(resource, relationshipKey);
            }
            // @ts-ignore
            data.data = resource;
        } else {
            for (const relationshipKey of availableIncludes) {
                // @ts-ignore
                data.data = this.addRelationsipLinks(data.data, relationshipKey);
            }
        }
        return data;
    }

    protected filterRootObject(object: {}): boolean {
        return !this.isRootObject(object);
    }

    protected setRootObjects(objects: []): void {
        for (const object of objects) {
            const rootObject = {};
            // @ts-ignore
            const type = object.type;
            // @ts-ignore
            rootObject[type] = object.id;
            // @ts-ignore
            this.rootObjects.push(rootObject);
        }
    }

    protected isRootObject(object: {}): boolean {
        // @ts-ignore
        return this.rootObjects.includes(object);
    }

    protected isCollection(data: {}): boolean {
        return Array.isArray(data);
    }

    protected isNull(data: {}): boolean {
        // @ts-ignore
        return data.data === null;
    }

    protected isEmpty(data: {}): boolean {
        // @ts-ignore
        return data.data === {};
    }

    protected fillRelationships(data: {}, relationships: {}): {} {
        if (this.isCollection(data)) {
            for (const key of Object.keys(relationships)) {
                // @ts-ignore
                data = this.fillRelationshipAsCollection(data, relationships[key], key);
            }
        } else {
            for (const key of Object.keys(relationships)) {
                // @ts-ignore
                data = this.fillRelationshipAsSingleResource(data, relationships[key], key)
            }
        }
        return data;
    }

    protected parseRelationships(includedData: {}): {} {
        let relationships = {};
        for (const includeKey of Object.keys(includedData)) {
            // @ts-ignore
            for (const key of Object.keys(includedData[includeKey])) {
                // @ts-ignore
                relationships = this.buildRelationship(includeKey, relationships, includedData[includeKey]);
                // @ts-ignore
                if (includedData[includeKey].meta !== undefined) {
                    // @ts-ignore
                    relationships[includeKey].meta = includedData[includeKey].meta;
                }
            }
        }
        return relationships;
    }

    protected getIdFromData(data: {}): number {
        // @ts-ignore
        if (data.id === undefined) {
            throw new Error('JSON API resource objects MUST have a valid id');
        }
        // @ts-ignore
        return data.id;
    }

    protected pullOutNestedIncludedData(data: {}): any[] {
        const includedData = {};
        const linkedIds = {};

        for (const key of Object.keys(data)) {
            // @ts-ignore
            if (data[key].included !== undefined) {
                // @ts-ignore
                this.serializeIncludedObjectsWithCacheKey(data[key].included, linkedIds, includedData);
            }
        }

        return [includedData, linkedIds];
    }

    protected shouldIncludeLinks(): boolean {
        return this.baseUrl !== null;
    }

    private createIncludeObjects(includeObject: {}): {} {
        let includeObjects = [] as any[];
        if (this.isCollection(includeObject)) {
            // @ts-ignore
            includeObjects = includeObject.data;
            return includeObjects === undefined ? {} : includeObjects;
        } else {
            // @ts-ignore
            includeObjects.push(includeObject.data);
            return includeObjects;
        }
    }

    private createRootObjects(data: {}): void {
        // @ts-ignore
        this.setRootObjects(data.data);
    }

    private fillRelationshipAsCollection(data: {}, relationship: {}, key: string): {} {
        for (const relationKey of Object.keys(relationship)) {
            // @ts-ignore
            data.data[relationKey].relationships[key] = relationship;
        }
        return data;
    }

    private fillRelationshipAsSingleResource(data: {}, relationship: {}, key: string): {} {
        // @ts-ignore
        data.data.relationships = {};
        // @ts-ignore
        data.data.relationships[key] = relationship;
        return data;
    }

    private buildRelationship(includeKey: string, relationships: {}, includeObject: {}): {} {
        relationships = this.addIncludekeyToRelationsIfNotSet(includeKey, relationships);
        let relationship = {};

        if (this.isNull(includeObject)) {
            relationship = this.null();
        } else if (this.isEmpty(includeObject)) {
            relationship = {
                data: []
            };
        } else if (this.isCollection(includeObject)) {
            relationship = {
                data: []
            };
            relationship = this.addIncludedDataToRelationship(includeObject, relationships);
        } else {
            // @ts-ignore
            const id = includeObject.data.id;
            // @ts-ignore
            const type = includeObject.data.type;
            relationship = {
                data: {
                    id,
                    type
                }
            }
        }

        // @ts-ignore
        relationships[includeKey] = relationship;
        return relationships;
    }

    private addIncludekeyToRelationsIfNotSet(includeKey: string, relationship: {}): {} {
        // @ts-ignore
        if (relationship[includeKey] === undefined) {
            // @ts-ignore
            relationship[includeKey] = [];
            return relationship;
        }
        return relationship;
    }

    private addIncludedDataToRelationship(includeObject: {}, relationship: {}): {} {
        // @ts-ignore
        for (const object of Object.keys(includeObject.data)) {
            // @ts-ignore
            const type = object.type;
            // @ts-ignore
            const id = object.id;
            // @ts-ignore
            relationship.data = {
                id,
                type
            }
        }
        return relationship;
    }

    private addRelationsipLinks(resource: {}, relationshipKey: string): {} {
        // @ts-ignore
        if (resource.relationships !== undefined || resource.relationships[relationshipKey] !== undefined) {
            // @ts-ignore
            resource.relationsships[relationshipKey] = [];
        }

        // @ts-ignore
        const type = resource.type;
        // @ts-ignore
        const id = resource.id;
        const links = {
            links: {
                related: this.baseUrl + '/' + type + '/' + id + '/' + relationshipKey,
                self: this.baseUrl + '/' + type + '/' + id + '/relationships' + relationshipKey
            }
        };
        // @ts-ignore
        resource.relationships[relationshipKey] = {...links, ...resource.relationships[relationshipKey]};
        return resource;
    }

    private serializeIncludedObjectsWithCacheKey(includedObjects: [], linkedIds: {}, serializedData: {}): any[] {
        for (const object of includedObjects) {
            // @ts-ignore
            const includeType = object.type;
            // @ts-ignore
            const includeId = object.id;
            const cacheKey = includeType + '+' + includeId;
            // @ts-ignore
            if (linkedIds[cacheKey] === undefined) {
                serializedData = object;
                // @ts-ignore
                linkedIds[cacheKey] = object;
            }
        }
        return [serializedData, linkedIds];
    }
}
