const { createCanvas, loadImage } = require('canvas');

const stitchTiles = async (tileMatrix, key) => {
  const imgData = [];
  let xMax = 0;
  let yMax = 0;
  tileMatrix.forEach(row => row.forEach(tile => {
    xMax = tile.xOffset + tile.width;
    yMax = tile.yOffset + tile.height;
    imgData.push({
      horizontal: tile.xOffset,
      vertical: tile.yOffset,
      url: tile.createRequest(key)
    })
  }));

  const canvas = createCanvas(xMax, yMax);

  (await Promise.all(imgData.map(async (data) => {
    const h = data.horizontal;
    const v = data.vertical;
    const img = await loadImage(data.url);
    return { img, h, v }
  }))).forEach(x => canvas.getContext('2d').drawImage(x.img, x.h, x.v));

  return canvas.toBuffer();
}

module.exports = { stitchTiles };
