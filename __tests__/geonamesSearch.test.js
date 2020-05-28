const regeneratorRuntime = require("regenerator-runtime");
const { geonamesSearch } = require('../src/client/js/geonames');

test('testing geonames Api call with real city', () => {
    geonamesSearch('Paris').then(
        data => {
            expect(data.lng).toBe('2.3488');
        }
    )
})

test('testing geonames Api call with fake city', () => {
    geonamesSearch('Parissss').then(
        data => {
            expect(data.lng).toBe(undefined);
        }
    )
})