const route = '';
const urlCreator = window.URL || window.webkitURL;
//document.getElementById('mypic').src = urlCreator.createObjectURL(data);

const url = '/test';

// example url from maps doc - including their api key.
const fullUrl = "https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7CSan+Francisco,CA%7COakland,CA%7CSan+Jose,CA&key=AIzaSyCCJqPA_fCz_LxgVLeK0jG0Ler-joGx0Bw"

//document.getElementById('mypic').src ='/test';

fetch(url, {
  method: 'GET'
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
