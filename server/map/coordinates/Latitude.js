const { degreesToRadians, radiansToDegrees } = require('./Conversion');

// Defines possible ranges for Latitude value.
const MAX_DEGREES_LATITUDE = 90;
const MIN_DEGREES_LATITUDE = -90;
const DEGREES_LATITUDE_RANGE = MAX_DEGREES_LATITUDE - MIN_DEGREES_LATITUDE;

/** Represents a Latitude coordinate value. */
class Latitude {
  constructor(value) {
    if (value == null) throw Error;
    this.value = value;
  }

  // Creates new Latitude from a normalized web projection coordinate
  static from(coordinate) {
    return new Latitude(toLatitude(coordinate));
  }

  shift(offset) {
    return new Latitude(this.value - offset);
  }

  // Calculates the distance between Latitudes - cannot wrap around poles.
  distanceTo(latitude) {
    return Math.abs(this.value - latitude) % DEGREES_LATITUDE_RANGE;
  }

  // Normalizes Latitude to a web projection coordinate
  get conversion() {
    return fromLatitude(this.value);
  }
}

// Normalizes latitude (number) based on the Web Mercator Projection.
// Returns value between 0 (at 85.051129 degrees) and 1 (at -85.051129 degrees).
const fromLatitude = (latitude) => {
  // Equation is the mathematical definition of lat -> web mercator mapping.
  return (Math.PI - Math.log(
            Math.tan(Math.PI / 4 + degreesToRadians(latitude) / 2))
          ) / (2 * Math.PI);
}

// Converts projection (number) from Web Mercator to geodetic latitude.
// Returns value between -90 (from 1) and 90 (from 0).
const toLatitude = (projection) => {
  // Inverse of the mathematical definition of lat -> web mercator mapping
  return radiansToDegrees(2 * (
      Math.atan(
        Math.pow(
          Math.E, Math.PI - (projection * 2 * Math.PI))
        ) - Math.PI /4
     ));
}

module.exports = Latitude;
