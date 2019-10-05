/**
  Convenience container for methods that convert between various map
  coordinates or resolution levels.
*/

const TOTAL_DEGREES_LONGITUDE = 360;

// Converts from degrees (number) to radians (number).
const degreesToRadians = (degrees) => degrees * Math.PI / 180;
// Converts from radians (number) to degrees (number).
const radiansToDegrees = (radians) => radians * 180 / Math.PI;

// Normalizes latitude (number) based on the Web Mercator Projection.
// Returns value between 0 (at 85.051129 degrees) and 1 (at -85.051129 degrees).
const latitudeToWebProjection = (latitude) => {
  // Equation is the mathematical definition of lat -> web mercator mapping.
  return (Math.PI - Math.log(
            Math.tan(Math.PI / 4 + degreesToRadians(latitude) / 2))
          ) / (2 * Math.PI);
}

// Normalizes (number) longitude based on the Web Mercator Projection.
// Retuns value between 0 and 1, with zero at the antimeridian.
const longitudeToWebProjection = (longitude) => {
  // Shift to positive range, then normalize
  return (longitude + TOTAL_DEGREES_LONGITUDE / 2) / TOTAL_DEGREES_LONGITUDE;
}

// Converts projection (number) from Web Mercator to geodetic latitude.
// Returns value between -90 (from 1) and 90 (from 0).
const webProjectionToLatitude = (projection) => {
  // Inverse of the mathematical definition of lat -> web mercator mapping
  return  radiansToDegrees(2 * (
      Math.atan(
        Math.pow(
          Math.E, Math.PI - (projection * 2 * Math.PI))
        ) - Math.PI /4
     ));
}

// Converts (number) projection from Web Mercator to geodetic longitude.
// Returns value between -180 (from 0) and 180 (from 1).
const webProjectionToLongitude = (projection) => {
  // Convert to degrees, then shift down 180 degrees.
  return projection * 360 - 180;
}

// Generates a method to locate the pixel from a corresponding projection value.
// zoom (number)- as zoom increases, pixel density doubles, [0-20]
// Output method returns the number of pixels from the web mercator origin.
const createProjectionToPixel = (zoom) => {
  // projection (number) - normalized web mercator coordinate, [0-1]
  return (projection) => projection * Math.pow(2, zoom) * 256;
}

// Generates a method to normalize the pixel location to a projection value.
// zoom (number)- as zoom increases, pixel density doubles, [0-20]
// Output method returns the normalized web mercator coordinates [0,1].
const createPixelToProjection = (zoom) => {
  // pixel (number) - number of pixels from web mercator origin
  return (pixel) => pixel / (Math.pow(2, zoom) * 256);
}

// Calculates the minimim zoom required to reach the minPixelDensity (number).
const pixelDensityToZoom= (minPixelDensity) => {
  // 256 pixels at web projection zoom 0, each zoom level  doubles this.
  return Math.max(0, Math.ceil(Math.log2(minPixelDensity / 256)));
}

module.exports = {
  latitudeToWebProjection,
  longitudeToWebProjection,
  webProjectionToLatitude,
  webProjectionToLongitude,
  createProjectionToPixel,
  createPixelToProjection,
  pixelDensityToZoom,
  TOTAL_DEGREES_LONGITUDE,
}
