const Border = require('./Border');
const Conversion = require('./Conversion');

const MAX_PIXELS = 640; // Highest pixel dimensions that can be returned.

/**
 *  Generates detailed frame pixel window information within a geodetic range.
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
      minWidth / this.webProjectionBorder.width,
      minHeight / this.webProjectionBorder.height);

    this.zoom = Conversion.pixelDensityToZoom(minPixelDensity);
    const projectionToPixel = Conversion.createProjectionToPixel(this.zoom);

    this.pixelBorder = Border.fromBorder(
      this.webProjectionBorder,
      projectionToPixel);
  }

  // Generates tile data array from this map frame.
  // TODO: modify logic to fit total tile area to exact frome match
  calculateTileCenters() {
    const pixelToProjection = Conversion.createPixelToProjection(this.zoom);

    const horizontalTileCount = Math.ceil((this.pixelBorder.width) / MAX_PIXELS);
    const verticalTileCount = Math.ceil((this.pixelBorder.height) / MAX_PIXELS);

    const tiles = [];
    for (let row = 0; row < verticalTileCount; row ++) {
      tiles.push([]);
      for (let column = 0; column < horizontalTileCount; column ++) {
        tiles[row].push({
          lat: Conversion.webProjectionToLatitude(pixelToProjection(
            this.pixelBorder.north + MAX_PIXELS / 2 + row * MAX_PIXELS)),
          lng: Conversion.webProjectionToLongitude(pixelToProjection(
            this.pixelBorder.west + MAX_PIXELS / 2 + column * MAX_PIXELS)),
          width: MAX_PIXELS,
          height: MAX_PIXELS,
          zoom: this.zoom,
        });
      }
    }
    return tiles;
  }
}

module.exports = Frame;
