const Border = require('./Border');
const Latitude = require('./coordinates/Latitude');
const Longitude = require('./coordinates/Longitude');
const Pixel = require('./coordinates/Pixel');
const WebMercator = require('./coordinates/WebMercator');

const createHorizontalCoordinate = (normalCoordinate) => {
  return {
    web: WebMercator.from(normalCoordinate),
    lng: Longitude.from(normalCoordinate),
    pix: Pixel.from(normalCoordinate, 8)
  }
}
const createVerticalCoordinate = (normalCoordinate) => {
  return {
    web: WebMercator.from(normalCoordinate),
    lat: Latitude.from(normalCoordinate),
    pix: Pixel.from(normalCoordinate, 8)
  }
}

const top = createVerticalCoordinate(0);
const upper = createVerticalCoordinate(0.25);
const middleY = createVerticalCoordinate(0.5);
const lower = createVerticalCoordinate(0.75);
const bottom = createVerticalCoordinate(1);

const left = createHorizontalCoordinate(0);
const leftish = createHorizontalCoordinate(0.25);
const middleX = createHorizontalCoordinate(0.5);
const rightish = createHorizontalCoordinate(0.75);
const right = createHorizontalCoordinate(1);

describe('Border ', () => {
  describe('construction fails if ', () => {
    test('any boundary is null', () => {
      expect(() => new Border(null, null, null, null)).toThrow();
      expect(() => new Border(top.web, top.web, top.web, null)).toThrow();
    });
    test('any boundary is not a coordinate', () => {
      expect(() => new Border("hawaii", "equator", "NY", "tokyo")).toThrow();
      expect(() => new Border(top.web, top.web, top.web, "tokyo")).toThrow();
    });
    test('any boundary pair does not match', () => {
      expect(() => new Border(top.lat, top.lat, top.lat, top.lng)).toThrow();
      expect(() => new Border(top.lat, top.lng, top.lng, top.lng)).toThrow();
    });
    test('from a LatLng pair that is missing boundaries', () => {
      expect(() => Border.fromLatLng({}, {})).toThrow();
      expect(() => Border.fromLatLng({lat: 45, lng: 45}, {lat: 45})).toThrow();
    });
  });

  describe('construction succeeds if ', () => {
    test('all boundary pairs match', () => {
      expect(new Border(
        upper.lat, lower.lat, rightish.lng, leftish.lng
      )).toBeInstanceOf(Border);
      expect(new Border(
        upper.web, lower.web, rightish.web, leftish.web
      )).toBeInstanceOf(Border);
      expect(new Border(
        upper.pix, lower.pix, rightish.pix, leftish.pix
      )).toBeInstanceOf(Border);
    });
    test('from a well-formed LatLng pair', () => {
      const valid = {lat: 45, lng: 45}
      expect(Border.fromLatLng(valid, valid)).toBeInstanceOf(Border);
    });
  });

  describe('calculates width correctly ', () => {
    test('of any coordinate type', () => {
      expect(new Border(
        upper.lat, lower.lat, rightish.lng, leftish.lng
      ).width).toEqual(180);
      expect(new Border(
        upper.pix, lower.pix, rightish.pix, leftish.pix
      ).width).toEqual(0.5 * 256 * Math.pow(2, 8));
      expect(new Border(
        upper.web, lower.web, rightish.web, leftish.web
      ).width).toEqual(0.5);
    });
    test('even when it wraps around anti-meridian', () => {
      expect(new Border(
        upper.web, lower.web, middleX.web, rightish.web
      ).width).toEqual(0.75);
    });
  });

  describe('calculates height correctly ', () => {
    test('of any coordinate type', () => {
      expect(new Border(
        new Latitude(45), middleY.lat, rightish.lng, leftish.lng
      ).height).toEqual(45);
      expect(new Border(
        upper.pix, lower.pix, rightish.pix, leftish.pix
      ).height).toEqual(0.5 * 256 * Math.pow(2, 8));
      expect(new Border(
        upper.web, lower.web, rightish.web, leftish.web
      ).height).toEqual(0.5);
    });
    test('as positive regardless of which is north and south', () => {
      expect(new Border(
        lower.web, upper.web, rightish.web, leftish.web
      ).height).toEqual(0.5);
    });
  });

  describe('converts correctly from ', () => {
    test('latitude/lng to web mercator coordinates', () => {
      const latLngToWeb = new Border(
        upper.lat, lower.lat, rightish.lng, leftish.lng
      ).convert(WebMercator.from);
      expect(latLngToWeb.north.value).toBeCloseTo(upper.web.value);
      expect(latLngToWeb.south.value).toBeCloseTo(lower.web.value);
      expect(latLngToWeb.east.value).toBeCloseTo(rightish.web.value);
      expect(latLngToWeb.west.value).toBeCloseTo(leftish.web.value);
    });
    test('web mercator to latitude/lng coordinates', () => {
      const webToLatLng = new Border(
        upper.web, lower.web, rightish.web, leftish.web
      ).convert(Latitude.from, Longitude.from);
      expect(webToLatLng.north.value).toBeCloseTo(upper.lat.value);
      expect(webToLatLng.south.value).toBeCloseTo(lower.lat.value);
      expect(webToLatLng.east.value).toBeCloseTo(rightish.lng.value);
      expect(webToLatLng.west.value).toBeCloseTo(leftish.lng.value);
    });
    test('latitude/lng to pixel coordinates', () => {
      const latLngToPix = new Border(
        upper.lat, lower.lat, rightish.lng, leftish.lng
      ).convert((x) => Pixel.from(x, 8));
      expect(latLngToPix.north.value).toBeCloseTo(upper.pix.value);
      expect(latLngToPix.south.value).toBeCloseTo(lower.pix.value);
      expect(latLngToPix.east.value).toBeCloseTo(rightish.pix.value);
      expect(latLngToPix.west.value).toBeCloseTo(leftish.pix.value);
    });
    test('pixel to latitude/lng coordinates', () => {
      const pixToLatLng = new Border(
        upper.pix, lower.pix, rightish.pix, leftish.pix
      ).convert(Latitude.from, Longitude.from);
      expect(pixToLatLng.north.value).toBeCloseTo(upper.lat.value);
      expect(pixToLatLng.south.value).toBeCloseTo(lower.lat.value);
      expect(pixToLatLng.east.value).toBeCloseTo(rightish.lng.value);
      expect(pixToLatLng.west.value).toBeCloseTo(leftish.lng.value);
    });
    test('web mercator to pixel coordinates', () => {
      const webToPix = new Border(
        upper.web, lower.web, rightish.web, leftish.web
      ).convert((x) => Pixel.from(x, 8));
      expect(webToPix.north.value).toBeCloseTo(upper.pix.value);
      expect(webToPix.south.value).toBeCloseTo(lower.pix.value);
      expect(webToPix.east.value).toBeCloseTo(rightish.pix.value);
      expect(webToPix.west.value).toBeCloseTo(leftish.pix.value);
    });
    test('pixel to web mercator coordinates', () => {
      const pixToWeb = new Border(
        upper.pix, lower.pix, rightish.pix, leftish.pix
      ).convert(WebMercator.from);
      expect(pixToWeb.north.value).toBeCloseTo(upper.web.value);
      expect(pixToWeb.south.value).toBeCloseTo(lower.web.value);
      expect(pixToWeb.east.value).toBeCloseTo(rightish.web.value);
      expect(pixToWeb.west.value).toBeCloseTo(leftish.web.value);
    });
  });
  describe('stretches to match ', () => {
    test('pre-matched ratio by staying the same', () => {
      const border = new Border(
        upper.web, lower.web, rightish.web, leftish.web
      );
      const stretched = border.stretchToMatch({width: 1, height: 1}, false);
      expect(stretched.north.value).toEqual(border.north.value);
      expect(stretched.south.value).toEqual(border.south.value);
      expect(stretched.east.value).toEqual(border.east.value);
      expect(stretched.west.value).toEqual(border.west.value);
    });
    test('by increasing only too-small dimension', () => {
      const border = new Border(
        upper.web, lower.web, rightish.web, leftish.web
      );
      const stretched = border.stretchToMatch({width: 2, height: 3}, false);
      expect(stretched.north.value).toEqual(0.125);
      expect(stretched.south.value).toEqual(0.875);
      expect(stretched.east.value).toEqual(border.east.value);
      expect(stretched.west.value).toEqual(border.west.value);
    });
    test('integer by snapping close dimensions up to match', () => {
      // 58 x 38 -> 60 x 40
      const border = new Border(
        new Pixel(21, 0), new Pixel(79, 0), new Pixel(69, 0), new Pixel(31, 0)
      );
      const stretched = border.stretchToMatch({width: 2, height: 3});
      expect(stretched.north.value).toEqual(20);
      expect(stretched.south.value).toEqual(80);
      expect(stretched.east.value).toEqual(70);
      expect(stretched.west.value).toEqual(30);
    });
    test('integer by increasing south/west border more on odd delta', () => {
      // 59 x 39 -> 60 x 40
      const border = new Border(
        new Pixel(20, 0), new Pixel(79, 0), new Pixel(69, 0), new Pixel(30, 0)
      );
      const stretched = border.stretchToMatch({width: 2, height: 3});
      expect(stretched.north.value).toEqual(20);
      expect(stretched.south.value).toEqual(80);
      expect(stretched.east.value).toEqual(70);
      expect(stretched.west.value).toEqual(30);
    });
    test('for complex integer case', () => {
      // 49 x 39 -> 60 x 40
      const border = new Border(
        new Pixel(25, 0), new Pixel(74, 0), new Pixel(69, 0), new Pixel(30, 0)
      );
      const stretched = border.stretchToMatch({width: 2, height: 3});
      expect(stretched.north.value).toEqual(20);
      expect(stretched.south.value).toEqual(80);
      expect(stretched.east.value).toEqual(70);
      expect(stretched.west.value).toEqual(30);
    });
    // WRAPAROUND WILL CURRENTLY FAIL!
    // test('for wraparound case', () => {
    //   // 49 x 39 -> 60 x 40
    //   const border = new Border(
    //     new Pixel(25, 0), new Pixel(74, 0), new Pixel(69, 0), new Pixel(30, 0)
    //   );
    //   const stretched = border.stretchToMatch({width: 2, height: 3});
    //   expect(stretched.north.value).toEqual(20);
    //   expect(stretched.south.value).toEqual(80);
    //   expect(stretched.east.value).toEqual(70);
    //   expect(stretched.west.value).toEqual(30);
    // });
  });
  // describe('converts correctly to', () => {
  //   test('most extreme projection values', () => {
  //     expect(new WebMercator(1).conversion).toBeCloseTo(1);
  //     expect(new WebMercator(0).conversion).toBeCloseTo(0);
  //   });
  //   test('prime meridian projection value', () => {
  //     expect(new WebMercator(0.5).conversion).toBeCloseTo(0.5);
  //   });
  // });
});
