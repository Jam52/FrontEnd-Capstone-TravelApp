const regeneratorRuntime = require("regenerator-runtime");
import { async } from 'regenerator-runtime';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
    });
}

//import js files
const { createNewTrip } = require('./js/addTrip.js');
const { addNewTripToUi } = require('./js/updateUi');
const { getData } = require('./js/serverRequests');
const { postData } = require('./js/serverRequests');
const { addPackingItem } = require('./js/packingList');
const { deletePackingItem } = require('./js/packingList');
const { removeTrip } = require('./js/popupForms');
const { popupFormSubmit } = require('./js/popupForms');
const { showPopupForms } = require('./js/popupForms');


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
import './styles/footer.scss';

// adjust button size to match form input
const finalSize = document.getElementById('destination-input').offsetHeight;
document.getElementById('new-trip-submit').style.height = finalSize + 'px';

//__EVENT LISTENERS__
//event listener for new-trip-form
const newTripSubmit = document.getElementById('new-trip-submit');
newTripSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    createNewTrip();
});

//event listener for adding packing list items
document.getElementById('trips').addEventListener('click', function(e) {
    if(e.target && e.target.matches('.packing-submit')) {
        e.preventDefault();
        const target = e.target;
        const packingItem = target.previousElementSibling.value;
        const packingListDiv = target.parentNode.nextElementSibling;

        //add packing item to the DOM
        addPackingItem(packingItem, packingListDiv);

        //adding item to server data
        const tripName = findTripName(target);
        const itemObj = {"trip": tripName, "item": packingItem};
        postData('/newPackingItem', itemObj);
        
    }
});

//event listener for removing packing list items
document.getElementById('trips').addEventListener('click', function(e) {
    if(e.target && e.target.matches('.remove-item')) {
        e.preventDefault();
        const target = e.target;

        //removing item from server
        deletePackingItem(target);
    }
})

//event listener for deleting trip popup form
document.getElementById('popup-forms').addEventListener('click', (e) => {
    if(e.target && e.target.matches('.form-delete')) {
        e.preventDefault();
        const target = e.target;
        removeTrip(target);
        
    }
})

//event listener for popup form submit buttons
document.getElementById('popup-forms').addEventListener('click', (e) => {
    if(e.target && e.target.matches('.form-submit')) {
        e.preventDefault();
        const target = e.target;
        popupFormSubmit(target);
    }
})

//event listener to show popup forms
document.getElementById('trips').addEventListener('click', (e) => {
    if(e.target && e.target.matches('.new-trip-info')) {
        e.preventDefault();
        const target = e.target;
        showPopupForms(target)
    }
})

//event listener for cancel buttons
document.getElementById('popup-forms').addEventListener('click', (e) => {
    if(e.target && e.target.matches('.form-cancel')) {
        e.preventDefault();
        const target = e.target;
        const popUpForm = document.querySelector('.'+ target.name + "-popup-form");
        popUpForm.classList.add('hidden-form');
    }
})

//__REFRESH PAGE UPDATE UI__
//Update ui for any exsiting trips
async function refreshPage() {
    const tripData = await getData('/tripData');
    for(const trip in await tripData) {
    addNewTripToUi(trip);
    }
}
refreshPage();

