![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Bitmap Transformations

### Authors: Siobhan Niess and Jared Pattison

### Links and Resources
* [repo](https://github.com/niesssiobhan/05-project)
* [travis](http://xyz.com)
* [server](https://niess-pattison-05-lab.herokuapp.com/)

### Modules
#### `index.js`
##### Exported Values and Methods
* greyscale: transformGreyscale - This transfrom the image to greyscale
*  invertgrey: doTheGreyInversion -This transforms the image to invertion of grey
*  allblack: makeblack - This transforms the image to black
*  redshift: transformRedscale - This transforms the image to a red scale
*  blueshift: transformBluescale - This transforms the image to a blue scale
*  greenshift: transformGreenscale - This transforms the image to a green scale
*  logger: makelogs - This transforms the image to have logs
*  blackandwhite: BlackandWhite - This transforms the image to black and white
*  invert: doTheInversion - This transforms the image to invert
*  random: goRandom - Thi transforms the image into random colors 

### Setup
#### `.env` requirements
* `PORT` - Defined by ENV

#### Running the app
* `npm start`
* Endpoint: `/`
  * Returns a will save a new bmp file to the assets folder

#### Tests
* run: npm test
* run: npm run linit
* Then those commands will check if the transformations are correct