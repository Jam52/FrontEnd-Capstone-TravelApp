const { geonamesSearch } = require('../src/client/js/addTrip');
const { checkOverlappingDates } = require('../src/client/js/addTrip');
jest.mock('../src/client/js/fetchGeonames.js');
jest.mock('../src/client/js/serverRequests.js');

test('Test for returning lng and lat only', () => {
    return geonamesSearch('location').then(
        data => {
            expect(data.lng == '-79').toBeTruthy();
        }
    )
})

test('Test for overlapping dates 1', () => {
    return checkOverlappingDates('30/02/2021', '20/03/2021').then( result => {
        expect(result).toBeTruthy();
    })
   
})

test('Test for overlapping dates 2', () => {
    return checkOverlappingDates('20/02/2021', '20/03/2021').then( result => {
        expect(result).toBeTruthy();
    })
   
})


test('Test for not overlapping future dates', () => {
    return checkOverlappingDates('30/04/2021', '20/05/2021').then( result => {
        expect(result).toBeFalsy();
    })
   
})

test('Test for not overlapping past dates', () => {
    return checkOverlappingDates('30/04/2020', '20/05/2020').then( result => {
        expect(result).toBeFalsy();
    })
   
})




