const Latitude = require('./coordinates/Latitude');
const Longitude = require('./coordinates/Longitude');
const Pixel = require('./coordinates/Pixel');
const WebMercator = require('./coordinates/WebMercator');

/** Represents the boundaries of a map border. */
class Border {
  constructor(north, south, east, west) {
    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
  }

  // Generates a new Border from an existing one, given coordinate conversion
  static fromBorder(border, verticalConversion, horizontalConversion) {
    if (horizontalConversion == null) horizontalConversion = verticalConversion;
    return new Border(
      verticalConversion(border.north.conversion),
      verticalConversion(border.south.conversion),
      horizontalConversion(border.east.conversion),
      horizontalConversion(border.west.conversion));
  }

  // Generates a new Border two bounding lat/lng coordinate maps
  static fromLatLng(nw, se) {
    return new Border(
      new Latitude(nw.lat),
      new Latitude(se.lat),
      new Longitude(se.lng),
      new Longitude(nw.lng));
  }

  // Calculates the border width
  get width() {
    return this.east.distanceTo(this.west.value, true);
  }

  // Calculates the border height
  get height() {
    return this.north.distanceTo(this.south.value, false);
  }
}

module.exports = Border;
