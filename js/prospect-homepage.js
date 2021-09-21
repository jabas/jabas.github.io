(function() {
	// dom elements
	var banner = document.getElementById('mainBanner');
	var video = document.getElementById('videoLoop');
	var source = document.getElementById('mp4Video');
	var logoAnimation = document.getElementById('logoIn');
	var navLogo = document.getElementById('headerLogo');
	var headingEl = document.getElementById('bannerHeading');
	var moveEl = document.getElementById('bannerMove');
	var connectEl = document.getElementById('bannerConnect');
	var liveEl = document.getElementById('bannerLive');
	var workEl = document.getElementById('bannerWork');
	var ctaEl = document.getElementById('bannerCta');

	// future dynamic vars	
	var vh = window.innerHeight * 0.01,
		isLandscape = window.innerWidth >= window.innerHeight;

	//set height based on browser chrome
	document.documentElement.style.setProperty('--vh', `${vh}px`);

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

		if (document.querySelector('#headerNav').classList.contains('header-mini')) {
			video.currentTime = 7.0;
			video.pause();
		}

		if ( time >= 7.04 && !headingEl.classList.contains('head-animate-in') ) {
			navLogo.classList.add('header-logo-show');
			headingEl.classList.add('head-animate-in');
		} else if ( time >= 8.29 && !moveEl.classList.contains('span-animate-in') ) {
			moveEl.classList.add('span-animate-in');
		} else if ( time >= 12.39 && !connectEl.classList.contains('span-animate-in') ) {
			connectEl.classList.add('span-animate-in');
		} else if (time >= 16.40 && !liveEl.classList.contains('span-animate-in') ) {
			liveEl.classList.add('span-animate-in');
		} else if (time >= 20.36 && !workEl.classList.contains('span-animate-in') ) {
			workEl.classList.add('span-animate-in');
		} 
	}

    video.addEventListener('play', () => {
    	if (video.currentTime < 7.0) {
    		navLogo.classList.remove('header-logo-show');
    		logoAnimation.beginElement();
    	}
    }, { once: true });
    
    video.addEventListener('timeupdate', triggerTextAnim);
	
	video.addEventListener('ended', () => {
		headingEl.classList.add('head-animate-grow');
		ctaEl.classList.add('banner-cta-animate');
		video.removeEventListener('timeupdate', triggerTextAnim);
		video.currentTime = 7.0;
		video.play();
	});	
})();
(function() {
	let ordinal;
	const anchors = document.querySelectorAll('.bubble-anchor');
	const mosaic = document.querySelector('.mosaic');
	const heading = document.querySelector('.ci-leadin');
	const modalBg = document.createElement('div');
	const closeBtn = document.getElementById("mosaicClose");

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
			if (entry.isIntersecting) {
				header.classList.remove('header-mini');
				header.classList.remove('filled-mobile');
				video.play();
			} else {
				header.classList.add('header-mini');
				header.classList.add('filled-mobile');
				if (mainHeading.classList.contains('head-animate-grow')) {
					video.pause();
				}
			}
		});
	}

	function exitedBanner(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				header.classList.add('filled');
			} else {
				header.classList.remove('filled');
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
		threshold: 0.02
	}

	var beganScrollObserver = new IntersectionObserver(beganScroll, beganScrollOpts);
	var exitedBannerObserver = new IntersectionObserver(exitedBanner, exitedBannerOpts);

	if (banner) {
		beganScrollObserver.observe(banner);
	}

	if (ciElem) {
		exitedBannerObserver.observe(ciElem);
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
