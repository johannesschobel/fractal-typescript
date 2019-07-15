import {ResourceInterface} from '../resource/ResourceInterface';
import {TransformerAbstract} from '../TransformerAbstract';

export class ResourceAbstract implements ResourceInterface {

    protected resourceKey: string;
    protected transformer: CallableFunction | TransformerAbstract | null;
    protected data: any;
    private meta: any[];

    constructor(data: any = null, transformerFunc: (n: any) => any = null,
                transformerClass: TransformerAbstract = null, resourceKey: string = null) {
        this.data = data;
        if (transformerFunc !== null) {
            this.transformer = transformerFunc;
        } else if (transformerClass !== null) {
            this.transformer = transformerClass;
        }
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
