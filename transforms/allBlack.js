'use strict';

const makeblack = (bmp) => {

  console.log('Paint it Black', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 1) {
    bmp.colorArray[i ] = 0;
  }
};