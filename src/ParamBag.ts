export class ParamBag {

    public static unset(key: string) {
        throw new Error('Modifying paramets is not permitted');
    }

    public static set(key: string, value: any): void {
        throw new Error('Modifying paramets is not permitted');
    }

    protected params: {} = {};

    constructor(params: {}) {
        this.params = params;
    }

    public get(key: string): string {
        return this.__get(key);
    }

    public __get(key: string): string {
        // @ts-ignore
        return this.params[key] !== undefined ? this.params[key] : null;
    }

    public isset(key: string): boolean {
        // @ts-ignore
        return this.params[key] !== undefined;
    }
}