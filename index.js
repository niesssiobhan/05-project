'use strict';

const fs = require('fs');

/**
 * Bitmap -- receives a file name, used in the transformer to note the new buffer
 * @param filePath
 * @constructor
 */
function Bitmap(filePath) {
  this.file = filePath;
}

/**
 * Parser -- accepts a buffer and will parse through it, according to the specification, creating object properties for each segment of the file
 * @param buffer
 */
Bitmap.prototype.parse = function(buffer) {
  this.buffer = buffer;
  this.type = buffer.toString('utf-8', 0, 2);
  this.size = buffer.readInt32LE(2);
  this.offset = buffer.readInt32LE(10);
  this.headerSize = buffer.readInt32LE(14);
  this.width = buffer.readInt32LE(18);
  this.height = buffer.readInt32LE(22);
  this.bitsPerPixel = buffer.readInt16LE(28);
  this.imageSize = buffer.readInt32LE(34);
  this.xPixPerM = buffer.readInt32LE(38);
  this.yPixPerM = buffer.readInt32LE(42);
  this.colorsUsed = buffer.readInt32LE(46);
  this.importantColors = buffer.readInt32LE(50);
  this.colorArray = buffer.slice(54, this.offset);
  this.pixelArray = buffer.slice(1078);
  if (!this.colorArray.length) {
    throw 'Invalid .bmp Format';
  }
};

/**
 * Transform a bitmap using some set of rules. The operation points to some function, which will operate on a bitmap instance
 * @param operation
 */
Bitmap.prototype.transform = function(operation) {
  // This is really assumptive and unsafe
  transforms[operation](this);
  this.newFile = this.file.replace(/\.bmp/, `.${operation}.bmp`);
};

/**
 * Sample Transformer (greyscale)
 * Would be called by Bitmap.transform('greyscale')
 * @param bmp
 */

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

const transformRedscale = (bmp) => {

  console.log('Transforming bitmap into redscale', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i + 2] = 255;
  }
};

const transformGreenscale = (bmp) => {

  console.log('Transforming bitmap into Greenscale', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i + 1] = 255;
  }
};

const transformBluescale = (bmp) => {

  console.log('Transforming bitmap into Bluescale', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {

    bmp.colorArray[i] = 255;
  }
};

const doTheGreyInversion = (bmp) => {
  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    let color = Math.round((bmp.colorArray[i] + bmp.colorArray[i + 1] + bmp.colorArray[i + 2])/3);
    bmp.colorArray[i] = 255 - color;
    bmp.colorArray[i + 1] = 255 - color;
    bmp.colorArray[i + 2] = 255 - color;
  }
};

const makeblack = (bmp) => {

  console.log('Paint it Black', bmp);

  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 1) {
    bmp.colorArray[i ] = 0;
  }
};

const doTheInversion = (bmp) => {
  if(!bmp.colorArray.length) throw 'must pass valid bmp object';

  for(let i = 0; i < bmp.colorArray.length; i += 4) {
    bmp.colorArray[i ] = 255 - bmp.colorArray[i];
    bmp.colorArray[i + 1] = 255 - bmp.colorArray[i + 1];
    bmp.colorArray[i + 2] = 255 - bmp.colorArray[i + 2];

  }
};

// makelogs is for testing changes to pixel array, currently makes horizontal lines or dots
const makelogs = (bmp) => {
  for (let i = 0; i < bmp.pixelArray.length; i += 55) {
    // for (let j = 0; j < 10000; j +=  10) {
    for (let k = 0; k < 4; k ++) {
      bmp.pixelArray[i  + k] = 0;
    }
    // }

    console.log(bmp.pixelArray[i], bmp.pixelArray[i + 1], bmp.pixelArray[i + 2], bmp.pixelArray[i + 3]);
  }
  console.log(bmp.pixelArray.length);
};

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

/**
 * A dictionary of transformations
 * Each property represents a transformation that someone could enter on the command line and then a function that would be called on the bitmap to do this job
 */
const transforms = {
  greyscale: transformGreyscale,
  invertgrey: doTheGreyInversion,
  allblack: makeblack,
  redshift: transformRedscale,
  blueshift: transformBluescale,
  greenshift: transformGreenscale,
  logger: makelogs,// Currently makes diaganol lines
  blackandwhite: BlackandWhite,
  invert: doTheInversion,
  random: goRandom,
};

function transformWithCallbacks(operation) {

  fs.readFile(file, (err, buffer) => {

    if (err) {
      throw err;
    }

    bitmap.parse(buffer);

    bitmap.transform(operation);

    // Note that this has to be nested!
    // Also, it uses the bitmap's instance properties for the name and thew new buffer
    fs.writeFile(bitmap.newFile, bitmap.buffer, (err, out) => {
      if (err) {
        throw err;
      }
      console.log(`Bitmap Transformed: ${bitmap.newFile}`);
    });
  });
}

// TODO: Explain how this works (in your README)
const [file, operation] = process.argv.slice(2);

console.log('process', process.argv);

let bitmap = new Bitmap(file);

transformWithCallbacks(operation);
