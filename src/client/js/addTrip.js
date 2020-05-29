//imports
const { dateChecker } = require('./validateDate.js');
const { fetchHtmlAsText } = require('./fetchHtmlAsText.js');
const { geonamesSearch } = require('./geonames.js');
const { getWeatherBit } = require('./weatherbit.js');

// create new trip fragment
async function createNewTrip() {
    const userInput = await getTripDatesAndDestination();
    console.log(await userInput);
    const weather = getWeatherBit(await userInput.lng, await userInput.lat, await userInput.departureDate, await userInput.returnDate)
    console.log(await weather);
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
    if(!dateChecker(departureDate)) {
        alert('Invalid Departur Date');
    } else if(!dateChecker(returnDate)) {
        alert('Invalid Return Date!')
    } else if(longAndLat == null) {
        alert('Invalid Desination!')
    } else {
        result.departureDate = departureDate;
        result.returnDate = returnDate;
        result.destination = destination;
        result.lng = longAndLat.lng;
        result.lat = longAndLat.lat;
        console.log(result);
        return result;
    }
}

//Put 

export {
    createNewTrip,
    getTripDatesAndDestination
}