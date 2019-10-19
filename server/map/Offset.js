/** Calculates offsets for each element in an overlapping series. */
class Offset {
  constructor(origin, range, length, overlap = 0) {
    if (!Number.isInteger(origin)) throw Error;
    if (!Number.isInteger(range)) throw Error;
    if (!Number.isInteger(length)) throw Error;

    this.origin = origin;
    this.range = range;
    this.visible = length - overlap;
    this.count = Math.ceil(range / this.visible);
    this.length = length;
  }

  getData(num) {
    const offset = this.visible * num;
    const length = this.length;
    const center = this.origin + offset + length / 2;
    return { center, offset, length };
  }
}

module.exports = Offset;
