'use strict';

const goRandom = (bmp) => {
  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  const randomColors = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i] = randomColors(0, 255);
    bmp.colorArray[i + 1] = randomColors(0, 255);
    bmp.colorArray[i + 2] = randomColors(0, 255);
  }
};