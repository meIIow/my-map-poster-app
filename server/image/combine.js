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

  await Promise.all(imgData.map(async (data) => {
    const img = await loadImage(data.url);
    canvas.getContext('2d').drawImage(img, data.horizontal, data.vertical);
  }));

  return canvas.toBuffer();
}

// // Step 2 - helper function that takes images and stitches them together
// const testImageStitch = async (a, b) => {
//   console.log("A: ");
//   console.log(a);
//   const testCanvas = createCanvas(1280, 640);
//   const ctx = testCanvas.getContext('2d');
//   const imgA = await loadImage(a);
//   const imgB = await loadImage(b);
//   console.log("imgA");
//   console.log(imgA);
//   ctx.drawImage(imgA, 0, 0);
//   ctx.drawImage(imgB, 640, 0);
//   return await testCanvas.toBuffer();
// }

module.exports = { stitchTiles };
