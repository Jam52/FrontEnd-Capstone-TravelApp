const { dateChecker } = require('../src/client/js/validateDate.js');

test('checking not past date', () => {
    expect(dateChecker('2019/06/15')).toBeFalsy();

})

test('checking is future date', () => {
    expect(dateChecker('2021/06/15')).toBeTruthy();

})
