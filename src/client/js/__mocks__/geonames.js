async function fetchGeonames(location) {
    console.log('__in mock file__');
    return Promise.resolve({
        'totalResultsCount': 856, 
        'geonames': [{
            'lng': "-79",
            'lat': "43"
        }]})
}

const _fetchGeonames = fetchGeonames;
export { _fetchGeonames as fetchGeonames };