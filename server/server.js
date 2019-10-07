const fs = require('fs');
var express = require("express");
const app = express();
var path = require("path");
const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');
const Frame = require('./map/Frame');
const StaticMapHttpRequest = require('./request/StaticMapHttpRequest');


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

let testtest;

app.use(express.static(path.join(__dirname, '../public')));
const getMapTest = async (req, res, next) => {
  const url = "https://maps.googleapis.com/maps/api/staticmap?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7CSan+Francisco,CA%7COakland,CA%7CSan+Jose,CA&key=" + apiKey;
  console.log(url)
  const x = await fetch(url);
  const img = await x.buffer();
  const img2 = await testtest;
  console.log(img);
  console.log(img2); // Step 3 - Send stitched images down and render on page

  res.contentType('png');
  res.send(img2);
}

// Serve photo
app.get('/test', getMapTest);

const StanLat = 37.4317565;
const StanLong = -122.1678751;

const CamLat = 37.2805374;
const CamLong = -121.9905719;

const testFrame = new Frame(
  {lat: StanLat, lng: StanLong},
  {lat: CamLat, lng: CamLong},
  1500, 1500).calculateTileCenters();

const generateUrl = (elem) => {
  return new StaticMapHttpRequest(
    elem.lat, elem.lng, elem.height, elem.width, elem.zoom, apiKey
  ).generate();
}

testFrame.forEach((row) => row.forEach((elem) => console.log(elem)));
testFrame.forEach((row) => row.forEach((elem) => {
  console.log(generateUrl(elem));
}));


// Step 1 - generate URL and copy into browser to verify that they are valid
console.log('--------');
const urlA = generateUrl(testFrame[0][0]);
const urlB = generateUrl(testFrame[0][1]);
console.log(urlA);
console.log(urlB);

// Step 2 - helper function that takes images and stitches them together
const testImageStitch = async (a, b) => {
  console.log("A: ");
  console.log(a);
  const testCanvas = createCanvas(1280, 640);
  const ctx = testCanvas.getContext('2d');
  const imgA = await loadImage(a);
  const imgB = await loadImage(b);
  console.log("imgA");
  console.log(imgA);
  ctx.drawImage(imgA, 0, 0);
  ctx.drawImage(imgB, 640, 0);
  return await testCanvas.toBuffer();
}

testtest = testImageStitch(urlA, urlB); // might take awhile?
