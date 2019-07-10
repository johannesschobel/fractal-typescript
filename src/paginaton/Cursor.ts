import {CursorInterface} from "../paginaton/CursorInterface";

export default class Cursor implements CursorInterface{
    protected current: any;
    protected prev: any;
    protected next: any;
    protected count: number;

    constructor(current: any, prev: any, next: any, count: number){
        this.current = current;
        this.prev = prev;
        this.next = next;
        this.count = count;
    }

    public getCurrent(): any{
        return this.current;
    }

    public setCurrent(current: any): Cursor{
        this.current = current;
        return this;
    }

    public getPrev(): any{
        return this.prev;
    }

    public setPrev(prev: any): Cursor{
        this.prev = prev;
        return this;
    }

    public getNext(): any{
        return this.next;
    }

    public setNext(next: any): Cursor{
        this.next = next;
        return this;
    }

    public getCount(): number{
        return this.count;
    }

    public  setCount(count: number){
        this.count = count;
        return this;
    }

}