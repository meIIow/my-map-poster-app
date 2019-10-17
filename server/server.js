const fs = require('fs');
const express = require("express");
const app = express();
const path = require("path");
const fetch = require('node-fetch');
const Border = require('./map/Border');
const PosterImage = require('./map/PosterImage');
const StaticMapHttpRequest = require('./request/StaticMapHttpRequest');
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

const getMapPosterTest = async (req, res, next) => {
  const border = Border.fromLatLng(
    {lat: 37.4317565, lng: -122.1678751},
    {lat: 37.2805374, lng: -121.9905719},
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
app.get('/test', getMapPosterTest);
app.get('/photo', getMapPosterTest);
