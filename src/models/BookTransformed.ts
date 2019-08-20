export class BookTransformed {
    public author: {
      email: string,
      name: string
    };
    public id: string;
    public links: {
        rel: string,
        uri: string
    };
    public title: string;
    public year: number;
}
