const Latitude = require('../map/coordinates/Latitude');
const Longitude = require('../map/coordinates/Longitude');
const Pixel = require('../map/coordinates/Pixel');
const Offset = require('./Offset');

const MAX_PIXELS = 640; // Highest pixel dimensions that can be returned.

/** A single image tile that can be retrieved via the Static Map API. */
class Tile {
  constructor(lat, lng, height, width, yOffset, xOffset, zoom) {
    // Center coordinates
    this.latitude = lat;
    this.longitude = lng;
    // Pixel Dimensions
    this.height = height;
    this.width = width;
    // Offset in Pixels
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.zoom = zoom;
  }

  // Generates a set of tiles for a given height and width offset.
  static generateTileSet(heightOffset, widthOffset, zoom) {
    const tiles =
      Array(heightOffset.count).fill(Array(widthOffset.count).fill());
    return tiles.map((arr, row) => arr.map((_, column) => {
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

  // Generates an array of tiles based on the pixel border area.
  static generateBorderSet(border) {
    return Tile.generateDefaultSet(
      border.north.value,
      border.west.value,
      border.height,
      border.width,
      border.north.zoom).reduce((arr, tile) => [ ...arr, ...tile ], []);
  }

  // Convenience wrapper to create a tile set that contains the desired section.
  static generateDefaultSet(north, west, height, width, zoom) {
    const heightOffset = new Offset(north, height, MAX_PIXELS, 25);
    const widthOffset = new Offset(west, width, MAX_PIXELS, 0);

    return Tile.generateTileSet(heightOffset, widthOffset, zoom);
  }

  // Convenience wrapper to create a center preview tile
  static generatPreviewTile(lat, lng, maxHeight, maxWidth, zoom) {
    return new Tile(lat, lng, Math.min(maxHeight, MAX_PIXELS), Math.min(maxWidth, MAX_PIXELS), 0, 0, zoom);
  }
}

module.exports = Tile;
