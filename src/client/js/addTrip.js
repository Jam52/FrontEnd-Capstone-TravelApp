//imports
const { dateChecker } = require('./validateDate.js');

//fetch trip template
async function fetchHtmlAsText(url) {
    const htmlFile = await fetch(url);
    const text = await htmlFile.text();
    return await text;
}


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
    const departureDate = document.getElementById('departure-input').value;
    console.log(departureDate);
    const returnDate = document.getElementById('return-input').value;
    console.log(returnDate);
    if(!dateChecker(departureDate) | !dateChecker(returnDate)) {
        alert('invalid dates');
    } else {
        return {
            "departureDate": departureDate,
            "returnDate": returnDate
        }
    }
    

}


export {
    createNewTrip,
    fetchHtmlAsText,
    getTripDatesAndDestination
}