'use strict';

const random = require('../transforms/random.js');
const redScale = require('../transforms/redScale.js');
const greenScale = require('../transforms/greenScale.js');
const blueScale = require('../transforms/blueScale.js');


let random = random(bmp);
let redScaleFilter = redScale(bmp);
let greenScaleFilter = greenScale(bmp);
let blueScaleFilter = blueScale(bmp);

describe('transform modules', () => {
 
  describe('random', () => {
    it('checking to make sure our random number is less than or equal to 255, and greater than 0', () => {
      let lowerBound = 0;
      let upperBound = 256;
      let expected = getRandomNum();
      expect(expected).toBeLessThan(upperBound);
      expect(expected).toBeGreaterThan(lowerBound);
    });
  });

  describe('redScale', () => {
    it('will be all red on all levels', () => {
      let expected = 255;
      let redIndex = redScaleFilter[2];
      expect(redIndex).toEqual(expected);
    });
  });

  describe('greenScale', () => {
    it('will be all green on all levels', () => {
      let expected = 255;
      let greenIndex = greenScaleFilter[2];
      expect(greenIndex).toEqual(expected);
    });
  });

  describe('blueScale', () => {
    it('will be all blue on all levels', () => {
      let expected = 255;
      let blueIndex = blueScaleFilter[2];
      expect(blueIndex).toEqual(expected);
    });
  });

});