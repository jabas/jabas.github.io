(function ( $ ) {
///
$.fn.bcSwipe = function(settings) {
	var isTouchDevice = !!(('ontouchstart' in window) || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof window.DocumentTouch);
	var config = { threshold: 50 };
	
	if(settings) {
		$.extend(config, settings);
	}

	this.each(function() {
		var stillMoving = false;
		var start;

		function onTouchMove(e) {
			if(stillMoving) {
				var x = e.touches[0].pageX;
				var difference = start - x;
				if(Math.abs(difference) >= config.threshold) {
					this.removeEventListener('touchmove', onTouchMove);
					start = null;
					stillMoving = false;
					if(difference > 0) {
						$(this).carousel('next');
					} else{
						$(this).carousel('prev');
					}
				}
			}
		}

		function onTouchStart(e) {
			if(e.touches.length === 1) {
				start = e.touches[0].pageX;
				stillMoving = true;
				this.addEventListener('touchmove', onTouchMove, false);
			}
		}

		if(isTouchDevice && !$(this).data('isSwipe')) {
			$(this).data('isSwipe',true);
			this.addEventListener('touchstart', onTouchStart, false);
		}
	});

	return this;
};
///
}( jQuery ));