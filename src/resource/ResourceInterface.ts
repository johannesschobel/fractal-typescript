export interface ResourceInterface {

    /**
     * Will return the resource key of the corresponding resource.
     * @return string, parameter containing the key.
     */
    getResourceKey(): string;

    /**
     * Will return the data of the corresponding resource.
     * @return any, parameter containing the data.
     */
    getData(): any;

    /**
     * Will return the Transformer of this resource.
     * TODO implement the transformer (interface) und update comment.
     * @return any, parameter containing the transformer.
     */
    getTransformer(): any;

    /**
     * Will set data of this resource.
     * @param data, the data to set.
     */
    setData(data: any): void;

    /**
     * Will set the transformer for this resource.
     * @param transformer, the transformer for this resource.
     */
    setTransformer(transformer: any): void;
}
