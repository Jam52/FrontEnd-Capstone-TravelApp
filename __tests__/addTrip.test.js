const regeneratorRuntime = require("regenerator-runtime");
const { fetchHtmlAsText } = require('../src/client/js/fetchHtmlAsText');
const { getTripDatesAndDestination } = require('../src/client/js/addTrip');
const puppeteer = require('puppeteer');

test('testing fetch html file as text', () => {
    fetchHtmlAsText('/trip').then(
        text => {
            expect(typeof text).toBe('string');
        }
    )
});



