import Cross from '../images/travelApp_cross.png';

//event listener add new entries to packing list
function addPackingListenter() {
    const newPackingButtons = document.querySelectorAll('.packing-submit');
    for(const button of newPackingButtons){
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;
            const packingItem = target.previousElementSibling.value;
            const packingListDiv = target.parentNode.nextElementSibling;
            console.log(packingItem);
            addPackingItem(packingItem, packingListDiv);
        } )
    }
}



function addPackingItem(packingItem, packingListDiv) {
    console.log('__packing__')
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
        anchor.setAttribute('class', 'remove-item');
        const crossImg = document.createElement('img');
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


export {
    addPackingItem,
    addPackingListenter
}