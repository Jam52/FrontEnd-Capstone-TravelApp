//set images in webpack
import Logo from './images/travelApp_logo.png';
const logo = document.getElementById('logo');
logo.setAttribute('src', Logo);
import Question from './images/travelApp_question.png';
const photo = document.querySelector('.trip-photo');
photo.setAttribute('src', Question);
import Arrow from './images/travelApp_arrow.png';
const arrow = document.querySelector('.packing-arrow');
arrow.setAttribute('src', Arrow);

//import style files
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';
import './styles/trip.scss';

// adjust button size to match form input
const finalSize = document.getElementById('destination-input').offsetHeight;
console.log(finalSize);
document.getElementById('new-trip-submit').style.height = finalSize + 'px';
