const Border = require('./Border');
const Conversion = require('./coordinates/Conversion');
const Latitude = require('./coordinates/Latitude');
const Longitude = require('./coordinates/Longitude');
const Pixel = require('./coordinates/Pixel');
const WebMercator = require('./coordinates/WebMercator');
const Tile = require('./../image/Tile');

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
  asTiles() {
    return Tile.generateSet(
      this.pixelBorder.north.value,
      this.pixelBorder.west.value,
      this.pixelBorder.height,
      this.pixelBorder.width,
      this.zoom);
  }
}

module.exports = Frame;
