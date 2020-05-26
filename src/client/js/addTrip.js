//imports


//fetch trip template
async function fetchHtmlAsText(url) {
    const htmlFile = await fetch(url);
    const text = await htmlFile.text();
    return await text;
}


async function newTrip(tripName) {
    console.log('loading file');
    const newTrip = document.createDocumentFragment();
    const newDiv = document.createElement('div');
    const contentDiv = document.getElementById('trips');
    newDiv.setAttribute('id', tripName)
    newDiv.innerHTML = await fetchHtmlAsText('/trip')
    .then(contentDiv.appendChild(newDiv));
}



export {
    newTrip,
    fetchHtmlAsText
}