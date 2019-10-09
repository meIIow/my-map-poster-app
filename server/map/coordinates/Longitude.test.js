const Longitude = require('./Longitude');

describe('Longitude value', () => {
  describe('is derived correctly from', () => {
    test('most extreme projection values', () => {
      expect(Longitude.from(0).value).toBeCloseTo(-180);
      expect(Longitude.from(1).value).toBeCloseTo(180);
    });
    test('prime meridian projection value', () => {
      expect(Longitude.from(0.5).value).toBe(0);
    });
  });

  describe('converts correctly to', () => {
    test('most extreme projection values', () => {
      expect(new Longitude(180).conversion).toBeCloseTo(1);
      expect(new Longitude(-180).conversion).toBeCloseTo(0);
    });
    test('prime meridian projection value', () => {
      expect(new Longitude(0).conversion).toBeCloseTo(0.5);
    });
  });

  describe('convertion and derivation cancel out for', () => {
    test('extreme projection values', () => {
      expect(Longitude.from(new Longitude(180).conversion).value)
          .toBeCloseTo(180);
      expect(Longitude.from(0).conversion).toBeCloseTo(0);
    });
    test('prime meridian projection value', () => {
      expect(Longitude.from(new Longitude(0).conversion).value)
          .toBeCloseTo(0);
      expect(Longitude.from(0.5).conversion).toBeCloseTo(0.5);
    });
  });
});
