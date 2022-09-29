(function() {
	// dom elements

	var banner = document.getElementById('mainBanner');
	var video = document.getElementById('videoLoop');
	var source = document.getElementById('mp4Video');
	var vidBtn = document.getElementById('vidBtn');
	var logoAnimation = document.getElementById('logoIn');
	var isLogoAnimated = false;
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
		video.setAttribute('poster', '/images/prospect/lt-banner-landscape-still.jpg')
		source.setAttribute('src', '/images/prospect/lt-banner-landscape.mp4');
		video.load();
	}
	
	// force video to play on touch if suspended
	function forceVidPlay() {
		video.play();
	}

	video.addEventListener('suspend', () => {
		if (video.currentTime === 0) {
			document.body.addEventListener('click', forceVidPlay, { once: true });
	 		document.body.addEventListener('touchstart', forceVidPlay, { once: true });
		}
	});
 
 	// animation triggers
 	function triggerTextAnim() {
		var time = video.currentTime;

		if (time < 5.80 && !isLogoAnimated) {
			logoAnimation.beginElement();
		}

		if (time >= 5.80 && !isLogoFaded) {
			document.getElementById('bannerSVG').classList.add('logo-fadeout');
			isLogoFaded = true;
		} else if ( time >= 7.04 && !headingEl.classList.contains('head-animate-in') ) {
			navLogo.classList.add('header-logo-show');
			headingEl.classList.add('head-animate-in');
			moveEl.classList.add('span-animate-in');
		} else if ( time >= 11.07 && !connectEl.classList.contains('span-animate-in') ) {
			connectEl.classList.add('span-animate-in');
			moveEl.classList.add('span-animate-hold');
		} else if (time >= 15.09 && !liveEl.classList.contains('span-animate-in') ) {
			liveEl.classList.add('span-animate-in');
			connectEl.classList.add('span-animate-hold');
		} else if (time >= 19.06 && !workEl.classList.contains('span-animate-in') ) {
			workEl.classList.add('span-animate-in');
			liveEl.classList.add('span-animate-hold');
		}
	}

	logoAnimation.addEventListener('beginEvent', () => {
		isLogoAnimated = true;
	});

    video.addEventListener('play', () => {
    	vh = window.innerHeight * 0.01;
    	document.documentElement.style.setProperty('--vh', `${vh}px`);
    	vidBtn.classList.add('banner-video-playing');

    	if (video.currentTime < 7.0) {
    		navLogo.classList.remove('header-logo-show');
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

	vidBtn.addEventListener('click', function(){
		var body = document.querySelector('body');
		if (vidBtn.classList.contains('banner-video-playing')) {
			video.pause();
			vidBtn.classList.remove('banner-video-playing');
			body.classList.add('banner-static-view');
		} else {
			if (video.currentTime < 7.0) {
				video.currentTime = 7.0;
			}
			video.play();
			vidBtn.classList.add('banner-video-playing');
			body.classList.remove('banner-static-view');
		}
	})

})();
(function() {
	

	const ciZone = document.getElementById('companiesInside');
	const anchors = document.querySelectorAll('.bubble-anchor');
	const mosaic = document.querySelector('.mosaic');
	const heading = document.querySelector('.ci-leadin');
	const modalBg = document.createElement('div');
	const closeBtn = document.getElementById("mosaicClose");
	const bubbleMobile = document.querySelector('.bubble-stack');
	const mobileAnim = document.getElementById('mobileBubbles');
	const desktopAnim = document.getElementById('desktopBubbles');

	let ordinal;
	let mobileAnimStarted = false;
	let desktopAnimStarted = false;

	var headingAnimOpts = {
		root: null,  // use the viewport
		rootMargin: '-80px',
		threshold: 0.02
	}

	function openMosaic(event) {
		event.preventDefault();
		ordinal = this.getAttribute('data-frame');
		const target = document.querySelector('.frame-' + ordinal);
		const vidWrap = document.querySelector('.video-' + ordinal);
		const vidPlayer = document.querySelector('.video-' + ordinal + ' video');
		mosaic.classList.add('selected-' + ordinal, 'selection-active');
		target.classList.add('frame-selected');

		if (this.hasAttribute('data-is-mobile')) {
			vidWrap.classList.add('video-active');
			vidPlayer.play();
			vidPlayer.addEventListener('ended', closeMosaic);
			addBackdrop('body');
		} else {
			target.addEventListener('transitionend', () => {
				vidWrap.classList.add('video-active');
				vidPlayer.play();
				vidPlayer.addEventListener('ended', closeMosaic);
			}, {once: true});

			switch (ordinal) {
				case 'northwest':
					// nw has no play change
					document.getElementById('nAnimHide').beginElement();
					document.getElementById('swAnimHide').beginElement();
					document.getElementById('sAnimHide').beginElement();
					document.getElementById('seAnimHide').beginElement();
					break;
				case 'north':
					document.getElementById('nAnimPlay').beginElement();
					document.getElementById('nwAnimHide').beginElement();
					document.getElementById('swAnimHide').beginElement();
					document.getElementById('sAnimHide').beginElement();
					document.getElementById('seAnimHide').beginElement();
					break;
				case 'center':
					// center has no play or hide change
					document.getElementById('nwAnimHide').beginElement();
					document.getElementById('nAnimHide').beginElement();
					document.getElementById('swAnimHide').beginElement();
					document.getElementById('sAnimHide').beginElement();
					document.getElementById('seAnimHide').beginElement();
					break;
				case 'southeast':
					document.getElementById('seAnimPlay').beginElement();
					document.getElementById('nwAnimHide').beginElement();
					document.getElementById('nAnimHide').beginElement();
					document.getElementById('swAnimHide').beginElement();
					document.getElementById('sAnimHide').beginElement();
					break;
				case 'south':
					document.getElementById('sAnimPlay').beginElement();
					document.getElementById('nwAnimHide').beginElement();
					document.getElementById('nAnimHide').beginElement();
					document.getElementById('swAnimHide').beginElement();
					document.getElementById('seAnimHide').beginElement();
					break;
				case 'southwest':
					// sw has no play state
					document.getElementById('nwAnimHide').beginElement();
					document.getElementById('nAnimHide').beginElement();
					document.getElementById('sAnimHide').beginElement();
					document.getElementById('seAnimHide').beginElement();
					break;
			}
			addBackdrop('mosaic');
		}
		
	}

	function closeMosaic() {
		var currentFrame = document.querySelector('.frame-selected');
		var currentVidWrap = document.querySelector('.video-active');
		var currentVid = document.querySelector('.video-' + ordinal + ' video');
		currentFrame.style.zIndex = 1050;
		currentFrame.classList.remove('frame-selected');
		currentVidWrap.classList.remove('video-active');
		currentVid.pause();
		currentVid.removeEventListener('ended', closeMosaic);
		mosaic.classList.remove('selected-' + ordinal, 'selection-active');
		
		switch (ordinal) {
			case 'northwest':
				// nw has no play change
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
			case 'north':
				document.getElementById('nAnimPlayReturn').beginElement();
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
			case 'center':
				// center has no play or hide change
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
			case 'southeast':
				document.getElementById('seAnimPlayReturn').beginElement();
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				break;
			case 'south':
				document.getElementById('sAnimPlayReturn').beginElement();
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
			case 'southwest':
				// sw has no play state
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
		}

		mosaic.classList.remove('selection-active');
		removeBackdrop();
	}

	function addBackdrop(location) {
		if (location === 'body') {
			document.body.appendChild(modalBg);
		} else {
			mosaic.appendChild(modalBg);
		}
		modalBg.offsetHeight; // force repaint
		modalBg.classList.add('show');
	}

	function removeBackdrop() {
		modalBg.classList.remove('show');
		setTimeout(function(){
			modalBg.parentElement.removeChild(modalBg);
		}, 1000);
	}

	function headingAnimation(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('ci-leadin-animate-in');
				ciZone.classList.add('arrow-active');
				if (window.getComputedStyle(bubbleMobile).display  === 'none' && !desktopAnimStarted) {
					desktopAnim.beginElement();
					desktopAnimStarted = true;
				} else if (!mobileAnimStarted) {
					mobileAnim.beginElement();
					mobileAnimStarted = true;
				}
			}
		});
	}

	var headingAnimationObserver = new IntersectionObserver(headingAnimation, headingAnimOpts);
	headingAnimationObserver.observe(heading);


	for (let i = 0; i < anchors.length; i++) {
		anchors[i].addEventListener('click', openMosaic);
	}

	modalBg.classList.add('modal-backdrop', 'fade');
	modalBg.addEventListener('click', closeMosaic);
	closeBtn.addEventListener('click', closeMosaic);
})();
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
(function() {
	var enteredZoneOpts = {
		root: null,  // use the viewport
		rootMargin: '0px',
		threshold: 0.30
	}

	var unitAnimOpts = {
		root: null,  // use the viewport
		rootMargin: '-40px',
		threshold: 0.02
	}

	function enteredZone(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				unitsEl.classList.add('zone-active');
				unitsEl.classList.add('arrow-active');
			} else {
				unitsEl.classList.remove('zone-active');
			}
		});
	}

	function unitAnimation(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('unit-animate-in');
			}
		});
	}

	var unitsEl = document.querySelector('#businessUnits');
	var contentEls = document.querySelectorAll('.unit-animated');

	var enteredZoneObserver = new IntersectionObserver(enteredZone, enteredZoneOpts);
	var unitAnimationObserver = new IntersectionObserver(unitAnimation, unitAnimOpts);

	enteredZoneObserver.observe(unitsEl);

	contentEls.forEach((item) => {
		if (item) {
			unitAnimationObserver.observe(item);
		}
	});
})();
//# sourceMappingURL=prospect-homepage.js.map
