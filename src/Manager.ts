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
        const params: boolean | any[] = (this.includeParams.indexOf(include) > -1) ? [include] : [];
        return new ParamBag(params);
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

        for (const include of includes) {
            const includeEntry = CommonUtils.padding(include.split(':', 2), 2, null);
            const includeName = this.trimToAcceptRecursionLevel(includeEntry[0]);
            const allModifiersStr = includeEntry[1];

            if (this.requestedIncludes.indexOf(includeName) > -1) {
                continue;
            }
            this.requestedIncludes.push(includeName);

            if (allModifiersStr === null) {
                continue;
            }

            const allModifiersArr = allModifiersStr.match('/([\w]+)(\(([^\)]+)\))?/');
            const modifierCount = allModifiersArr.length;

            const modifierArr = [];

            for (let modifierIt = 0; modifierIt < modifierCount; modifierIt++) {
                const modifierName = allModifiersArr[1][modifierIt];

                const modifierParamStr = allModifiersArr[3][modifierIt];

                modifierArr[modifierIt] = modifierParamStr.split(this.paramDelimiter);
            }

            const indexOfIncludeName = this.includeParams.indexOf(includeName);
            // this.includeParams[indexOfIncludeName] = modifierArr;
        }

        this.autoIncludeParents();
        return this;
    }

    public parseFieldsets(fieldsets: any[]): this {
        this.requestedFieldsets = [];
        for (const fieldset of fieldsets) {
            let fields;
            if (typeof fieldset === 'string') {
                fields = fieldset.split(',');
            }
            const type = Object.keys(fieldset)[0];
            // @ts-ignore
            this.requestedFieldsets[type] = fieldset[type];
        }
        return this;
    }

    public getRequestedFieldsets(): any[] {
        return this.requestedFieldsets;
    }

    public getFieldset(type: string): ParamBag | null {
        // @ts-ignore
        return this.requestedFieldsets[type] === undefined ? null : new ParamBag(this.requestedFieldsets[type]);
    }

    public parseExcludes(excludeString: string = null, excludeArray: string[] = null): this {
        this.requestedExcludes = [];

        let excludes;

        if (excludeString != null) {
            excludes = excludeString.split(',');
        } else if (excludeArray != null) {
            excludes = excludeArray;
        }

        for (const exclude of excludes) {
            const excludeName = this.trimToAcceptRecursionLevel(exclude);

            if (this.requestedExcludes.indexOf(excludeName) > -1) {
                continue;
            }

            this.requestedExcludes.push(excludeName);

        }

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

        for (const include of this.requestedIncludes) {
            const nested = include.split('.');

            let part = nested.shift();
            parsed.push(part);

            while (nested.length > 0) {
                part += '.' + nested.shift();
                parsed.push(part);
            }
        }

        this.requestedIncludes = parsed;

    }

    protected trimToAcceptRecursionLevel(includeName: string): string {
        return includeName.split('.').slice(0, this.recursionLimit).join('.');
    }
}
