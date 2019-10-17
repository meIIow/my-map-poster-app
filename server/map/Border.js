const Latitude = require('./coordinates/Latitude');
const Longitude = require('./coordinates/Longitude');
const Pixel = require('./coordinates/Pixel');
const Tile = require('./../image/Tile');
const WebMercator = require('./coordinates/WebMercator');
const conversion = require('./coordinates/conversion');


/** Represents the boundaries of a map border. */
class Border {
  constructor(north, south, east, west) {
    if (typeof north !== typeof south) throw Error;
    if (typeof north !== typeof east) throw Error;
    if (typeof north !== typeof west) throw Error;

    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
  }

  // Generates a new Border from an existing one, given coordinate conversion
  static fromBorder(border, verticalConversion, horizontalConversion) {
    return border.convert(verticalConversion, horizontalConversion);
  }

  // Generates a new Border from two bounding lat/lng coordinate maps
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

  // Generates a new Border from an existing one, given coordinate conversion
  convert(verticalConversion, horizontalConversion) {
    if (verticalConversion == null) throw Error;
    if (horizontalConversion == null) horizontalConversion = verticalConversion;
    return new Border(
      verticalConversion(this.north.conversion),
      verticalConversion(this.south.conversion),
      horizontalConversion(this.east.conversion),
      horizontalConversion(this.west.conversion));
  }

  // Generates a new Border that adheres to a specific height:width ratio
  // Less relevant for LatLng Borders, since they are not regular
  stretchToMatch(ratio) {
    // Each dimension must be divisible by its ratio in order to match it.
    let width = this.width;
    let height = this.height;
    width += (ratio.width - width % ratio.width) % ratio.width;
    height += (ratio.height - height % ratio.height) % ratio.height;

    // Stretch relatively smaller dimension to fit relatively larger one.
    width = Math.max(width, height * ratio.width / ratio.height);
    height = Math.max(height, width * ratio.height / ratio.width);

    // Create new Border, distributing extra width and height evenly.
    const widthDelta = width - this.width;
    const heightDelta = height - this.height;
    return this.shift(
      Math.floor(heightDelta / 2) * -1,
      Math.ceil(heightDelta / 2),
      Math.ceil(widthDelta / 2),
      Math.floor(widthDelta / 2) * -1
    );
  }

  // Finds the zoom necessary to fit some number of pixels into each dimension.
  calculateMinimumZoom(pixelHeight, pixelWidth, lockRatio) {
    const normalizedBorder = Border.fromBorder(this, WebMercator.from);

    // Locking: meet min requirement -> will increase other dimension to match
    // Not locking: make sure density meets max requirement
    const chooseDensity = lockRatio ? Math.min : Math.max;

    // Determine minimum pixel to projection coordinate ratio.
    const minPixelDensity = chooseDensity(
      pixelWidth / normalizedBorder.width,
      pixelHeight / normalizedBorder.height);
    return conversion.pixelDensityToZoom(minPixelDensity);
  }

  shift(northDelta, southDelta, eastDelta, westDelta) {
    return new Border(
      this.north.shift(northDelta),
      this.south.shift(southDelta),
      this.east.shift(eastDelta),
      this.west.shift(westDelta)
    );
  }

  round() {
    const clone = this.shift(0, 0, 0, 0);
    clone.north.value = Math.round(this.north.value);
    clone.south.value = Math.round(this.south.value);
    clone.east.value = Math.round(this.east.value);
    clone.west.value = Math.round(this.west.value);
    return clone;
  }

  // Generates tile data array from this map Border.
  fitToDimensions(pixelHeight, pixelWidth, lockRatio) {
    const zoom = this.calculateMinimumZoom(pixelHeight, pixelWidth, lockRatio);
    const pixelBorder =
      this.convert(coordinate => Pixel.from(coordinate, zoom)).round();

    if (lockRatio) {
      const ratio = simplify(pixelHeight, pixelWidth);
      return pixelBorder.stretchToMatch(ratio);
    }
    return pixelBorder;
  }

  // Generates tile data array from this map Border.
  asTiles(pixelHeight, pixelWidth, lockRatio) {
    const pixelBorder = this.fitToDimensions(pixelHeight, pixelWidth, lockRatio);
    return Tile.generateLooseSet(
      pixelBorder.north.value,
      pixelBorder.west.value,
      pixelBorder.height,
      pixelBorder.width,
      pixelBorder.north.zoom);
  }
}

const simplify = (height, width) => {
  // Euclid's GCD algorithm
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const divisor = gcd(height, width);
  return { height: height / divisor, width: width / divisor };
}

module.exports = Border;
