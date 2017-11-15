const klass          = require('klass');
const Geometry       = require('paperclip').geometry;
const sharp          = require('sharp');

module.exports       = klass(function(paperclip) {
  this.paperclip     = paperclip;
}).methods({

  perform: function(options, next) {
    var self = this;
    var geometry     = new Geometry({width: self.paperclip.file().data.width, 
                                     height: self.paperclip.file().data.height})
    var strategy     = geometry.strategy(options);
    var image        = sharp((self.buffer ? self.buffer : self.paperclip.file().file.path));
 
    switch(strategy.resize.modifier) {
      case '!':
        image = image.resize(strategy.resize.width, strategy.resize.height).ignoreAspectRatio();
        break;
      case '#':
        image = image.resize(strategy.resize.width, strategy.resize.height).crop(sharp.strategy.attention);
        break;
      case '>':
        image = image.resize(strategy.resize.width, strategy.resize.height).max();
        break;
      case '<':
        image = image.resize(strategy.resize.width, strategy.resize.height).min();
        break;
      default:
        image = image.resize(strategy.resize.width, strategy.resize.height);
    }

    if (strategy.extract) {
      image   = image.extract(strategy.extract);
    }
    
    image.toBuffer(function(err, buffer) {
      if (err) {
        throw err;
      }
      if (next) {
        next(err, buffer);
      }
    });
  }

})
