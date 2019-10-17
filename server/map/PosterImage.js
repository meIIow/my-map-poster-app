const { createCanvas, loadImage } = require('canvas');

class PosterImage {
  constructor(pixelHeight, pixelWidth) {
    this.canvas = createCanvas(pixelWidth, pixelHeight);
    this.context = this.canvas.getContext('2d');
  }

  async overlay(images) {
    const draw = this.context.drawImage;
    (await Promise.all(
      images.map(async (image) => {
        if (image.xOffset === null || image.yOffset === null || !image.url) throw Error;
        return { ...image, img: await loadImage(image.url) };
      })
    )).forEach(image => draw(image.img, image.xOffset, image.yOffset));
  }

get buffer() {
    return this.canvas.toBuffer();
  }
}

module.exports = PosterImage;
