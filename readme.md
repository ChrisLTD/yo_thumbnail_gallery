# Yo Thumbnail Gallery
### Version .01 | By [Chris Johnson](http://chrisltd.com) | https://github.com/ChrisLTD/yo_thumbnail_gallery

Yo Thumbnail Gallery creates a Google Images like thumbnail grid. When you click an image, you get a bigger version in the row beneath where you clicked. The current image is stored in the URL hash so you can bookmark specific open images.

You can also use the left and right arrows on your keyboard to navigate the gallery.

![Animated Example](https://github.com/chrisltd/yo_thumbnail_gallery/raw/master/example.gif)

Just activate the plugin on a properly formatted wrapper element and pass in an array of images, thumbnails and captions. 

## Usage Examples
Simple example
```html
<link rel="stylesheet" href="yothumbnailgallery.css">

<div id="gallery">
  <div class="thumbnails"></div>
  <div class="thumbnail_viewer">
    <a href="#" class="thumbnail_left"></a>
    <a href="#" class="thumbnail_right"></a>
    <a href="#" class="thumbnail_close">&times;</a>
    <div class="thumbnail_img">
      <div class="thumbnail_caption"></div>
    </div>
  </div>
</div>

<!-- Include jQuery Core above this line -->
<script src="jquery.yosimplefilter.js"></script>
<script>
	$('#gallery').gallery(
    [
      { url: "http://placekitten.com/800/570", thumb_url: "http://placekitten.com/800/570", caption: 'Dolor sit amet' },
      { url: "http://placekitten.com/g/350/200", thumb_url: "http://placekitten.com/g/350/200", caption: 'Numquam scripserit in sea' },
      { url: "http://placekitten.com/800/600", thumb_url: "http://placekitten.com/800/600", caption: 'Lorem ipsum dolor sit amet' },
      { url: "http://placekitten.com/g/350/150", thumb_url: "http://placekitten.com/g/350/150", caption: 'Pri ne autil' }
    ],
    {
    'thumbnail_width': 200,   // pixels
    'thumbnail_height': 200,  // pixels
    'thumbnail_margin': 5     // pixels
    }
  );
</script>
```

## Options
```js
'thumbnail_width': 200,   // pixels
'thumbnail_height': 200,  // pixels
'thumbnail_margin': 5     // pixels
```

## To do
* Link to larger images
* Create option to disable the keyboard shortcuts
* Add some init callbacks
