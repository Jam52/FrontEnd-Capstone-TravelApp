const { geonamesSearch } = require('../src/client/js/addTrip');
jest.mock('../src/client/js/fetchGeonames.js');

test('Test for returning lng and lat only', () => {
    return geonamesSearch('location').then(
        data => {
            expect(data.lng == '-79').toBeTruthy();
        }
    )
})





