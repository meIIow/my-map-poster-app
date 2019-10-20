const route = '';
const urlCreator = window.URL || window.webkitURL;
//document.getElementById('mypic').src = urlCreator.createObjectURL(data);

const url = '/photo';

const testLatLng = {
  northWestLatLng: {lat: 37.4317565, lng: -122.1678751},
  southEastLatLng: {lat: 37.2805374, lng: -121.9905719},
}

const hannaTokyo = {
  northWestLatLng: {lat: 35.747398, lng: 139.5275113},
  southEastLatLng: {lat:35.588414, lng:  139.894867},
}

const southPas = {
  northWestLatLng: {lat: 34.1514208, lng:-118.1764449},
  southEastLatLng: {lat:34.0960171, lng: -118.1158297},
}
//34.1514208,-118.1158297
//34.0960171,-118.1764449,
// 35.747398,139.5275113
// 35.588414, 139.894867

fetch(url, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(southPas),
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
