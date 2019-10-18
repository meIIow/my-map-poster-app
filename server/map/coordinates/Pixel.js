const { zoomToPixelSpace } = require('./conversion');

/** Represents a Pixel coordinate value. */
class Pixel {
  constructor(value, zoom) {
    if (value == null) throw Error;
    if (zoom == null) throw Error;

    this.value = value;
    this.zoom = zoom;
    this.pixelSpace = zoomToPixelSpace(zoom);
  }

  // Creates new Pixel from a normalized web coordinate at given zoom
  static from(coordinate, zoom) {
    return new Pixel(coordinate * zoomToPixelSpace(zoom), zoom);
  }

  // Calculates the distance between Pixel coordinates.
  // Wraps around by default (useful for east-west values).
  distanceTo(pixel, wraparound = true) {
    const difference = this.value - pixel;
    if (difference < 0 && wraparound) return difference + this.pixelSpace;
    return Math.abs(difference) % this.pixelSpace;
  }

  shift(offset) {
    return new Pixel(this.value + offset, this.zoom);
  }

  // Normalizes Pixel value to a web projection coordinate
  get conversion() {
    return this.value / this.pixelSpace;
  }
}

module.exports = Pixel;
