export class FractalTypescript{

    public createData(data: any, transformer: any, option: string){
        if(option === "array"){
            this.createDataArray(data, transformer);
        }
        else if(option === "json"){
            this.createDataJson(data, transformer);
        }
    }

    private createDataArray(data: any, transformer: any){
        console.log("create array");

    }

    private createDataJson(data: any, transformer: any){
        console.log(transformer);
        console.log(data);
    }

}