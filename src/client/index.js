const regeneratorRuntime = require("regenerator-runtime");

//import js files
const { createNewTrip } = require('./js/addTrip.js');
const { addNewTripToUi } = require('./js/updateUi');
const { getData } = require('./js/serverRequests');

//set images in webpack
import Logo from './images/travelApp_logo.png';
const logo = document.getElementById('logo');
logo.setAttribute('src', Logo);

//import style files
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/trip.scss';

// adjust button size to match form input
const finalSize = document.getElementById('destination-input').offsetHeight;
document.getElementById('new-trip-submit').style.height = finalSize + 'px';


//event listener for new-trip-form
const newTripSubmit = document.getElementById('new-trip-submit');
newTripSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    createNewTrip();
})


//Update ui for any exsiting trips
async function refreshPage() {
    const tripData = await getData('/tripData');
    for(const trip in await tripData) {
    addNewTripToUi(trip);
    }
}
refreshPage();

