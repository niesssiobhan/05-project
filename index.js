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
A dictionary of transformations
 */
const transforms = {
  greyscale: require('./transforms/greyScale.js'),
  invertgrey: require('./transforms/invertGrey.js'),
  allblack: require('./transforms/allBlack.js'),
  redshift: require('./transforms/redShift.js'),
  blueshift: require('./transforms/blueShift.js'),
  greenshift: require('./transforms/greenShift.js'),
  logger: require('./transforms/logger.js'),
  blackandwhite: require('./transforms/blackAndWhite.js'),
  invert: require('./transforms/invert.js'),
  random: require('./transforms/random.js'),
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

const [file, operation] = process.argv.slice(2);

console.log('process', process.argv);

let bitmap = new Bitmap(file);

transformWithCallbacks(operation);