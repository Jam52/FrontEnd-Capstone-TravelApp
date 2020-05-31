async function fetchGeonames(location) {
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=Jam52`);
    const responseJson = await response.json();
    console.log(await responseJson)
    return await responseJson;
}

export {
    fetchGeonames
}