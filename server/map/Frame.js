const Border = require('./Border');
const Conversion = require('./coordinates/Conversion');
const Latitude = require('./coordinates/Latitude');
const Longitude = require('./coordinates/Longitude');
const Pixel = require('./coordinates/Pixel');
const WebMercator = require('./coordinates/WebMercator');

const MAX_PIXELS = 640; // Highest pixel dimensions that can be returned.

/** Represents an entire frame window within a geodetic range. */
class Frame {
  constructor(nw, se, minWidth, minHeight) {
    this.geodeticBorder = Border.fromLatLng(nw, se);
    this.webProjectionBorder = Border.fromBorder(
      this.geodeticBorder,
      WebMercator.from);

    // Determine minimum pixel to projection coordinate ratio.
    const minPixelDensity = Math.max(
      minWidth / this.webProjectionBorder.width,
      minHeight / this.webProjectionBorder.height);

    this.zoom = Conversion.pixelDensityToZoom(minPixelDensity);

    this.pixelBorder = Border.fromBorder(
      this.webProjectionBorder,
      (coordinate) => Pixel.from(coordinate, this.zoom));

    console.log(this.geodeticBorder);
    console.log(this.webProjectionBorder);
    console.log(this.pixelBorder);
  }

  // Generates tile data array from this map frame.
  // TODO: modify logic to fit total tile area to exact frome match.
  calculateTileCenters() {
    const horizontalTileCount = Math.ceil((this.pixelBorder.width) / MAX_PIXELS);
    const verticalTileCount = Math.ceil((this.pixelBorder.height) / MAX_PIXELS);
    console.log(horizontalTileCount);
    console.log(verticalTileCount);


    const tiles = [];
    for (let row = 0; row < verticalTileCount; row ++) {
      tiles.push([]);
      for (let column = 0; column < horizontalTileCount; column ++) {
        const centerLatitude = new Pixel(
          this.pixelBorder.north.value + MAX_PIXELS / 2 + row * MAX_PIXELS,
          this.zoom);
        const centerLongitude = new Pixel(
          this.pixelBorder.west.value + MAX_PIXELS / 2 + column * MAX_PIXELS,
          this.zoom);
        tiles[row].push({
          lat: Latitude.from(centerLatitude.conversion).value,
          lng: Longitude.from(centerLongitude.conversion).value,
          width: MAX_PIXELS,
          height: MAX_PIXELS,
          zoom: this.zoom,
        });
      }
    }
    return tiles;
  }
}

module.exports = Frame;
