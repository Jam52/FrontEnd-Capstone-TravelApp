const regeneratorRuntime = require("regenerator-runtime");
const { dateChecker } = require('../src/client/js/validateDate.js');

test('checking date format', () => {
    expect(dateChecker('05/12/2021')).toBeTruthy();
    expect(dateChecker('05-12-2021')).toBeTruthy();
    expect(dateChecker('05.12.2021')).toBeTruthy();
})

test('checking imposible dates', () => {
    expect(dateChecker('13/22/2020')).toBeFalsy();
    expect(dateChecker('13/12/1820')).toBeFalsy();
    expect(dateChecker('34/12/2020')).toBeFalsy();
})