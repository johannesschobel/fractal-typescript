import {Manager} from '../src/Manager';

class PrivateManagerExtendsClass extends Manager {
    public testableTrimToAcceptRecursionLevel(includeName: string): string {
        return super.trimToAcceptRecursionLevel(includeName);
    }
}

test('test trimToAcceptRecusionLevel below recursionlimit', () => {
    const underTest = new PrivateManagerExtendsClass();
    const includePath = '.one.two.three.four';
    const  includePathAfterOperation = underTest.testableTrimToAcceptRecursionLevel(includePath);
    expect(includePathAfterOperation).toEqual(includePath);
});

test('test trimToAcceptRecusionLevel above recursionlimit', () => {
    const underTest = new PrivateManagerExtendsClass();
    const includePath = '.one.two.three.four.five.six.seven.eight.nine';
    const trimmed = '.ten.eleven';
    const  includePathAfterOperation = underTest.testableTrimToAcceptRecursionLevel(includePath + trimmed);
    expect(includePathAfterOperation).toEqual(includePath);
});
