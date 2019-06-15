import {Scope} from "~/Scope";
import {ResourceInterface} from "~/resource/ResourceInterface";
import {Collection} from "~/resource/Collection";

export abstract class TransformerAbstract{

    protected availableIncludes: Array<any> = [];
    protected defaultIncludes: Array<any> = [];
    protected currentScope: Scope;


    public getAvailableIncludes(): Array<any>{
        return this.availableIncludes;
    }

    public getDefaultIncludes(): Array<any>{
        return this.availableIncludes;
    }

    public getCurrentScope(){
        return this.currentScope;
    }

    public figureOutWhichIncludes(scope: Scope): Array<any>{
        // todo: implement this
        return null;
    }

    public processIncludedResources(scope: Scope, data: any): Array<any>{
        // todo: implement this
        return null;
    }

    private includeResourcesIfAvailable(scope: Scope, data: any,  includedData: Array<any>, include: string): Array<any>{
        // todo: implement this
        return null;
    }

    protected callIncludedMethod(scope: Scope, includedName: string, data: any): ResourceInterface{
        // todo: implement this
        return null;
    }

    public setAvailableIncludes(availableIncludes: Array<any>): this{
        this.availableIncludes = availableIncludes;
        return this;
    }

    public setDefaultIncludes(defaultIncludes: Array<any>): this{
        this.defaultIncludes = defaultIncludes;
        return this;
    }

    public setCurrentScope(currentScope: Scope): this{
        this.currentScope = currentScope;
        return this;
    }

    protected primitive(data: any, transformer: any, resourceKey: string): any{
        // todo: implement this
    }

    protected collection(data: any, transformer: TransformerAbstract, resourceKey: string): Collection{
        // todo: implement this
    }

}