export interface CursorInterface {
    /**
     * Get the current cursor value.
     *
     * @return mixed
     */
    getCurrent(): any;

    /**
     * Get the prev cursor value.
     *
     * @return mixed
     */
    getPrev(): any;

    /**
     * Get the next cursor value.
     *
     * @return mixed
     */
    getNext(): any;

    /**
     * Returns the total items in the current cursor.
     *
     * @return number
     */
    getCount(): number;
}
