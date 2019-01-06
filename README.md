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
*  logger: makelogs - This transforms the image to have diagonal lines across it 
*  blackandwhite: BlackandWhite - This transforms the image to black and white
*  invert: doTheInversion - This transforms the image to invert
*  random: goRandom - Thi transforms the image into random colors 

### Setup
#### `.env` requirements
* `PORT` - Defined by ENV

#### Collaboration
* Worked together and brainstormed with Brent Woodward, Michael George, Ryan Gallaway, George Raymond

#### Running the app
* Open up your terminal and run the ` node index.js ./assets/baldy.bmp <transformer>`
* This will open up what bmp transformer you have created 

#### Process.argvs
* Starting off with node which will trigger node to run in the command line which will run the file path and then the following argument will be the specific file you are working with last is the operation that will run for that specific file

#### Tests
* run: npm test
* run: npm run linit
* Then those commands will check if the transformations are correct