//imports
const { dateChecker } = require('./validateDate.js');
const { fetchHtmlAsText } = require('./fetchHtmlAsText.js');
const { geonamesSearch } = require('./geonames.js');


// create new trip fragment
async function createNewTrip() {
    const dates = getTripDatesAndDestination();
    // console.log('loading file');
    // const newTrip = document.createDocumentFragment();
    // const newDiv = document.createElement('div');
    // const contentDiv = document.getElementById('trips');
    // newDiv.setAttribute('id', tripName)
    // newDiv.innerHTML = await fetchHtmlAsText('/trip')
    // .then(contentDiv.appendChild(newDiv));
}

//get initial trip dates and destination
async function getTripDatesAndDestination () {
    const result = {};
    const departureDate = document.getElementById('departure-input').value;
    const returnDate = document.getElementById('return-input').value;
    const destination = document.getElementById('destination-input').value;
    const longAndLat = await geonamesSearch(destination);
    console.log(await longAndLat);
    if(!dateChecker(departureDate) | !dateChecker(returnDate) | (longAndLat == null)) {
        alert('invalid input');
    } else {
        result.departureDate = departureDate;
        result.returnDate = returnDate;
        result.destination = {'destination': destination, 'lng': await longAndLat.lng, 'lat': await longAndLat.lat};
        console.log(result);
        return result;
    }
}


export {
    createNewTrip,
    getTripDatesAndDestination
}