import {SerializerAbstract} from "~/serializer/SerializerAbstract";
import {ScopeFactoryInterface} from "~/ScopeFactoryInterface";

export class Manager{

    protected requestedIncludes: Array<any> = [];
    protected requestedExcludes: Array<any> = [];
    protected requestedFieldsets: Array<any> = [];
    protected includeParams: Array<any> = [];
    protected paramDelimiter: string = "|";
    protected recursionLimit: number = 10;
    protected serializer: SerializerAbstract;

    private scopeFactory: ScopeFactoryInterface;

    public __construct(scopeFactory: ScopeFactoryInterface){
        // this.scopeFactory = scopeFactory ? : new ScopeFactory();
    }

}