export class ParamBag{

    protected params: Array<any> = [];

    constructor(params: Array<any>) {
        this.params = params;
    }

    public get(key: string): any{
        return this.__get(key);
    }

    public __get(key: string): any{
        // todo: implement this
    }

    public __isset(key: string): boolean{
        // todo: implement this
        return null;
    }

    public __set(key: string, value: any): void{
        throw new Error("Modifying paramets is not permitted");
    }

    public __unset(key: string){
        throw new Error("Modifying paramets is not permitted");
    }

    public offsetExists(key: string): boolean{
        return this.__isset(key);
    }

    public offsetGet(key: string): any{
        return this.__get(key);
    }

    public offsetSet(key: string, value: any){
        throw new Error("Modifying paramets is not permitted");
    }

    public offsetUnset(key: string): void{
        throw new Error("Modifying paramets is not permitted");
    }

    public getIterator(): void{
        // todo: implement this
    }
}