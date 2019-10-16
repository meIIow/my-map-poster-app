const Latitude = require('../map/coordinates/Latitude');
const Longitude = require('../map/coordinates/Longitude');
const Pixel = require('../map/coordinates/Pixel');
const Offset = require('./Offset');
const StaticMapHttpRequest = require('../request/StaticMapHttpRequest');

const MAX_PIXELS = 640; // Highest pixel dimensions that can be returned.

/** A single image tile that can be retrieved via the Static Map API. */
class Tile {
  constructor(lat, lng, height, width, verticalOffset, horizontalOffset, zoom) {
    // Center coordinates
    this.latitude = lat;
    this.longitude = lng;
    // Pixel Dimensions
    this.height = height;
    this.width = width;
    // Offset in Pixels
    this.horizontalOffset = horizontalOffset;
    this.verticalOffset = verticalOffset;
    this.zoom = zoom;
  }

  createRequest(key) {
    return new StaticMapHttpRequest (
      this.latitude, this.longitude, this.height, this.width, this.zoom, key
    ).generate();
  }

  // Generates a set of tiles for a given height and width offset.
  static generateTileSet(heightOffset, widthOffset, zoom) {
    const tiles = Array(heightOffset.count).fill(Array(widthOffset.count).fill());
    return tiles.map((arr, row) => arr.map((undef, column) => {
      const vertical = heightOffset.getData(row);
      const horizontal = widthOffset.getData(column);
      return new Tile(
        Latitude.from(new Pixel(vertical.center, zoom).conversion).value,
        Longitude.from(new Pixel(horizontal.center, zoom).conversion).value,
        vertical.length,
        horizontal.length,
        vertical.offset,
        horizontal.offset,
        zoom);
    }));
  }

  // Convenience wrapper to create a tile set that contains the desired section.
  static generateLooseSet(north, west, height, width, zoom) {
    const heightOffset = new Offset(north, height, MAX_PIXELS, 25, false);
    const widthOffset = new Offset(west, width, MAX_PIXELS, 0, false);

    return Tile.generateTileSet(heightOffset, widthOffset, zoom);
  }

  // Deprecated - Keep until testing added
  static generateSet(north, west, height, width, zoom) {
    const horizontalTileCount = Math.ceil(width / MAX_PIXELS);
    const verticalTileCount = Math.ceil(height / MAX_PIXELS);

    console.log(horizontalTileCount);
    console.log(verticalTileCount);

    const tiles = Array(verticalTileCount).fill(Array(horizontalTileCount).fill());
    return tiles.map((arr, row) => arr.map((undef, column) => {
      const centerLatitude = new Pixel(
        north + MAX_PIXELS / 2 + row * MAX_PIXELS, zoom);
      const centerLongitude = new Pixel(
        west + MAX_PIXELS / 2 + column * MAX_PIXELS, zoom);
      return new Tile(
        Latitude.from(centerLatitude.conversion).value,
        Longitude.from(centerLongitude.conversion).value,
        MAX_PIXELS,
        MAX_PIXELS,
        row * MAX_PIXELS,
        column * MAX_PIXELS,
        zoom);
    }));
  }
}

module.exports = Tile;
