export class CommonUtils {

    public static padding(inputArray: string[], paddingLength: number, paddingValue: string): string[] {
        if (inputArray.length < paddingLength) {
            return inputArray.concat(new Array(paddingLength - inputArray.length).fill(paddingValue));
        } else {
            return inputArray;
        }
    }
}
