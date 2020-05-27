const regeneratorRuntime = require("regenerator-runtime");
const { fetchHtmlAsText } = require('../src/client/js/fetchHtmlAsText');

test('testing fetch html file as text', () => {
    fetchHtmlAsText('/trip').then(
        text => {
            expect(typeof text).toBe('string');
        }
    )
});
