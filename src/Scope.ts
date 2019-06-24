import {Manager} from "~/Manager";
import {ResourceInterface} from "~/resource/ResourceInterface";
import {SerializerAbstract} from "~/serializer/SerializerAbstract";
import {TransformerAbstract} from "~/TransformerAbstract";
import {ParamBag} from "~/ParamBag";

export class Scope{

    protected availableIncludes: Array<any> = [];
    protected scopeIdentifier: string;
    protected manager: Manager;
    protected resource: ResourceInterface;
    protected parentScopes: Array<any> = [];


    constructor(manager: Manager, resource: ResourceInterface, scopeIdentifier: string,) {
        this.scopeIdentifier = scopeIdentifier;
        this.manager = manager;
        this.resource = resource;
    }

    public embedChildScope(scopeIdentifier: string, resource: ResourceInterface){
        return this.manager.createData(resource, scopeIdentifier, this);
    }

    public getScopeIdentifier(): string{
        return this.scopeIdentifier;
    }

    public getIdentifiers(){
        // todo: implement this
    }

    public getParentScopes(){
        return this.parentScopes;
    }


    public getManager(): Manager {
        return this.manager;
    }

    public gerResource(): ResourceInterface {
        return this.resource;
    }

    public isRequested(checkScopeSegment: string): boolean {
        console.log("nothing yet");
        return;
    }

    public isExcluded(checkScopeSegment: string): boolean{
        // todo: implement this
        return null;
    }

    public pushParentScope(identifierSegment: string): number{
        // todo: implement this
        return null;
    }

    public setParentScopes(parentScopes: Array<string>): this{
        this.parentScopes = parentScopes;
        return this;
    }

    public toArray(): Array<any>{
        // todo: implement this
        return ["test1", "test2"];
    }

    public toJson(): string{
        // todo implement this
        return null;
    }

    public transformPrimitiveResource(): any{
        // todo implement this
        return null;
    }

    protected executeResourceTransformers(): Array<any>{
        // todo implement this
        return [];
    }

    protected serializeResource(serializer: SerializerAbstract, data: any): Array<any>{
        // todo implement this
        return null;
    }

    protected fireTransformer(transformer: TransformerAbstract, data: any): any{
        // todo implement this
        return [];
    }

    protected fireIncludedTransformers(transformer: TransformerAbstract, data: any): Array<any>{
        // todo implement this
        return [];
    }

    protected transformerHasIncludes(transformer: TransformerAbstract): boolean{
        // todo implement this
        return null;
    }

    protected isRootScope(): boolean{
        // todo implement this
        return null;
    }

    protected filterFieldsets(data: Array<any>): Array<any>{
        // todo implement this
        return [];
    }

    protected getFilterFielset(): ParamBag{
        // todo implement this
        return null;
    }

    protected hasFilterFieldset(): boolean{
        // todo implement this
        return null;
    }

    protected getResourceType(): string{
        // todo implement this
        return null;
    }

}