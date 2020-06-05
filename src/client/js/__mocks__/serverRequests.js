//POST request 
const postData = async (url='', data={}) => {
    return {}
}

//GET data request
const getData = async (url='') => {
    return {
        'Toronto25-15-2021': {
            "departureDate": '25/02/2021',
            "returnDate": '15/03/2021',
            "destination": 'Toronto',
            "maxTemp": 10,
            "minTemp": 0,
            "windSpd": 5,
            "precip": 3,
            "imgUrl": 'www.image.com',
            "packingList": []
        }
    }
}

//DELETE request
async function deleteData(url, tripName, item) {
    return {};
  }

  //DELETE trip request
async function deleteTrip(url, tripName,) {
    
    return {};
  }

export {
    getData,
    postData,
    deleteData,
    deleteTrip
}
