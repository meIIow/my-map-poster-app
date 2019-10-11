/** Convenience container file for general conversion methods. */

const PIXEL_MULTIPLIER = 256; // pixel range at zoom = 0

// Converts from degrees (number) to radians (number).
const degreesToRadians = (degrees) => degrees * Math.PI / 180;

// Converts from radians (number) to degrees (number).
const radiansToDegrees = (radians) => radians * 180 / Math.PI;

// Calculates the minimim zoom required to reach the minPixelDensity (number).
const pixelDensityToZoom = (minPixelDensity) => {
  return Math.max(0, Math.ceil(Math.log2(minPixelDensity / PIXEL_MULTIPLIER)));
}

// Calculates pixel space range at a given zoom.
// zoom (number)- as zoom increases, pixel density doubles, [0-20]
const zoomToPixelSpace = (zoom) => {
  return Math.pow(2, zoom) * PIXEL_MULTIPLIER;
}

module.exports = {
  degreesToRadians,
  radiansToDegrees,
  pixelDensityToZoom,
  zoomToPixelSpace,
}
