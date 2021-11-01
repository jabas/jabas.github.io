(function() {
	function beganScroll(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting && banner.classList.contains('banner-frozen')) {
				banner.classList.remove('banner-frozen');
				video.play();
			} else {
				banner.classList.add('banner-frozen');
				if (mainHeading.classList.contains('head-animate-grow')) {
					video.pause();
				}
			}
		});
	}

	function exitedBanner(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				header.classList.remove('filled');
				header.classList.remove('header-mini');
			} else {
				header.classList.add('filled');
				header.classList.add('header-mini');
			}
		});
	}

	var header = document.querySelector('#headerNav');
	var banner = document.querySelector('#mainBanner');
	var ciElem = document.querySelector('#companiesInside');
	var mainHeading = document.getElementById('bannerHeading');
	var video = document.getElementById('videoLoop');

	var beganScrollOpts = {
		root: null,
		rootMargin: '-80px',
		threshold: [0, 0.5, 0.75, 1]
	}

	var exitedBannerOpts = {
		root: null,
		rootMargin: '0px',
		threshold: 0.85
	}

	var beganScrollObserver = new IntersectionObserver(beganScroll, beganScrollOpts);
	var exitedBannerObserver = new IntersectionObserver(exitedBanner, exitedBannerOpts);

	if (banner) {
		beganScrollObserver.observe(banner);
	}

	if (ciElem) {
		exitedBannerObserver.observe(banner);
	}
})();