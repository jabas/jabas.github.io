(function() {
	// dom elements
	var banner = document.getElementById('mainBanner');
	var video = document.getElementById('videoLoop');
	var source = document.getElementById('mp4Video');
	var logoAnimation = document.getElementById('logoIn');
	var logoFadeOut = document.getElementById('logoOut');
	var isLogoFaded = false;
	var navLogo = document.getElementById('headerLogo');
	var headingEl = document.getElementById('bannerHeading');
	var moveEl = document.getElementById('bannerMove');
	var connectEl = document.getElementById('bannerConnect');
	var liveEl = document.getElementById('bannerLive');
	var workEl = document.getElementById('bannerWork');
	var ctaEl = document.getElementById('bannerCta');

	// future dynamic vars	
	
	var isLandscape = window.innerWidth >= window.innerHeight;

	//set height based on browser chrome
	var vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	if (banner.innerHeight === undefined) {
		banner.classList.add('force-banner-height');
	}

	// switch out video if landscape page
	if (isLandscape) {
		banner.classList.add('banner-landscape');
		banner.setAttribute('poster', '/images/prospect/lt-banner-landscape.jpg')
		source.setAttribute('src', '/images/prospect/lt-banner-landscape.mp4');
		video.load();
	}
	
	// force video to play on touch if suspended
	function forceVidPlay() {
		video.play();
	}

	video.addEventListener('suspend', () => {
		document.body.addEventListener('click', forceVidPlay, { once: true });
		document.body.addEventListener('touchstart', forceVidPlay, { once: true });
	});
 
 	// animation triggers
 	function triggerTextAnim() {
		var time = video.currentTime;

		if (banner.classList.contains('banner-frozen')) { // assigned in header.js
			video.currentTime = 7.0;
			video.pause();
		}

		if (time >= 5.80 && !isLogoFaded) {
			logoFadeOut.beginElement();
			isLogoFaded = true;
		} else if ( time >= 7.04 && !headingEl.classList.contains('head-animate-in') ) {
			navLogo.classList.add('header-logo-show');
			headingEl.classList.add('head-animate-in');
			moveEl.classList.add('span-animate-in');
		} else if ( time >= 11.0 && !connectEl.classList.contains('span-animate-in') ) {
			connectEl.classList.add('span-animate-in');
			moveEl.classList.add('span-animate-hold');
		} else if (time >= 15.0 && !liveEl.classList.contains('span-animate-in') ) {
			liveEl.classList.add('span-animate-in');
			connectEl.classList.add('span-animate-hold');
		} else if (time >= 19.0 && !workEl.classList.contains('span-animate-in') ) {
			workEl.classList.add('span-animate-in');
			liveEl.classList.add('span-animate-hold');
		}
	}

    video.addEventListener('play', () => {
    	vh = window.innerHeight * 0.01;
    	document.documentElement.style.setProperty('--vh', `${vh}px`);

    	if (video.currentTime < 7.0) {
    		navLogo.classList.remove('header-logo-show');
    		logoAnimation.beginElement();
    	}
    }, { once: true });
    
    video.addEventListener('timeupdate', triggerTextAnim);
	
	video.addEventListener('ended', () => {
		headingEl.classList.add('head-animate-grow');
		moveEl.classList.remove('span-animate-hold');
		connectEl.classList.remove('span-animate-hold');
		liveEl.classList.remove('span-animate-hold');
		ctaEl.classList.add('banner-cta-animate');
		video.removeEventListener('timeupdate', triggerTextAnim);
		video.currentTime = 7.0;
		video.play();
	});	
})();