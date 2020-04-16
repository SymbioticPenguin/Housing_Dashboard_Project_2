(function (global) {

  // Define Bideo constructor on the global object
  global.Bideo = function () {

    // Plugin options
    this.opt = null;
    // The Video element
    this.videoEl = null;

    // Approximate Loading Rate
    //
    // The value will be a number like 0.8
    // which means to load 4 seconds of the video
    // it takes 5 seconds. If the number is super low
    // like 0.2 (regular 3g connections) then you can
    // decide whether to play the video or not.
    // This behaviour will be controller with
    // the `acceptableLoadingRate` option.
    this.approxLoadingRate = null;

    // Methods to which `this` will be bound
    this._resize = null;
    this._progress = null;

    // Time at which video is initialized
    this.startTime = null;

    this.onLoadCalled = false;

    // Initialize and setup the video in DOM`
    this.init = function (opt) {
      // If not set then set to an empty object
      this.opt = opt = opt || {};

      var self = this;

      self._resize = self.resize.bind(this);

      self.videoEl = opt.videoEl;

      self.videoEl.addEventListener('loadedmetadata', self._resize, false);

      
      self.videoEl.addEventListener('canplay', function () {
        if (!self.opt.isMobile) {
          self.opt.onLoad && self.opt.onLoad();
          if (self.opt.autoplay !== false) self.videoEl.play();
        }
      });

      if (self.opt.resize) {
        global.addEventListener('resize', self._resize, false);
      }

      this.startTime = (new Date()).getTime();

      this.opt.src.forEach(function (srcOb, i, arr) {
        var key
          , val
          , source = document.createElement('source');

        
        for (key in srcOb) {
          if (srcOb.hasOwnProperty(key)) {
            val = srcOb[key];

            source.setAttribute(key, val);
          }
        }

        self.videoEl.appendChild(source);
      });

      if (self.opt.isMobile) {
        if (self.opt.playButton) {
          self.opt.videoEl.addEventListener('timeupdate', function () {
            if (!self.onLoadCalled) {
              self.opt.onLoad && self.opt.onLoad();
              self.onLoadCalled = true;
            }
          });


          self.opt.playButton.addEventListener('click', function () {
            self.opt.pauseButton.style.display = 'inline-block';
            this.style.display = 'none';

            self.videoEl.play();
          }, false);

          self.opt.pauseButton.addEventListener('click', function () {
            this.style.display = 'none';
            self.opt.playButton.style.display = 'inline-block';

            self.videoEl.pause();
          }, false);
        }
      }

      return;
    }

    
    this.resize = function () {
      if ('object-fit' in document.body.style) return;

      var w = this.videoEl.videoWidth
        , h = this.videoEl.videoHeight;

      
      var videoRatio = (w / h).toFixed(2);

      
      var container = this.opt.container
        , containerStyles = global.getComputedStyle(container)
        , minW = parseInt( containerStyles.getPropertyValue('width') )
        , minH = parseInt( containerStyles.getPropertyValue('height') );

      if (containerStyles.getPropertyValue('box-sizing') !== 'border-box') {
        var paddingTop = containerStyles.getPropertyValue('padding-top')
          , paddingBottom = containerStyles.getPropertyValue('padding-bottom')
          , paddingLeft = containerStyles.getPropertyValue('padding-left')
          , paddingRight = containerStyles.getPropertyValue('padding-right');

        paddingTop = parseInt(paddingTop);
        paddingBottom = parseInt(paddingBottom);
        paddingLeft = parseInt(paddingLeft);
        paddingRight = parseInt(paddingRight);

        minW += paddingLeft + paddingRight;
        minH += paddingTop + paddingBottom;
      }

      
      var widthRatio = minW / w;
      var heightRatio = minH / h;

      
      if (widthRatio > heightRatio) {
        var new_width = minW;
        var new_height = Math.ceil( new_width / videoRatio );
      }
      else {
        var new_height = minH;
        var new_width = Math.ceil( new_height * videoRatio );
      }

      this.videoEl.style.width = new_width + 'px';
      this.videoEl.style.height = new_height + 'px';
    };

  };

}(window));