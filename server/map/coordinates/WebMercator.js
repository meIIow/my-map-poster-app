const MAX_WEB_MERCATOR = 1;
const MIN_WEB_MERCATOR = 0;
const WEB_MERCATOR_RANGE = MAX_WEB_MERCATOR - MIN_WEB_MERCATOR;

/** Represents a Web Mercator (normalized) coordinate value. */
class WebMercator {
  constructor(value) {
    if (value == null) throw Error;
    this.value = value;
  }

  // Creates new mercator coordinate from a normalized web coordinate.
  static from(coordinate) {
    return new WebMercator(coordinate);
  }

  shift(offset) {
    return new WebMercator(this.value + offset);
  }

  // Calculates the distance between Web Mercator coordinates
  // Wraps around by default (useful for east-west values)
  distanceTo(mercator, wraparound = true) {
    const difference = this.value - mercator;
    if (difference < 0 && wraparound) return difference + WEB_MERCATOR_RANGE;
    return Math.abs(difference) % WEB_MERCATOR_RANGE;
  }

  // Retrieves the normalized Web Mercator coordinate value.
  get conversion() {
    return this.value;
  }
}

module.exports = WebMercator;
