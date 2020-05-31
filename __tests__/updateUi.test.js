const { calulateTripDaysAway } = require('../src/client/js/updateUi');

test('test for calculate days away from current date ', () => {
    expect(calulateTripDaysAway('31/05/2021')).toBe(365)
})