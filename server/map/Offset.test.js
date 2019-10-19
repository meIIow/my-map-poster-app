const Offset = require('./Offset');

describe('Offset ', () => {
  describe('construction fails if ', () => {
    test('origin, range or length aren not integers', () => {
      expect(() => new Offset("1", "2", "3")).toThrow();
      expect(() => new Offset(1, 2, 1.5)).toThrow();
    });
  });
  describe('loose construction valid for ', () => {
    test('all fields when no overlap, perfect fit', () => {
      const offset = new Offset(0, 100, 25);
      expect(offset.origin).toEqual(0);
      expect(offset.range).toEqual(100);
      expect(offset.visible).toEqual(25);
      expect(offset.count).toEqual(4);
      expect(offset.length).toEqual(25);
    });
    test('count when no overlap, oversize fit', () => {
      const offset = new Offset(0, 100, 24);
      expect(offset.count).toEqual(5);
    });
    test('count and visible when overlap, same fit', () => {
      const offset = new Offset(0, 100, 24, 4);
      expect(offset.visible).toEqual(20);
      expect(offset.count).toEqual(5);
    });
    test('count and visible when overlap, new fit', () => {
      const offset = new Offset(0, 100, 25, 5);
      expect(offset.visible).toEqual(20);
      expect(offset.count).toEqual(5);
    });
  });
  describe('calculates correct data for ', () => {
    // visible 30, count 4, length 40
    const offset = new Offset(0, 100, 40, 10, false);
    test('first element', () => {
      const first = offset.getData(0);
      expect(first.center).toEqual(20);
      expect(first.offset).toEqual(0);
      expect(first.length).toEqual(40);
    });
    test('second element', () => {
      const second = offset.getData(1);
      expect(second.center).toEqual(50);
      expect(second.offset).toEqual(30);
      expect(second.length).toEqual(40);
    });
  });
});
