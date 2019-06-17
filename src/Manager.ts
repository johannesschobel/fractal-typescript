import {SerializerAbstract} from "./serializer/SerializerAbstract";
import {ScopeFactoryInterface} from "./ScopeFactoryInterface";
import {ResourceInterface} from "./resource/ResourceInterface";
import {Scope} from "./Scope";
import {DataArraySerializer} from "./serializer/DataArraySerializer";
import {ParamBag} from "./ParamBag";
import {ScopeFactory} from "./ScopeFactory";

export class Manager{

    protected requestedIncludes: Array<any> = [];
    protected requestedExcludes: Array<any> = [];
    protected requestedFieldsets: Array<any> = [];
    protected includeParams: Array<any> = [];
    protected paramDelimiter: string = "|";
    protected recursionLimit: number = 10;
    protected serializer: SerializerAbstract;

    private scopeFactory: ScopeFactoryInterface;

    constructor(scopeFactory: ScopeFactoryInterface) {
        if(scopeFactory === undefined){
            this.scopeFactory = new ScopeFactory();
        }
        this.scopeFactory = scopeFactory;
    }

    public createData(resource: ResourceInterface, scopeIdentifier: string = null, parentScopeInstance: Scope = null): Scope{
        if(parentScopeInstance !== null){
            return this.scopeFactory.createChildScopeFor(this, parentScopeInstance, resource, scopeIdentifier);
        }

        return this.scopeFactory.createScopeFor(this, resource, scopeIdentifier);
    }

    public getIncludeParams(include: string){
        //todo: implement this
    }

    public getRequestedIncluddes(): Array<any>{
        return this.requestedIncludes;
    }

    public getRequestedExcludes(): Array<any>{
        return this.requestedExcludes;
    }

    public getSerializer(): SerializerAbstract{
        if(!this.serializer){
            this.setSerializer(new DataArraySerializer());
        }

        return this.serializer;
    }

    public parseIncludes(includes: Array<string>): this{
        this.requestedIncludes = this.includeParams = [];

        for (const include of includes) {
            // todo: implement this
        }

        return this;
    }

    public parseFieldsets(fieldsets: Array<string>): this{
        this.requestedFieldsets = [];
        // todo: implement this
        return this;
    }

    public getRequestedFieldsets(): Array<any>{
        return this.requestedFieldsets;
    }

    public getFieldsets(type: string): ParamBag{
        // todo: implement this
        return null;
    }

    public parseExcludes(excludes: Array<string>): this{
        // todo: implement this
        return this;
    }

    public setRecursionLimit(recursionLimit: number): this{
        this.recursionLimit = recursionLimit;
        return this;
    }

    public setSerializer(serializer: SerializerAbstract): this{
        this.serializer = serializer;
        return this;
    }

    protected autoIncludeParents(): void{
        let parsed = [];
        // todo: implement this
    }

    protected trimToAcceptRecursionLevel(includeName: string): string{
        return null;
    }

}