// Defines possible ranges for Longitude value.
const MAX_DEGREES_LONGITUDE = 180;
const MIN_DEGREES_LONGITUDE = -180;
const DEGREES_LONGITUDE_RANGE = MAX_DEGREES_LONGITUDE - MIN_DEGREES_LONGITUDE;

/** Represents a Longitude coordinate value. */
class Longitude {
  constructor(value) {
    this.value = value;
  }

  // Creates new Longitude from a normalized web projection coordinate
  static from(coordinate) {
    return new Longitude(toLongitude(coordinate));
  }

  shift(offset) {
    return new Longitude(this.value + offset);
  }

  // Calculates the west (this) -> east (input) distance between Latitudes.
  // Wraps around antimeridian if necessary.
  distanceTo(longitude) {
    return (this.value - longitude + DEGREES_LONGITUDE_RANGE) % DEGREES_LONGITUDE_RANGE;
  }

  // Normalizes Longitude to a web projection coordinate
  get conversion() {
    return fromLongitude(this.value);
  }
}

// Normalizes (number) longitude based on the Web Mercator Projection.
// Retuns value between 0 and 1, with zero at the antimeridian.
const fromLongitude = (longitude) => {
  // Shift to positive range, then normalize
  return (longitude + DEGREES_LONGITUDE_RANGE / 2) / DEGREES_LONGITUDE_RANGE;
}

// Converts (number) projection from Web Mercator to geodetic longitude.
// Returns value between -180 (from 0) and 180 (from 1).
const toLongitude = (projection) => {
  // Convert to degrees, then shift down 180 degrees.
  return projection * 360 - 180;
}

module.exports = Longitude;
