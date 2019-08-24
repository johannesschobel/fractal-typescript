export class ResourceTransformationResult {
    public transformedData: any[];
    public includedData: any[];

    constructor(transformedData: any[], includedData: any[]) {
        this.transformedData = transformedData;
        this.includedData = includedData;
    }
}
