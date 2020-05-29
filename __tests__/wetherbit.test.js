const regeneratorRuntime = require("regenerator-runtime");
const { getWeatherBit } = require('../src/client/js/weatherbit.js');

test('weatherbit request check for data object', () => {
    getWeatherBit('2.3488', '48.85341', '01/15/2021', '02/05/2021').then(
        data => {
            expect(data.day == 15).toBeTruthy();
            expect(data.day == 16).toBeFalsy();
        }
    )
})

