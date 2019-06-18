import {ResourceInterface} from "~/resource/ResourceInterface";
import {TransformerAbstract} from "~/TransformerAbstract";

export class ResourceAbstract implements ResourceInterface{

    protected data: any;
    private meta: Record<string, string>;
    protected resourceKey: string;
    protected transformer: (n: any) => any;


    constructor(data: any = null, transformer:  (n: any) => any = null, resourceKey: string = null){
        this.data = data;
        this.transformer = transformer;
        this.resourceKey = resourceKey;
    }

    getData(): any {
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

    getMeta(): Record<string, string>{
        return this.meta;
    }

    setMeta(meta:Record<string, string>):void{
        this.meta = meta
    }

    getMetaValue(metaKey: string): string{
        return this.meta[metaKey];
    }

    setMetaValue(metaKey:string, metaValue: string):void{
        this.meta[metaKey] = metaValue;
    }
}