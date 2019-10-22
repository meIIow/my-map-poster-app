const fs = require('fs');
const express = require("express");
const app = express();
const path = require("path");
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());

const getMapPoster = async (req, res, next) => {
  console.log(req.body);
  console.log(req.body.northWestLatLng);
  console.log(req.body.southEastLatLng);
  const border = Border.fromLatLng(
    req.body.northWestLatLng,
    req.body.southEastLatLng,
  ).fitToDimensions(600, 600, true); // Small value for experimenting.

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
app.post('/photo', getMapPoster);
