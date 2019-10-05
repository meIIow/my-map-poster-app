const Border = require('./Border');
const Conversion = require('./Conversion');

const MAX_PIXELS = 640; // Highest pixel dimensions that can be returned.

/**
  Generates detailed frame pixel window information within a geodetic range.
*/
class Frame {
  constructor(nw, se, minWidth, minHeight) {
    this.geodeticBorder = Border.fromLatLng(nw, se);
    this.webProjectionBorder = Border.fromBorder(
      this.geodeticBorder,
      Conversion.latitudeToWebProjection,
      Conversion.longitudeToWebProjection);

    // Determine minimum pixel to projection coordinate ratio.
    const minPixelDensity = Math.max(
      minWidth / this.webProjectionBorder.width + Conversion.TOTAL_DEGREES_LONGITUDE,
      minHeight / this.webProjectionBorder.height);

    this.zoom = Conversion.pixelDensityToZoom(minPixelDensity);
    const projectionToPixel = Conversion.createProjectionToPixel(this.zoom);

    this.pixelBorder = Border.fromBorder(
      this.webProjectionBorder,
      projectionToPixel);
  }

  // Logs tile centers (for now)
  // TODO - separate this functionality
  calculateTileCenters() {
    const pixelToProjection = Conversion.createPixelToProjection(this.zoom);

    const tileCountX = Math.ceil((this.pixelBorder.width) / MAX_PIXELS);
    const tileCountY = Math.ceil((this.pixelBorder.height) / MAX_PIXELS);

    for (let x = 0; x < tileCountX; x ++) {
      for (let y = 0; y < tileCountY; y++) {
        let a = this.pixelBorder.west + MAX_PIXELS / 2 + x * MAX_PIXELS;
        let b = this.pixelBorder.north + MAX_PIXELS / 2 + y * MAX_PIXELS;
        console.log(x, y, a, b);
        console.log(Conversion.webProjectionToLatitude(pixelToProjection(b)));
        console.log(Conversion.webProjectionToLongitude(pixelToProjection(a)));
      }
    }
  }
}

module.exports = Frame;
