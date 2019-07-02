import {ResourceInterface} from "~/resource/ResourceInterface";
import {TransformerAbstract} from "~/TransformerAbstract";

export class ResourceAbstract implements ResourceInterface{

    protected data: any;
    private meta: Array<any>;
    protected resourceKey: string;
    protected transformer: CallableFunction | TransformerAbstract | null;


    constructor(data: any = null, transformer:  (n: any) => any = null, resourceKey: string = null){
        this.data = data;
        this.transformer = transformer;
        this.resourceKey = resourceKey;
    }

    getData(): Array<any> {
        return this.data;
    }

    getResourceKey(): string {
        return this.resourceKey;
    }

    getTransformer(): any {
        return this.transformer;
    }

    setData(data: any): void {
        this.data = data;
    }

    setTransformer(transformer: any): void {
        this.transformer = transformer;
    }

    getMeta(): Array<any>{
        return this.meta;
    }

    setMeta(meta:Array<any>):void{
        this.meta = meta
    }

    getMetaValue(metaKey: string): string{
        // todo implement this
        return null;
    }

    setMetaValue(metaKey:string, metaValue: string):void{
        // todo implement this
    }
}