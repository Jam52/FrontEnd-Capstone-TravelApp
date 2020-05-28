async function geonamesSearch(location) {
    const buildUrl = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=Jam52`;
    const data = {};
    try {
        const response = await fetch(buildUrl); 
        const responseJson = await response.json();
        console.log(responseJson.geonames[0]);
        data.lng = await responseJson.geonames[0].lng;
        data.lat = await responseJson.geonames[0].lat;
        return data;
    } catch(error) {
        console.log(error);
    }
    return null;
}

export {
    geonamesSearch
}