const WebMercator = require('./WebMercator');

describe('Web Mercator value', () => {
  describe('is derived correctly from', () => {
    test('most extreme projection values', () => {
      expect(WebMercator.from(0).value).toBeCloseTo(0);
      expect(WebMercator.from(1).value).toBeCloseTo(1);
    });
    test('prime meridian projection value', () => {
      expect(WebMercator.from(0.5).value).toBe(0.5);
    });
  });

  describe('converts correctly to', () => {
    test('most extreme projection values', () => {
      expect(new WebMercator(1).conversion).toBeCloseTo(1);
      expect(new WebMercator(0).conversion).toBeCloseTo(0);
    });
    test('prime meridian projection value', () => {
      expect(new WebMercator(0.5).conversion).toBeCloseTo(0.5);
    });
  });
});
