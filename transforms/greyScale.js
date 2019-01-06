'use strict';

const transformGreyscale = (bmp) => {

  console.log('Transforming bitmap into greyscale', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    let color = Math.floor(( bmp.colorArray[i + 1] + bmp.colorArray[i + 2] + bmp.colorArray[i])/3);
    bmp.colorArray[i] = color;
    bmp.colorArray[i + 1] = color;
    bmp.colorArray[i + 2] = color;
  }
};