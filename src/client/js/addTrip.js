//imports
const { dateChecker } = require('./validateDate.js');
const { fetchHtmlAsText } = require('./fetchHtmlAsText.js');


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
function getTripDatesAndDestination () {
    const result = {};
    const departureDate = document.getElementById('departure-input').value;
    const returnDate = document.getElementById('return-input').value;
    const destination = document.getElementById('destination-input').value;
    if(!dateChecker(departureDate) | !dateChecker(returnDate) | (destination.length <= 0)) {
        alert('invalid input');
    } else {
        result.departureDate = departureDate;
        result.returnDate = returnDate;
        result.destination = destination;
        console.log(result);
        return result;
    }
}


export {
    createNewTrip,
    fetchHtmlAsText,
    getTripDatesAndDestination
}