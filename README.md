node-paperclip-resize-image
=========

This is an npm module that allows node-paperclip to resize images.  It is one of the default tasks that are called if there is no task assigned to a style (thinking of changing the name style to variation because it makes more sense with other kinds of files).  I separated this function to enable easier testing, and also to demonstrate how to make tasks.  Also, maybe people would like to use imagemagick or graphicsmagick, so this is a way to show that it is easy to use whichever method you think would work best.


To install 

```bash
npm install node-paperclip-resize --save
```

Here is an example of a model that uses these tasks the mongoose plugin. Also the styles are actually using both the resize and convert image tasks by default, but you can explicitly add them if you want.

```javascript
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Paperclip    = require('node-paperclip');

const ProfileImage = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  username: String
});

ProfileImage.plugin(Paperclip.plugins.mongoose, {
  profile_image: {
    avatar: { 
      before_save: [
      
      ],
      styles: [
        { original: true },
        { tiny:     { width: 50,  height: 50,  modifier: '#', task: ['resize-image', 'convert-image'] } },
        { 
          thumb:    { width: 100, height: 100, modifier: '#', task: [
                        require('node-paperclip-resize-image'), require('node-paperclip-convert-image')
                      ] 
                    } 
        },
        { profile:  { width: 200, height: 200, modifier: '#' } }
      ],
      prefix:      '{{plural}}/{{document.username}}',
      name_format: '{{style}}.{{extension}}',
      storage: 's3'  
      
      // You can use env variables or pass these options directly and it should work ok.
      // s3: {bucket: '', region: '', key: '', secret: ''}
    
    }
  }
})

module.exports     = mongoose.model('ProfileImage', ProfileImage);
```



Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your fix/feature has a high chance of being included, please read the following guidelines:

1. Post a [pull request](https://github.com/ballantyne/node-paperclip-resize-image/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for paperclip, please open a
   [GitHub issue](https://github.com/ballantyne/node-paperclip-resize-image/issues/new).


And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/node-paperclip-resize-image/graphs/contributors)!

License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright 
-------
© 2017 Scott Ballantyne. See LICENSE for details.

