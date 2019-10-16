const { createCanvas, loadImage } = require('canvas');

const stitchTiles = async (tileMatrix, key) => {
  const imgData = [];
  let xMax = 0;
  let yMax = 0;
  tileMatrix.forEach(row => row.forEach(tile => {
    xMax = tile.horizontalOffset + tile.width;
    yMax = tile.verticalOffset + tile.height;
    imgData.push({
      horizontal: tile.horizontalOffset,
      vertical: tile.verticalOffset,
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
