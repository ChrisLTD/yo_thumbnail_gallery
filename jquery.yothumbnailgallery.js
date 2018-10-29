// Script by Chris Johnson 
// http://chrisltd.com
// Created December 2013
// Version .01
// Yo Thumbnail Gallery creates a Google Images like thumbnail grid. 

(function($){
  'use strict';
  $.gallery = function(el, gallery_images, options){
    // To avoid scope issues, use 'base' instead of 'this' to reference this class from internal events and functions.
    var base = this;
    
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    
    // Add a reverse reference to the DOM object
    base.$el.data('gallery', base);
    
    base.init = function(){
      base.options = $.extend({},$.gallery.defaultOptions, options);

      // If we don't have any images, don't start
      if(typeof gallery_images === 'undefined'){
        console.log('gallery_images are required');
        return;
      }

      base.gallery_images = gallery_images;
      base.gallery_images_length = base.gallery_images.length;
      base.$gallery = base.$el;
      base.$thumbnails = $('.thumbnails', base.$gallery);
      base.thumbnail_selector = base.$gallery.selector + ' .thumbnail';
      base.$thumbnail = $(base.thumbnail_selector);
      base.$thumbnail_viewer = $('.thumbnail_viewer', base.$gallery);
      base.$thumbnail_left = $('.thumbnail_left', base.$thumbnail_viewer);
      base.$thumbnail_right = $('.thumbnail_right', base.$thumbnail_viewer);
      base.$thumbnail_close = $('.thumbnail_close', base.$thumbnail_viewer);
      base.$thumbnail_img = $('.thumbnail_img', base.$thumbnail_viewer);
      base.$thumbnail_caption = $('.thumbnail_caption', base.$thumbnail_img);
      base.caption_selector = '.caption';
      base.browser_height = $(window).height();
      base.container_width = base.$el.parent().width();

      base.bindKeypresses();
      base.bindThumbnailClicks();
      base.adjust();

      // When the window size changes, readjust
      $(window).on('resize focus', function(){ base.adjust(); });

    };
   
    // Create the thumbnails, split into rows based on width
    base.appendThumbnails = function(){
      var max_thumbs_per_row = Math.floor( base.container_width / (base.options.thumbnail_width + (base.options.thumbnail_margin * 2.5) ) ); // we multiply instead of 2 by 2.5 for extra safety
      var rows = Math.ceil( base.gallery_images_length / max_thumbs_per_row );
      var i = 0; // image index
      for(var r = 0; r < rows; r++){
        var rowID = 'row' + r;
        base.$thumbnails.append('<div class="row" id="' + rowID + '"></div>');
        for(var x = 0; (x < max_thumbs_per_row && i < base.gallery_images_length ); x++){
          $('#' + rowID, base.$thumbnails).append('<a href="#" id="thumbnail' + i + '" class="thumbnail" style="background-image:url(' + base.gallery_images[i].thumb_url + '); width: ' + base.options.thumbnail_width + 'px; height: ' + base.options.thumbnail_height + 'px; margin: ' + base.options.thumbnail_margin + 'px" data-slide-number="' + (i + 1) + '" data-row="#' + rowID + '" data-src="' + base.gallery_images[i].url + '" data-caption="' + base.gallery_images[i].caption + '"></a>');
          i++;
        }
      }
    };

    // If the window width changes, we'll need to reset the thumbnail display to redo the rows
    base.resetThumbnails = function(){
      base.$thumbnail_viewer.appendTo( base.$gallery );
      base.$thumbnails.html('');
      base.appendThumbnails();
    };

    base.bindThumbnailClicks = function(){
      base.$thumbnail_right.click(function(event){
        event.preventDefault();
        base.next_thumbnail();
      });

      base.$thumbnail_left.click(function(event){
        event.preventDefault();
        base.previous_thumbnail();
      });

      base.$thumbnail_close.click(function(event){
        event.preventDefault();
        window.location.hash = '';
        base.$thumbnail_viewer.hide();
      });

      $('body').on('click', base.thumbnail_selector, function(event){
        event.preventDefault();
        var $this = $(this);
        var $row = $this.parents('.row');

        // Set thumbnail image and caption
        base.$thumbnail_img.css('background-image', 'url(' + $this.data('src') + ')');
        base.$thumbnail_img.css('height', (base.browser_height - (2 * Math.floor(base.options.thumbnail_height * 0.2) ) - base.options.thumbnail_height ) + 'px'); // subtract a bit to show a bit of the images beneath
        $('.row').not($row).css('height', 'auto');
        base.$thumbnail_caption.text( $this.data('caption') );
        
        // Move thumbnail viewer into current row
        base.$thumbnail_viewer.appendTo($row);
        base.$thumbnail_viewer.show();
        $row.addClass('active');
        $row.css('height', (base.browser_height - Math.floor(base.thumbnail_height * 0.2) ) + 'px'); // subtract a bit to show a bit of the images beneath
        
        $(base.thumbnail_selector).not($this).removeClass('active');
        $this.addClass('active');
        window.location.hash = '#' + $this.attr('id');
      });

    };

    base.next_thumbnail = function(){
      var next_slide_number = $(base.thumbnail_selector + '.active').data('slide-number');
      if( next_slide_number >= base.gallery_images_length ){
        $(base.thumbnail_selector)[0].click(); // go to first thumb
      } else {
        $(base.thumbnail_selector)[next_slide_number].click();
      }
    };
    
    base.previous_thumbnail = function(){
      var previous_slide_number = $(base.thumbnail_selector + '.active').data('slide-number') - 2;
      if( previous_slide_number < 0 ){
        $(base.thumbnail_selector).last().click(); // go to last thumb
      } else {
        $(base.thumbnail_selector)[previous_slide_number].click();
      }
    };
    
    // Adjust the layout
    base.adjust = function() {
      base.browser_height = $(window).height();
      base.container_width = base.$el.parent().width();
      base.resetThumbnails();
      base.checkHash();
    };

    // We use hashes to save and restore state
    base.checkHash = function() {
      var hash = window.location.hash;
      if( hash.match(/^#thumbnail/) ){
        $(hash).click();
      }
    };

    // Bind keypresses
    base.bindKeypresses = function(){
      $(document).keydown(function(event) {
        if( event.key == 'Right'){
          base.next_thumbnail();
        } else if( event.key == 'Left' ){
          base.previous_thumbnail();
        }
      });
    };

    // Run initializer
    base.init();
  };
  
  $.gallery.defaultOptions = {
    thumbnail_width: 200,   // pixels
    thumbnail_height: 200,  // pixels
    thumbnail_margin: 5     // pixels
  };
  
  $.fn.gallery = function(gallery_images, options){
    return this.each(function(){
      (new $.gallery(this, gallery_images, options));
       // HAVE YOUR PLUGIN DO STUFF HERE
    });
  };
  
})(jQuery);
