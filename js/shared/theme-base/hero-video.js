(function($) {
///
	$.fn.heroBGVideo = function() {
		return this.each(function(){
			var hero = $(this);
			var btn = hero.find('.btn-video');
			var videoID = hero.find('.hero-media-video').attr('id');
			var video;

			if (videoID) {
				videojs(videoID).ready(function(){
					video = this;
					// our setup assumes that autoplay is set for bg video, so we'll pause it
					// if user prefers reduced motion, but keep the ability for them
					// to play it if desired
					btn.removeClass('hidden-xs-up');

					video.on('play', function(){
						btn.addClass('btn-video-pause');
						btn.text('Pause Background Video');
					});

					video.on('pause', function(){
						btn.removeClass('btn-video-pause');
						btn.text('Play Background Video');
					});

					btn.click(function(){
						if (btn.hasClass('btn-video-pause')) {
							video.pause();
						} else {
							video.play();
						}
					});

					if (window.matchMedia('(prefers-reduced-motion)').matches) {
						video.pause();
					}
				});

				
			}
		});
	}
	$(document).ready(function(){
		$('.hero-video').heroBGVideo();
	});
///
})(jQuery);