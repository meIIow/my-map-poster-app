/** SOMETHING SOMETHING. */
class Offset {
  constructor(origin, range, length, overlap = 0, exact = false) {
    this.origin = origin;
    this.visible = Math.floor(length * (1 - overlap));
    this.count = Math.ceil(range / this.visible);
    this.length = exact ? Math.floor(range / this.count) : length;
    this.extra = exact ? range % this.length : 0;
  }

  getData(num) {
    const last = (num == this.count);
    const offset = this.visible * num;
    const length = this.length + last * this.extra;
    const center = this.origin + offset + length / 2;
    return { center, offset, length };
  }
}

module.exports = Offset;
