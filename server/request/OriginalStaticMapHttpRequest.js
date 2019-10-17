const FORMAT_OPTION = {
  Png: 'png8',
  Jpg: 'jpg',
  Gif: 'gif'
}

/** Stores and generates formatted requests to the static maps endpoint. */
//TODO: Streamline adding data, allow for more format options
class OriginalStaticMapHttpRequest {
  constructor(lat, lng, height, width, zoom, key) {
    this.endpoint = 'https://maps.googleapis.com/maps/api/staticmap?';
    this.latitude = lat;
    this.longitude = lng;
    this.height = height;
    this.width = width;
    this.zoom = zoom;
    this.key = key;
  }

  generate() {
    if (this.latitude == null || this.longitude == null) throw Error;
    if (this.key == null) throw Error;
    let params = '';
    params += 'center=' + this.latitude + ',' + this.longitude;
    params += '&zoom=' + this.zoom;
    params += '&size=' + this.height + 'x' + this.width;
    params += '&style=feature:poi.business|visibility:off'
    params += '&key=' + this.key;
    return this.endpoint + params;
  }
}

module.exports = OriginalStaticMapHttpRequest;
