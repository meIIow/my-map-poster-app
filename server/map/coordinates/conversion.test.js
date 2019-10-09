const { pixelDensityToZoom } = require('./conversion');

describe('zoom level', () => {
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

  test('increases above powers of 2 ', () => {
    expect(pixelDensityToZoom(256)).toBe(0);
    expect(pixelDensityToZoom(257)).toBe(1);

    expect(pixelDensityToZoom(512)).toBe(1);
    expect(pixelDensityToZoom(513)).toBe(2);

    expect(pixelDensityToZoom(1024)).toBe(2);
    expect(pixelDensityToZoom(1025)).toBe(3);
  });
});
