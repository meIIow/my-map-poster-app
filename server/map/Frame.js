const Border = require('./Border');
const Conversion = require('./coordinates/Conversion');
const Latitude = require('./coordinates/Latitude');
const Longitude = require('./coordinates/Longitude');
const Pixel = require('./coordinates/Pixel');
const WebMercator = require('./coordinates/WebMercator');
const Tile = require('./../image/Tile');

/** Represents an entire frame window within a geodetic range. */
class Frame {
  constructor(nw, se) {
    this.geodeticBorder = Border.fromLatLng(nw, se);
    this.webProjectionBorder = Border.fromBorder(
      this.geodeticBorder,
      WebMercator.from);
  }

  // Generates a new Pixel Border that adheres to a specific height:width ratio
  static stretchBorderToDimensionRatio(pixelBorder, ratio) {
    // Each dimension must be divisible by its ratio in order to match it.
    let width = pixelBorder.width;
    let height = pixelBorder.height;
    width += width % ratio.width;
    height += height % ratio.height;

    // Stretch relatively smaller dimension to fit relatively larger one.
    width = Math.max(width, height * ratio.width / ratio.height);
    height = Math.max(height, width * ratio.height / ratio.width);

    // Create new Border, distributing extra width and height evenly.
    const widthDelta = width - pixelBorder.width;
    const heightDelta = height - pixelBorder.height;
    console.log(width);
    console.log(height);
    console.log('wd: ', widthDelta);
    console.log('hd: ', heightDelta);
    const zoom = pixelBorder.north.zoom;
    return new Border(
      new Pixel(pixelBorder.north.value - Math.floor(heightDelta / 2), zoom),
      new Pixel(pixelBorder.south.value + Math.ceil(heightDelta / 2), zoom),
      new Pixel(pixelBorder.east.value + Math.ceil(widthDelta / 2), zoom),
      new Pixel(pixelBorder.west.value - Math.floor(widthDelta / 2), zoom),
    );
  }

  // Finds the zoom necessary to fit the given pixels into each dimension.
  calculateMinimumZoom(pixelHeight, pixelWidth, lockRatio) {
    // Locking: meet min requirement -> will increase other dimension to match
    // Not locking: make sure density meets max requirement
    const chooseDensity = lockRatio ? Math.min : Math.max;
    // Determine minimum pixel to projection coordinate ratio.
    const minPixelDensity = chooseDensity(
      pixelWidth / this.webProjectionBorder.width,
      pixelHeight / this.webProjectionBorder.height);
    return Conversion.pixelDensityToZoom(minPixelDensity);

  }

  // Generates tile data array from this map frame.
  asTiles(pixelHeight, pixelWidth, lockRatio) {
    const zoom = this.calculateMinimumZoom(pixelHeight, pixelWidth, lockRatio);
    let pixelBorder = Border.fromBorder(
      this.webProjectionBorder,
      (coordinate) => Pixel.from(coordinate, zoom)).round();

    if (lockRatio) {
      const ratio = simplify(pixelHeight, pixelWidth);
      pixelBorder = Frame.stretchBorderToDimensionRatio(pixelBorder, ratio);
    }

    return Tile.generateSet(
      pixelBorder.north.value,
      pixelBorder.west.value,
      pixelBorder.height,
      pixelBorder.width,
      zoom);
  }
}

const simplify = (height, width) => {
  // Euclid's GCD algorithm
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const divisor = gcd(height, width);
  return { height: height / divisor, width: width / divisor };
}

module.exports = Frame;
