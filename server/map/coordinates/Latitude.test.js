const Latitude = require('./Latitude');

describe('Latitude value', () => {
  describe('is derived correctly from', () => {
    test('most extreme projection values', () => {
      expect(Latitude.from(0).value).toBeCloseTo(85.0511287798);
      expect(Latitude.from(1).value).toBeCloseTo(-85.0511287798);
    });
    test('equatorial projection value', () => {
      expect(Latitude.from(0.5).value).toBe(0);
    });
    test('arbitrary projection values', () => {
      // Halfway to projection extreme will be more than halfway to cutoff (85)
      expect(Latitude.from(0.25).value).toBeGreaterThan(42.5);
      expect(Latitude.from(0.75).value).toBeLessThan(-42.5);
    });
  });

  describe('converts correctly to', () => {
    test('most extreme projection values', () => {
      expect(new Latitude(85.0511287798).conversion).toBeCloseTo(0);
      expect(new Latitude(-85.0511287798).conversion).toBeCloseTo(1);
    });
    test('equatorial projection value', () => {
      expect(new Latitude(0).conversion).toBeCloseTo(0.5);
    });
    test('arbitrary projection values', () => {
      // Halfway to projection extreme will be more than halfway to cutoff (85)
      expect(new Latitude(42.5).conversion).toBeGreaterThan(0.25);
      expect(new Latitude(-42.5).conversion).toBeLessThan(0.75);
    });
  });

  describe('convertion and derivation cancel out for', () => {
    test('extreme projection values', () => {
      expect(Latitude.from(new Latitude(85.0511287798).conversion).value)
          .toBeCloseTo(85.0511287798);
      expect(Latitude.from(new Latitude(-85.0511287798).conversion).value)
          .toBeCloseTo(-85.0511287798);
      expect(Latitude.from(0).conversion).toBeCloseTo(0);
      expect(Latitude.from(1).conversion).toBeCloseTo(1);
    });
    test('equatorial projection value', () => {
      expect(Latitude.from(new Latitude(0).conversion).value)
          .toBeCloseTo(0);
      expect(Latitude.from(0.5).conversion).toBeCloseTo(0.5);
    });
    test('arbitrary values', () => {
      expect(Latitude.from(new Latitude(45).conversion).value)
          .toBeCloseTo(45);
      expect(Latitude.from(0.75).conversion).toBeCloseTo(0.75);
    });
  });
});
