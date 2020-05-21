//set logo in webpack
import Logo from './images/travelApp_logo.png';
const logo = document.getElementById('logo');
logo.setAttribute('src', Logo);

//import style files
import './styles/resets.scss';
import './styles/base.scss';
import './styles/header.scss';
import './styles/form.scss';

// adjust button size to match form input
const finalSize = document.getElementById('destination-input').offsetHeight;
console.log(finalSize);
document.getElementById('new-trip-submit').style.height = finalSize + 'px';
