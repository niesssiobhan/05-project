'use strict';

const transformGreenscale = (bmp) => {

  console.log('Transforming bitmap into Greenscale', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i + 1] = 255;
  }
};