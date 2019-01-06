'use strict';

const transformRedscale = (bmp) => {

  console.log('Transforming bitmap into redscale', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i + 2] = 255;
  }
};