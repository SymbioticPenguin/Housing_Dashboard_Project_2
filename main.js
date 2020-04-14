(function () {

  var bv = new Bideo();
  bv.init({
    videoEl: document.querySelector('#background_video'),

    container: document.querySelector('body'),

    resize: true,

    // autoplay: false,

    isMobile: window.matchMedia('(max-width: 768px)').matches,

    playButton: document.querySelector('#play'),
    pauseButton: document.querySelector('#pause'),

    
    src: [
      {
        src: 'LaJolla.mp4',
        type: 'video/mp4'
      },
      {
        src: 'LaJolla.mp4',
        type: 'video/webm;codecs="vp8, vorbis"'
      }
    ],

    onLoad: function () {
      document.querySelector('#video_cover').style.display = 'none';
    }
  });
}());