export interface PaginatorInterface {
    /**
     * Get the current page.
     *
     * @return number
     */
    getCurrentPage(): number;

    /**
     * Get the last page.
     *
     * @return number
     */
    getLastPage(): number;

    /**
     * Get the total.
     *
     * @return number
     */
    getTotal(): number;

    /**
     * Get the count.
     *
     * @return number
     */
    getCount(): number;

    /**
     * Get the number per page.
     *
     * @return number
     */
    getPerPage(): number;

    /**
     * Get the url for the given page.
     *
     * @param page: number
     *
     * @return string
     */
    getUrl(page: number): string;
}
