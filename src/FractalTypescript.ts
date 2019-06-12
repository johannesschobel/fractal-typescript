export class FractalTypescript {

    public static createData(data: any, transformer: any, option: string) {
        if (option === "array") {
            FractalTypescript.createDataArray(data, transformer);
        } else if (option === "json") {
            FractalTypescript.createDataJson(data, transformer);
        }
    }

    private static createDataArray(data: any, transformer: any) {
        console.log("create array");

    }

    private static createDataJson(data: any, transformer: any) {
        console.log(transformer);
        console.log(data);
    }

}