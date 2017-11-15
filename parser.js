// code adapted from https://github.com/thoughtbot/paperclip
// https://github.com/thoughtbot/paperclip/blob/master/LICENSE
// https://github.com/thoughtbot/paperclip/blob/master/lib/paperclip/geometry_parser_factory.rb

const path     = require('path');
const klass    = require('klass');
const Geometry = require(path.join(__dirname, 'geometry'));
const PARSER   = new RegExp(/\b(\d*)x?(\d*)\b(?:,(\d?))?(\@\>|\>\@|[\>\<\#\@\%^!])?/i);

module.exports = klass(function(string) {

  this.string  = string;

}).methods({
  
  make: function() {
    return new Geometry(this);
  },

  match: function() {
    var m            = this.string.match(PARSER);
    this.width       = parseInt(m[1]);
    this.height      = parseInt(m[2]);
    this.orientation = (m[3] == '' ? undefined : m[3]);
    this.modifier    = m[4];
    return this;
  }

})
