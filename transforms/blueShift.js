'use strict';

const transformBluescale = (bmp) => {

  console.log('Transforming bitmap into Bluescale', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {

    bmp.colorArray[i] = 255;
  }
};