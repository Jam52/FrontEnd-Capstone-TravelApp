//POST request 
const postData = async (url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),      
      });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}

//GET data request
const getData = async (url='') => {
    const request = await fetch(url);
    try {
        const allData = await request.json()
        return allData;
    } catch(e) {
        console.log("getData error: ", e);
    };
}

//DELETE request
async function deleteData(url, tripName, item) {
    const response = await fetch(url + '/' + tripName + '/' + item, {
        method: 'delete'
    });
    return await response.json();
  }

export {
    getData,
    postData,
    deleteData
}
