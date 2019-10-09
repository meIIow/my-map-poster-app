const Pixel = require('./Pixel');

const zoom = 2;

describe('Pixel value', () => {
  describe('is derived correctly from', () => {
    test('most extreme projection values', () => {
      expect(Pixel.from(0, zoom).value).toBeCloseTo(0);
      expect(Pixel.from(1, zoom).value).toBeCloseTo(1024);
    });
    test('prime meridian projection value', () => {
      expect(Pixel.from(0.5, zoom).value).toBe(512);
    });
  });

  describe('converts correctly to', () => {
    test('most extreme projection values', () => {
      expect(new Pixel(1024, zoom).conversion).toBeCloseTo(1);
      expect(new Pixel(0, zoom).conversion).toBeCloseTo(0);
    });
    test('prime meridian projection value', () => {
      expect(new Pixel(512, zoom).conversion).toBeCloseTo(0.5);
    });
  });

  describe('convertion and derivation cancel out for', () => {
    test('extreme projection values', () => {
      expect(Pixel.from(new Pixel(1024, zoom).conversion, zoom).value)
          .toBeCloseTo(1024);
      expect(Pixel.from(0, zoom).conversion).toBeCloseTo(0);
    });
    test('prime meridian projection value', () => {
      expect(Pixel.from(new Pixel(512, zoom).conversion, zoom).value)
          .toBeCloseTo(512);
      expect(Pixel.from(0.5, zoom).conversion).toBeCloseTo(0.5);
    });
  });
});
