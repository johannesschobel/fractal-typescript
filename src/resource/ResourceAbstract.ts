import {ResourceInterface} from '../resource/ResourceInterface';
import {TransformerAbstract} from '../TransformerAbstract';

export class ResourceAbstract implements ResourceInterface {

    protected resourceKey: string;
    protected transformer: CallableFunction | TransformerAbstract | null;
    protected data: any;
    private meta: any[];

    constructor(data: any = null, transformer: (n: any) => any = null, resourceKey: string = null) {
        this.data = data;
        this.transformer = transformer;
        this.resourceKey = resourceKey;
    }

    public getData(): any[] {
        return this.data;
    }

    public getResourceKey(): string {
        return this.resourceKey;
    }

    public getTransformer(): any {
        return this.transformer;
    }

    public setData(data: any): void {
        this.data = data;
    }

    public setTransformer(transformer: any): void {
        this.transformer = transformer;
    }

    public getMeta(): any[] {
        return this.meta;
    }

    public setMeta(meta: any[]): void {
        this.meta = meta
    }

    public getMetaValue(metaKey: string): string {
        // todo implement this
        return null;
    }

    public setMetaValue(metaKey: string, metaValue: string): void {
        // todo implement this
    }
}
