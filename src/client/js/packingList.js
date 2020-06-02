import Cross from '../images/travelApp_cross.png';
const postData = require('./serverRequests');

function addPackingItem(packingItem, packingListDiv) {
    //create new fragment and add item
    if(packingItem.length > 0) {
        //create fragment
        const packingItemFragment = document.createDocumentFragment();
        //create div
        const packingItemDiv = document.createElement('div');
        packingItemDiv.setAttribute('class', 'packing-item');
        //create paragraph and set content
        const p = document.createElement('p');
        p.textContent = packingItem;
        //crate anchor and image and set src
        const anchor = document.createElement('a');
        anchor.setAttribute('href', '#')
        const crossImg = document.createElement('img');
        crossImg.setAttribute('class', 'remove-item');
        crossImg.setAttribute('src', Cross);
        anchor.appendChild(crossImg);
        //append to div then fragment
        packingItemDiv.appendChild(p);
        packingItemDiv.appendChild(anchor);
        packingItemFragment.appendChild(packingItemDiv);

        //append fragment to div
        packingListDiv.appendChild(packingItemFragment);
    }
}

function findTripName(target) {
    for( ; target && target !== document; target = target.parentNode) {
        if(target.matches('.trip')){
            return target.id;
        }
    }
}


export {
    addPackingItem,
    findTripName
}