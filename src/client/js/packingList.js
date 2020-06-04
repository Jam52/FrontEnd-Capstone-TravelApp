import Cross from '../images/travelApp_cross.png';

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

//delete packcing list item
function deletePackingItem (target) {
    const tripName = findTripName(target);
    console.log(tripName);
    const packingItem = target.parentNode.previousElementSibling.textContent;
    console.log(packingItem);
    //remove item from the server
    deleteData('/removePackingItem', tripName, packingItem);
    //remove item from dom
    target.parentNode.parentNode.remove();
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
    findTripName,
    deletePackingItem
}