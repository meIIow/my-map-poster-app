const FORMAT_OPTION = {
  Png: 'png8',
  Jpg: 'jpg',
  Gif: 'gif'
}
const ENDPOINT =  'https://maps.googleapis.com/maps/api/staticmap?';

/** Generates formatted requests to the static maps endpoint. */
//TODO: Streamline adding data, allow for more format options
class StaticMapHttpRequest {
  constructor(key, style = 'feature:poi.business|visibility:off') {
    if (key === null) throw Error;
    this.key = key;
    this.style = style;
  }

  generateImageUrl(image) {
    // image must have center coordinates
    if (image.latitude == null || image.longitude == null) throw Error;
    // image must have a zoom level
    if (image.zoom === null) throw Error;
    // image must have pixel height and width
    if (image.height == null || image.width == null) throw Error;

    let request = ENDPOINT;
    request += 'center=' + image.latitude + ',' + image.longitude;
    request += '&zoom=' + image.zoom;
    request += '&size=' + image.height + 'x' + image.width;
    if (this.style) request += '&style=' + this.style;
    request += '&key=' + this.key;
    return request;
  }
}

module.exports = StaticMapHttpRequest;
