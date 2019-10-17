const { createCanvas, loadImage } = require('canvas');

class PosterImage {
  constructor(pixelHeight, pixelWidth) {
    this.canvas = createCanvas(pixelWidth, pixelHeight);
    this.context = this.canvas.getContext('2d');
  }

  async overlay(images) {
    (await Promise.all(
      images.map(async (image) => {
        return { ...image, img: await loadImage(image.url) };
      })
    )).forEach(i => this.context.drawImage(i.img, i.xOffset, i.yOffset));
  }

get buffer() {
    return this.canvas.toBuffer();
  }
}

module.exports = PosterImage;
