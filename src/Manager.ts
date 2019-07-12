import {ParamBag} from './ParamBag';
import {ResourceInterface} from './resource/ResourceInterface';
import {Scope} from './Scope';
import {ScopeFactory} from './ScopeFactory';
import {ScopeFactoryInterface} from './ScopeFactoryInterface';
import {DataArraySerializer} from './serializer/DataArraySerializer';
import {SerializerAbstract} from './serializer/SerializerAbstract';
import {CommonUtils} from './utils/CommonUtils';

export class Manager {

    protected requestedIncludes: any[] = [];
    protected requestedExcludes: any[] = [];
    protected requestedFieldsets: any[] = [];
    protected includeParams: string[] = [];
    protected paramDelimiter: string = '|';
    protected recursionLimit: number = 10;
    protected serializer: SerializerAbstract;

    private scopeFactory: ScopeFactoryInterface;

    constructor(scopeFactory: ScopeFactoryInterface = null) {
        this.scopeFactory = scopeFactory ? scopeFactory : new ScopeFactory();
    }

    public createData(
        resource: ResourceInterface, scopeIdentifier: string = null, parentScopeInstance: Scope = null
    ): Scope {
        if (parentScopeInstance !== null) {
            return this.scopeFactory.createChildScopeFor(this, parentScopeInstance, resource, scopeIdentifier);
        }

        return this.scopeFactory.createScopeFor(this, resource, scopeIdentifier);
    }

    public getIncludeParams(include: string): ParamBag {
        // let params = (this.includeParams.indexOf(include) > -1) ? this.includeParams.includes(include) : [];
        return new ParamBag(null);
    }

    public getRequestedIncluddes(): any[] {
        return this.requestedIncludes;
    }

    public getRequestedExcludes(): any[] {
        return this.requestedExcludes;
    }

    public getSerializer(): SerializerAbstract {
        if (!this.serializer) {
            this.setSerializer(new DataArraySerializer());
        }

        return this.serializer;
    }

    /**
     * Use either @param includesString or @param includesArray
     * @param includesString
     * @param includesArray
     */
    public parseIncludes(includesString: string = null, includesArray: string[] = null): this {
        this.requestedIncludes = this.includeParams = [];

        let includes: string [] = [];

        if (includesString != null) {
            includes = includesString.split(',')
        } else if (includesArray != null) {
            includes = includesArray;
        }

        includes.forEach((include) => {
            const includeEntry = CommonUtils.padding(include.split(':', 2), 2, null);
            const includeName = this.trimToAcceptRecursionLevel(includeEntry[0]);
            const allModifiersStr = includeEntry[1];

            // TODO continue (Manager.php: 184)

        });

        this.autoIncludeParents();
        return this;
    }

    public parseFieldsets(fieldsets: string[]): this {
        this.requestedFieldsets = [];
        // todo: implement this
        return this;
    }

    public getRequestedFieldsets(): any[] {
        return this.requestedFieldsets;
    }

    public getFieldsets(type: string): ParamBag {
        // todo: implement this
        return null;
    }

    public parseExcludes(excludes: string[]): this {
        // todo: implement this
        return this;
    }

    public setRecursionLimit(recursionLimit: number): this {
        this.recursionLimit = recursionLimit;
        return this;
    }

    public setSerializer(serializer: SerializerAbstract): this {
        this.serializer = serializer;
        return this;
    }

    protected autoIncludeParents(): void {
        const parsed = [];
        // todo: implement this
    }

    protected trimToAcceptRecursionLevel(includeName: string): string {
        return includeName.split('.').slice(0, this.recursionLimit).join('.');
    }
}
