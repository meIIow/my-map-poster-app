const Latitude = require('./coordinates/Latitude');
const Longitude = require('./coordinates/Longitude');
const Pixel = require('./coordinates/Pixel');
const WebMercator = require('./coordinates/WebMercator');
const conversion = require('./coordinates/Conversion');


/** Represents the boundaries of a map border, in any coordinate type. */
class Border {
  constructor(north, south, east, west) {
    enforceCoordinate(north, south, east, west);
    if (north.constructor != south.constructor) throw Error;
    if (east.constructor != west.constructor) throw Error;

    this.north = north;
    this.south = south;
    this.east = east;
    this.west = west;
  }

  // Generates a new Border from two bounding lat/lng coordinate maps
  static fromLatLng(nw, se) {
    return new Border(
      new Latitude(nw.lat),
      new Latitude(se.lat),
      new Longitude(se.lng),
      new Longitude(nw.lng));
  }

  // Calculates the border width, wrapping around the antimeridian.
  get width() {
    return this.east.distanceTo(this.west.value, true);
  }

  // Calculates the border height, taking absolute difference.
  get height() {
    return this.north.distanceTo(this.south.value, false);
  }

  // Generates a new Border from this one, given coordinate conversion
  convert(verticalConversion, horizontalConversion) {
    if (verticalConversion == null) throw Error;
    if (horizontalConversion == null) horizontalConversion = verticalConversion;
    return new Border(
      verticalConversion(this.north.conversion),
      verticalConversion(this.south.conversion),
      horizontalConversion(this.east.conversion),
      horizontalConversion(this.west.conversion));
  }

  // Generates a new Border that adheres to a specific height:width ratio.
  // Will optionally ensure dimensions are integers (silly for WebMercator).
  // (Less relevant for Latitude boundaries, since they are not regular).
  stretchToMatch(ratio, integer = true) {
    let width = this.width;
    let height = this.height;
    let round = (x) => x;

    // To get integers, each dimension must at least be divisible by its ratio.
    if (integer) {
      round = Math.ceil;
      width += (ratio.width - width % ratio.width) % ratio.width;
      height += (ratio.height - height % ratio.height) % ratio.height;
    }

    // Stretch relatively smaller dimension to fit relatively larger one.
    width = Math.max(width, height * ratio.width / ratio.height);
    height = Math.max(height, width * ratio.height / ratio.width);

    // Create new Border, distributing extra width and height evenly.
    const widthDelta = width - this.width;
    const heightDelta = height - this.height;

    return this.shift(
      round(heightDelta / 2 * -1),
      round(heightDelta / 2),
      round(widthDelta / 2),
      round(widthDelta / 2 * -1)
    );
  }

  // Finds the zoom necessary to fit some number of pixels into each dimension.
  calculateMinimumZoom(pixelHeight, pixelWidth, lockRatio) {
    const normalizedBorder = this.convert(WebMercator.from);

    // Locking: meet min requirement -> will increase other dimension to match
    // Not locking: make sure density meets max requirement
    const chooseDensity = lockRatio ? Math.min : Math.max;

    // Determine minimum pixel to projection coordinate ratio.
    const minPixelDensity = chooseDensity(
      pixelWidth / normalizedBorder.width,
      pixelHeight / normalizedBorder.height);
    return conversion.pixelDensityToZoom(minPixelDensity);
  }

  // Generates a new border with all dimensions translated by the given deltas.
  shift(northDelta, southDelta, eastDelta, westDelta) {
    return new Border(
      this.north.shift(northDelta),
      this.south.shift(southDelta),
      this.east.shift(eastDelta),
      this.west.shift(westDelta)
    );
  }

  // Generates a new border with all dimensions rounded to the nearest integer.
  round() {
    const clone = this.shift(0, 0, 0, 0);
    clone.north.value = Math.round(this.north.value);
    clone.south.value = Math.round(this.south.value);
    clone.east.value = Math.round(this.east.value);
    clone.west.value = Math.round(this.west.value);
    return clone;
  }

  // Generates new border of Pixel coordinates that contain current border
  // coordinates and is at least pixelHeight tall and pixelWidth wide,
  // with the option to lock this aspect ratio exactly.
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

  // Generates new border of Pixel coordinates that contain current border
  // coordinates and is at least pixelHeight tall, pixelWidth wide, and fits the
  // given height/width ratio
  fitToRatio(pixelHeight, pixelWidth, ratio) {
    const zoom = this.calculateMinimumZoom(pixelHeight, pixelWidth, lockRatio);
    const pixelBorder =
      this.convert(coordinate => Pixel.from(coordinate, zoom)).round();
    return pixelBorder.stretchToMatch(ratio);
  }
}

// Asserts that all parameters adhere to the coordinate 'interface'.
const enforceCoordinate = (...coordinates) => {
  coordinates.forEach((coordinate) => {
    if (coordinate == null) throw Error;
    if (coordinate.shift == null) throw Error;
    if (coordinate.distanceTo == null) throw Error;
    if (coordinate.conversion == null) throw Error;
  })
}

// Simplifies a height:width ratio to the simplest integers.
const simplify = (height, width) => {
  // Euclid's GCD algorithm
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const divisor = gcd(height, width);
  return { height: height / divisor, width: width / divisor };
}

module.exports = Border;
