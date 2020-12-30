const fs = require('fs');
const express = require("express");
const app = express();
const path = require("path");
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const Border = require('./map/Border');
const Latitude = require('./map/coordinates/Latitude');
const Longitude = require('./map/coordinates/Longitude');
const PosterImage = require('./map/PosterImage');
const StaticMapHttpRequest = require('./request/StaticMapHttpRequest');
const Tile = require('./map/Tile.js')

// Plug in secret API key.
let apiKey = process.env.MAPS_API_KEY;
if (!apiKey) apiKey = fs.readFileSync('./hidden/key.txt', 'utf8').split("\n").shift();
console.log('key is ' + apiKey);

var server = require("http").createServer(app);
var port = process.env.PORT || 9000;

server.listen(port, function() {
  console.log("Server listening at port %d", port);
});


app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

const getMapPoster = async (req, res, next) => {
  console.log("Poster Image Request", req.body);
  const border = Border.fromLatLng(
    req.body.northWestLatLng,
    req.body.southEastLatLng,
  ).fitToDimensions(req.body.height, req.body.width, true);

  const request = new StaticMapHttpRequest(apiKey, req.body.style, req.body.mapType);
  const image = new PosterImage(border.height, border.width);
  await image.batchOverlay(
    Tile.generateBorderSet(border).map(tile => {
      return { ...tile, url: request.generateImageUrl(tile) };
    }));
  //console.log(image.buffer);

  res.contentType('png');
  res.send(image.buffer);
}

const getFrameData = async (req, res, next) => {
  console.log("Poster Info Request", req.body);
  const border = Border.fromLatLng(
    req.body.northWestLatLng,
    req.body.southEastLatLng,
  ).fitToDimensions(req.body.height, req.body.width, true);

  res.json({
    size: Tile.generateBorderSet(border),
    zoom: border.north.zoom,
    height: border.height,
    width: border.width,
    bounds: border.convert(Latitude.from, Longitude.from)
  });
}

const getPreviewTile = async (req, res, next) => {
  console.log("Poster Preview Request", req.body);

  const tile = Tile.generatePreviewTile(req.body.lat, req.body.lng, req.body.height, req.body.width, req.body.zoom);
  const request = new StaticMapHttpRequest(apiKey, req.body.style, req.body.mapType);
  const image = new PosterImage(tile.height, tile.width);
  image.context.fillStyle = 'red';
  image.context.fillRect(0, 0, tile.width,tile.height);

  console.log("Preview Tile", tile);
  await image.batchOverlay(
    [{ ...tile, url: request.generateImageUrl(tile) }]);
  //console.log(image.buffer);

  res.contentType('png');
  res.send(image.buffer);
}

// Serve photo
app.post('/photo', getMapPoster);

// Calculate frame data
app.post('/border', getFrameData);

// Serve preview tile
app.post('/preview', getPreviewTile);
