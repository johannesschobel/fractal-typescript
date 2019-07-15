import {CommonUtils} from '../src/utils/CommonUtils';

test('test padding with padding', () => {
    expect(CommonUtils.padding(['1', '2', '3'], 5, 'a')).toEqual(['1', '2', '3', 'a', 'a'])
});

test ('test padding without padding', () => {
    expect(CommonUtils.padding(['1', '2', '3'], 3, 'a')).toEqual(['1', '2', '3'])
});

test ('test padding with padding null', () => {
    expect(CommonUtils.padding(['1', '2', '3'], 5, null)).toEqual(['1', '2', '3', null, null])
});
