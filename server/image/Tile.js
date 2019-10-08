const Latitude = require('../map/coordinates/Latitude');
const Longitude = require('../map/coordinates/Longitude');
const Pixel = require('../map/coordinates/Pixel');

const MAX_PIXELS = 640; // Highest pixel dimensions that can be returned.

/** A single image tile that can be retrieved via the Static Map API. */
class Tile {
  constructor(lat, lng, height, width, verticalOffset, horizontalOffset, zoom, overlap = 0) {
    // Center coordinates
    this.latitude = lat;
    this.longitude = lng;
    // Pixel Dimensions
    this.height = height;
    this.width = width;
    // Offset in Pixels
    this.horizontalOffset = horizontalOffset;
    this.verticalOffset = verticalOffset;
    this.overlap = overlap;
    this.zoom = zoom;
  }

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
