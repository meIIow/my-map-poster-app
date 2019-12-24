const { createCanvas, loadImage } = require('canvas');

const BATCH_SIZE = 8;

class PosterImage {
  constructor(pixelHeight, pixelWidth) {
    this.canvas = createCanvas(pixelWidth, pixelHeight);
    this.context = this.canvas.getContext('2d');
  }

  async overlay(images) {
    const ctx = this.context;
    // TODO: run parallel batches
    // (await Promise.all(
    //   images.map(async (image) => {
    //     if (image.xOffset === null || image.yOffset === null || !image.url) throw Error;
    //     return { ...image, img: await loadImage(image.url) };
    //   })
    // )).forEach(image => ctx.drawImage(image.img, image.xOffset, image.yOffset));
    for (let image of images) {
      const img = await loadImage(image.url);
      ctx.drawImage(img, image.xOffset, image.yOffset)
    }
  }

  async batchOverlay(images) {
    const ctx = this.context;
    for (let i = 0; i < (images.length + BATCH_SIZE - 1) / BATCH_SIZE; i++) {
      (await Promise.all(
        images.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE).map(async (image) => {
          if (image.xOffset === null || image.yOffset === null || !image.url) throw Error;
          return { ...image, img: await loadImage(image.url) };
        })
      )).forEach(image => ctx.drawImage(image.img, image.xOffset, image.yOffset));
    }
  }

  get buffer() {
    return this.canvas.toBuffer();
  }
}

module.exports = PosterImage;
