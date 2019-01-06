'use strict';

const makelogs = (bmp) => {
  for (let i = 0; i < bmp.pixelArray.length; i += 55) {
    for (let k = 0; k < 4; k ++) {
      bmp.pixelArray[i  + k] = 0;
    }

    console.log(bmp.pixelArray[i], bmp.pixelArray[i + 1], bmp.pixelArray[i + 2], bmp.pixelArray[i + 3]);
  }
  console.log(bmp.pixelArray.length);
};