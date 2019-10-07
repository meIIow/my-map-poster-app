/**
 *  Unit-agnostic class for organizing map border data.
 */
class Border {
  constructor(north, south, east, west) {
    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
  }

  static fromBorder(border, verticalConversion, horizontalConversion) {
    if (horizontalConversion == null) horizontalConversion = verticalConversion;
    return new Border(
      verticalConversion(border.north),
      verticalConversion(border.south),
      horizontalConversion(border.east),
      horizontalConversion(border.west));
  }

  static fromLatLng(nw, se) {
    return new Border(nw.lat, se.lat, se.lng, nw.lng);
  }

  get width() {
    return this.east - this.west;
  }

  get height() {
    return Math.abs(this.north - this.south);
  }
}

module.exports = Border;
