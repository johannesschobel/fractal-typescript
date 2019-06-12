import {ResourceInterface} from "~/resource/ResourceInterface";

export class ResourceAbstract implements ResourceInterface{

    protected data: any;
    private _meta: Record<string, string>;
    protected resourceKey: string;

    // TODO create transformer class and use it
    protected transformer: any;


    // TODO create transformer class and use it
    constructor(data: any = null, transformer: any = null, resourceKey: string = null){
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
        return this._meta;
    }

    setMeta(meta:Record<string, string>):void{
        this._meta = meta
    }

    getMetaValue(metaKey: string): string{
        return this._meta[metaKey];
    }

    setMetaValue(metaKey:string, metaValue: string):void{
        this._meta[metaKey] = metaValue;
    }
}