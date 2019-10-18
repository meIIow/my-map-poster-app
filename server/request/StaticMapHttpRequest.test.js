const StaticMapHttpRequest = require('./StaticMapHttpRequest');

const image = {
  latitude: 45.123,
  longitude: -30.456,
  zoom: 11,
  height: 620,
  width: 600
};

const url =
  'https://maps.googleapis.com/maps/api/staticmap?' +
  'center=45.123,-30.456' +
  '&zoom=11' +
  '&size=620x600' +
  '&style=feature:poi.business|visibility:off' +
  '&key=key';

describe('Request ', () => {
  test('must be initialized with a key', () => {
    expect(() => new StaticMapHttpRequest()).toThrow();
  });

  describe('correctly formats ', () => {
    test('valid image data', () => {
      expect(new StaticMapHttpRequest("key").generateImageUrl(image))
        .toMatch(url);
    });
  });
});
