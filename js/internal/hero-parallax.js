(function ( $ ) {
///

	var animOpts = {
		root: null,  // use the viewport
		rootMargin: '-60px',
		threshold: 0.02
	}

	function animIn(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in');
			}
		});
	}

	var animEls = document.querySelectorAll('.fade-up');
	var animationObserver = new IntersectionObserver(animIn, animOpts);

	animEls.forEach((item) => {
		if (item) {
			animationObserver.observe(item);
		}
	});

	window.onload = function () {

		lax.init();
		lax.addDriver('scrollY', function () {
			return window.scrollY
		});

		lax.addElements('.hero-media', {
			scrollY: {
				translateY: [
					["elInY + screenHeight", "elOutY "],
					[0, 'elHeight/2'],
				],
				scale: [
					["elInY + screenHeight", "elOutY"],
					[1, 1.2],
				],
				opacity: [
					["elInY + screenHeight", "elOutY"],
					[1, 0.25],
				]
			}
		});


	}
///
}( jQuery ));

