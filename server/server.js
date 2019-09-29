const fs = require('fs');
var express = require("express");
const app = express();
var path = require("path");
const fetch = require('node-fetch');

// shhhh!!
const apiKey = fs.readFileSync('./hidden/key.txt', 'utf8').split("\n").shift();
const secret = fs.readFileSync('./hidden/secret.txt', 'utf8').split("\n").shift();
console.log('key is ' + apiKey);
console.log('secret is ' + secret);


var server = require("http").createServer(app);
var port = process.env.PORT || 9000;

server.listen(port, function() {
  console.log("Server listening at port %d", port);
});

app.use(express.static(path.join(__dirname, '../public')));
const getMapTest = async (req, res, next) => {
  const url = "https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7CSan+Francisco,CA%7COakland,CA%7CSan+Jose,CA&key=" + apiKey;
  console.log(url)
  const x = await fetch(url);
  const img = await x.buffer();

  res.contentType('png');
  res.send(img);
}

// Serve photo
app.get('/test', getMapTest);

const MAX_PIXELS = 640;

const getPics = (left, right, top, bottom, xMin, yMin) => {
  const leftCoords = longitudeToWebProjection(left);
  const rightCoords = longitudeToWebProjection(right);
  const topCoords = latitudeToWebProjection(top);
  const bottomCoords = latitudeToWebProjection(bottom);

  console.log(leftCoords);
  console.log(rightCoords);
  console.log(topCoords);
  console.log(bottomCoords);

  const xCoords = rightCoords - leftCoords;
  const yCoords = bottomCoords - topCoords;

  const minPixelMultiplier = Math.max(xMin / xCoords, yMin / yCoords);

  console.log(minPixelMultiplier);

  const zoom = calculateZoom(minPixelMultiplier);
  console.log(zoom);

  const leftPix = projectionToPixel(leftCoords, zoom, 1);
  const rightPix = projectionToPixel(rightCoords, zoom, 1);
  const topPix = projectionToPixel(topCoords, zoom, 1);
  const bottomPix = projectionToPixel(bottomCoords, zoom, 1);

  console.log(leftPix);
  console.log(rightPix);
  console.log(topPix);
  console.log(bottomPix);

  const xTiles = Math.ceil((rightPix - leftPix) / MAX_PIXELS);
  const yTiles = Math.ceil((bottomPix - topPix) / MAX_PIXELS);
  for (let x = 0; x < xTiles; x ++) {
    for (let y = 0; y < yTiles; y++) {
      let a = leftPix + MAX_PIXELS / 2 + x * MAX_PIXELS;
      let b = topPix + MAX_PIXELS / 2 + y * MAX_PIXELS;
      console.log(x, y, a, b);
      console.log(webProjectionToLatitude(pixelToProjection(b, zoom)));
      console.log(webProjectionToLongitude(pixelToProjection(a, zoom)));
    }
  }
}

const TOTAL_LONGITUDE = 360;
const TOTAL_LATITUDE = 180;


const degreesToRadians = (degrees) => degrees * Math.PI / 180;
const radiansToDegrees = (radians) => radians * 180 / Math.PI;

// Normalizes latitude based on the Web Mercator Projection
// Value between 0 (at 85.051129 degrees) and 1 (at -85.051129 degrees)
const latitudeToWebProjection = (latitude) => {
  return (Math.PI - Math.log(Math.tan(Math.PI / 4 + degreesToRadians(latitude) / 2))) / (2 * Math.PI);
}

// Normalizes longitude between 0 and 1, with zero at the antimeridian
const longitudeToWebProjection = (longitude) => {
  return (longitude + 180) / 360;
}

// Normalizes latitude based on the Web Mercator Projection
// Value between 0 (at 85.051129 degrees) and 1 (at -85.051129 degrees)
const webProjectionToLatitude = (projection) => {
  return  radiansToDegrees(2 * (Math.atan(Math.pow(Math.E, Math.PI - (projection * 2 * Math.PI))) - Math.PI /4));
  //return (Math.PI - Math.log(Math.tan(Math.PI / 4 + rad / 2))) / (2 * Math.PI);
}

// Normalizes longitude between 0 and 1, with zero at the antimeridian
const webProjectionToLongitude = (projection) => {
  return projection * 360 - 180;
}

const projectionToPixel = (projection, zoom, multiplier) => {
  return projection * Math.pow(2, zoom) * 256 * multiplier;
}

const pixelToProjection = (pixel, zoom) => {
  return pixel / (Math.pow(2, zoom) * 256);
}

const calculateZoom = (minPixelMultiplier) => {
  return Math.max(0, Math.ceil(Math.log2(minPixelMultiplier / 256)));
}

// const a = latitudeToWebProjection(37.4317565);
// const b = webProjectionToLatitude(a);
//
// const c = longitudeToWebProjection(45);
// const d = webProjectionToLongitude(c);
//
// console.log(a);
// console.log(b);
//
// console.log(c);
// console.log(d);

const a = projectionToPixel(.6, 14, 1);
console.log(a);
console.log(pixelToProjection(a, 14));

const StanLat = 37.4317565;
const StanLong = -122.1678751;

const CamLat = 37.2805374;
const CamLong = -121.9905719;

getPics(StanLong, CamLong, StanLat, CamLat, 1500, 1500);



// Serve initial web page
//app.get('/', (req, res) => { res.sendFile('./public/index.html'); });

//app.get('/test',  (req, res) => { res.sendFile('./public/index.html'); });
