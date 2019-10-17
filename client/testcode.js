const route = '';
const urlCreator = window.URL || window.webkitURL;
//document.getElementById('mypic').src = urlCreator.createObjectURL(data);

const url = '/photo';

const testLatLng = {
  northWestLatLng: {lat: 37.4317565, lng: -122.1678751},
  southEastLatLng: {lat: 37.2805374, lng: -121.9905719},
}

fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testLatLng),
}).then(response => {
  if (response.status >= 200 && response.status < 300) {
    console.log(response)
    response.blob().then(data => {
      console.log(data);
      document.getElementById('mypic').src = urlCreator.createObjectURL(data);
      return Promise.resolve();
    })
  }
  return Promise.reject(response.statusText);
});
