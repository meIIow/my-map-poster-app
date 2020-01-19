const FORMAT_OPTION = {
  Png: 'png8',
  Jpg: 'jpg',
  Gif: 'gif'
}
const ENDPOINT =  'https://maps.googleapis.com/maps/api/staticmap?';

/** Generates formatted requests to the static maps endpoint. */
class StaticMapHttpRequest {
  constructor(key, style = 'feature:poi.business|visibility:off') {
    if (key == null) throw Error;
    this.key = key;
    this.style = style;
  }

  // Generates a formatted url for the given image data.
  generateImageUrl(image) {
    // image must have center coordinates, zoom level, height & width
    if (image.latitude == null || image.longitude == null) throw Error;
    if (image.zoom == null) throw Error;
    if (image.height == null || image.width == null) throw Error;

    let request = ENDPOINT;
    request += 'center=' + image.latitude + ',' + image.longitude;
    request += '&zoom=' + image.zoom;
    request += '&size=' + image.width + 'x' + image.height;
    if (this.style) request += '&style=' + this.style;
    request += '&key=' + this.key;
    return request;
  }
}

module.exports = StaticMapHttpRequest;
