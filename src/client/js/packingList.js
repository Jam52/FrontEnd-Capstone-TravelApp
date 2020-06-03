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


//event listener for adding packing list items
document.getElementById('trips').addEventListener('click', function(e) {
    if(e.target && e.target.matches('.packing-submit')) {
        e.preventDefault();
        const target = e.target;
        const packingItem = target.previousElementSibling.value;
        const packingListDiv = target.parentNode.nextElementSibling;
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
        console.log('__Removing Item__')
        const tripName = findTripName(target);
        console.log(tripName);
        const packingItem = target.parentNode.previousElementSibling.textContent;
        console.log(packingItem);
        deleteData('/removePackingItem', tripName, packingItem);

        //remove item from dom
        target.parentNode.parentNode.remove();
    }
})


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