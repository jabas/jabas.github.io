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

	// video timing vars
	var animTiming = {
		logoFade: 6.60,
		loopStart: 7.00,
		headingIn: 7.04,
		moveFrame: 8.29,
		connectFrame: 12.39,
		liveFrame: 16.40,
		workFrame: 20.36
	};

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
			video.currentTime = animTiming.loopStart;
			video.pause();
		}

		if (time >= animTiming.logoFade && !isLogoFaded) {
			logoFadeOut.beginElement();
			isLogoFaded = true;
		} else if ( time >= animTiming.headingIn && !headingEl.classList.contains('head-animate-in') ) {
			navLogo.classList.add('header-logo-show');
			headingEl.classList.add('head-animate-in');
		} else if ( time >= animTiming.moveFrame && !moveEl.classList.contains('span-animate-in') ) {
			moveEl.classList.add('span-animate-in');
		} else if ( time >= animTiming.connectFrame && !connectEl.classList.contains('span-animate-in') ) {
			connectEl.classList.add('span-animate-in');
			moveEl.classList.add('span-animate-hold');
		} else if (time >= animTiming.liveFrame && !liveEl.classList.contains('span-animate-in') ) {
			liveEl.classList.add('span-animate-in');
			connectEl.classList.add('span-animate-hold');
		} else if (time >= animTiming.workFrame && !workEl.classList.contains('span-animate-in') ) {
			workEl.classList.add('span-animate-in');
			liveEl.classList.add('span-animate-hold');
		}
	}

    video.addEventListener('play', () => {
    	vh = window.innerHeight * 0.01;
    	document.documentElement.style.setProperty('--vh', `${vh}px`);

    	if (video.currentTime < animTiming.loopStart) {
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
		video.currentTime = animTiming.loopStart;
		video.play();
	});	
})();