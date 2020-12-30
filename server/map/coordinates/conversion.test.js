const {
  degreesToRadians,
  radiansToDegrees,
  pixelDensityToZoom,
  zoomToPixelSpace,
} = require('./Conversion');

describe('Zoom level ', () => {
  test('is never less than 0', () => {
    expect(pixelDensityToZoom(0)).toBe(0);
    expect(pixelDensityToZoom(1)).toBe(0);
  });

  test('remains the same up to powers of 2 ', () => {
    expect(pixelDensityToZoom(255)).toBe(0);
    expect(pixelDensityToZoom(256)).toBe(0);

    expect(pixelDensityToZoom(511)).toBe(1);
    expect(pixelDensityToZoom(512)).toBe(1);

    expect(pixelDensityToZoom(1023)).toBe(2);
    expect(pixelDensityToZoom(1024)).toBe(2);
  });

  test('increases above powers of 2', () => {
    expect(pixelDensityToZoom(256)).toBe(0);
    expect(pixelDensityToZoom(257)).toBe(1);

    expect(pixelDensityToZoom(512)).toBe(1);
    expect(pixelDensityToZoom(513)).toBe(2);

    expect(pixelDensityToZoom(1024)).toBe(2);
    expect(pixelDensityToZoom(1025)).toBe(3);
  });
});

describe('Pixel space ', () => {
  test('starts off at 256', () => {
    expect(zoomToPixelSpace(0)).toBe(256);
  });

  test('doubles with each zoom level', () => {
    expect(zoomToPixelSpace(1)).toBe(512);
    expect(zoomToPixelSpace(2)).toBe(1024);
  });
});

describe('Conversion is accurate from ', () => {
  test('degrees to radians ', () => {
    expect(degreesToRadians(0)).toBe(0);
    expect(degreesToRadians(180)).toBe(Math.PI);
    expect(degreesToRadians(360)).toBe(2*Math.PI);
  });

  test('radians to degrees', () => {
    expect(radiansToDegrees(0)).toBe(0);
    expect(radiansToDegrees(Math.PI)).toBe(180);
    expect(radiansToDegrees(2 * Math.PI)).toBe(360);
  });
});
