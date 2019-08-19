import Cursor from '../../src/paginaton/Cursor';

describe('Cursor Tests', () => {

    test('test Cursor', () => {
        const cursor = new Cursor(100, 90, 110, 10);

        expect(cursor.getCurrent()).toEqual(100);
        expect(cursor.getPrev()).toEqual(90);
        expect(cursor.getNext()).toEqual(110);
        expect(cursor.getCount()).toEqual(10);

        cursor.setCurrent(110);
        cursor.setPrev(106);
        cursor.setNext(114);
        cursor.setCount(4);

        expect(cursor.getCurrent()).toEqual(110);
        expect(cursor.getPrev()).toEqual(106);
        expect(cursor.getNext()).toEqual(114);
        expect(cursor.getCount()).toEqual(4);
    });

});
