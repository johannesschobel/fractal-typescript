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
    protected requestedFieldsets: {} = {};
    protected includeParams: {} = {};
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
        // @ts-ignore
        const params: {} = (this.includeParams[include] !== undefined) ? this.includeParams : {};
        return new ParamBag(params);
    }

    public getRequestedIncludes(): any[] {
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
        this.requestedIncludes = [];
        this.includeParams = {};

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

            // @ts-ignore
            if (this.requestedIncludes[includeName] !== undefined) {
                continue;
            }
            // @ts-ignore
            this.requestedIncludes[includeName] = '';

            if (allModifiersStr === null) {
                continue;
            }

            const allModifiersArr = includesString.match(/([\w]+)(\(([^\)]+)\))?/g);

            for (const modifier of allModifiersArr) {
                const modifierName = modifier.split('(')[0];
                const modifierParams = modifier.match(/\(([^)]+)\)/);
                let modifierArr: any[] = [''];
                if (modifierParams !== null) {
                    modifierArr = modifierParams[1].split('|');
                }
                // @ts-ignore
                this.includeParams[modifierName] = modifierArr;
            }
        }

        this.autoIncludeParents();
        return this;
    }

    public parseFieldsets(fieldsets: any): this {
        this.requestedFieldsets = {};
        for (const key of Object.keys(fieldsets)) {
            const fieldset = fieldsets[key];
            let fields = fieldset;
            if (typeof fieldset === 'string') {
                fields = fieldset.split(',');
                fields = fields.filter((v: any) => v !== '');
            }
            // @ts-ignore
            this.requestedFieldsets[key] = fields.filter(this.onlyUnique);
        }
        return this;
    }

    public getRequestedFieldsets(): {} {
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

        for (const include of Object.keys(this.requestedIncludes)) {
            const nested = include.split('.');

            let part = nested.shift();
            parsed.push(part);

            while (nested.length > 0) {
                part += '.' + nested.shift();
                parsed.push(part);
            }
        }

        this.requestedIncludes = parsed.filter(this.onlyUnique);

    }

    protected trimToAcceptRecursionLevel(includeName: string): string {
        return includeName.split('.').slice(0, this.recursionLimit).join('.');
    }

    private onlyUnique(value: any, index: any, self: any) {
        return self.indexOf(value) === index;
    }
}
