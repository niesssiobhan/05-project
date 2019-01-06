'use strict';

const BlackandWhite = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    let color = Math.round((bmp.colorArray[i] + bmp.colorArray[i + 1] + bmp.colorArray[i + 2])/3);
    color = color < 128 ? 0 : 255;
    bmp.colorArray[i] = color;
    bmp.colorArray[i + 1] = color;
    bmp.colorArray[i + 2] = color;
  }
};