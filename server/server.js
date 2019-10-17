const fs = require('fs');
var express = require("express");
const app = express();
var path = require("path");
const fetch = require('node-fetch');
const Border = require('./map/Border');
const { stitchTiles } = require('./image/combine');
const PosterImage = require('./map/PosterImage');
const StaticMapHttpRequest = require('./request/StaticMapHttpRequest');
const OriginalStaticMapHttpRequest = require('./request/OriginalStaticMapHttpRequest');
const Tile = require('./map/Tile.js')

// shhhh!!
const apiKey = fs.readFileSync('./hidden/key.txt', 'utf8').split("\n").shift();
console.log('key is ' + apiKey);

var server = require("http").createServer(app);
var port = process.env.PORT || 9000;

server.listen(port, function() {
  console.log("Server listening at port %d", port);
});

app.use(express.static(path.join(__dirname, '../public')));

const StanLat = 37.4317565;
const StanLong = -122.1678751;

const CamLat = 37.2805374;
const CamLong = -121.9905719;

const getFullMapTest = async (req, res, next) => {
  const testTiles = Border.fromLatLng(
    {lat: StanLat, lng: StanLong},
    {lat: CamLat, lng: CamLong},
  ).asTiles(1280, 1280, true);

  const imgBuff = await stitchTiles(testTiles, apiKey);
  console.log(imgBuff); // Step 3 - Send stitched images down and render on page

  res.contentType('png');
  res.send(imgBuff);
}

const getMapPoster = async (req, res, next) => {
  const border = Border.fromLatLng(
    {lat: StanLat, lng: StanLong},
    {lat: CamLat, lng: CamLong},
  ).fitToDimensions(1280, 1280, true);

  const request = new StaticMapHttpRequest(apiKey);
  const image = new PosterImage(border.height, border.width);
  await image.overlay(
    Tile.generateBorderSet(border).map(tile => {
      return { ...tile, url: request.generateImageUrl(tile) };
    }));
  console.log(image.buffer);

  res.contentType('png');
  res.send(image.buffer);
}

// Serve photo
app.get('/test', getFullMapTest);
app.get('/photo', getMapPoster);
