(function() {
	//adjustable 100vh to account for mobile chrome
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	// window.addEventListener('resize', () => {
	// 	let vh = window.innerHeight * 0.01;
	// 	document.documentElement.style.setProperty('--vh', `${vh}px`);
	// });
	var video = document.getElementById('videoLoop');
	var source = document.getElementById('mp4Video');
	var logoAnimation = document.getElementById('logoIn');

	if (window.innerWidth >= window.innerHeight) {
		source.setAttribute('src', '/images/prospect/lt-banner-landscape.mp4');
		video.load();
	}

	function forceVidPlay() {
		video.play();
	}
	document.body.addEventListener('click', forceVidPlay, { once: true });
	video.addEventListener('suspend', () => {
		document.body.addEventListener('click', forceVidPlay, { once: true });
		document.body.addEventListener('touchstart', forceVidPlay, { once: true });
	});
    video.addEventListener('play', () => {
    	logoAnimation.beginElement();
    }, { once: true });
	video.addEventListener('ended', () => {
		video.currentTime = 7.0;
		video.play();
	});
})();
(function() {

	function openMosaic(event) {
		if(!document.querySelector('.frame-selected')) {
			var elClasses = event.target.classList;
			var current = document.querySelector('.frame-selected');
			var selected = '';
			for (let i = 0; i < elClasses.length; i++) {
				let className = elClasses[i];
				if (className.startsWith('frame-') && className !== 'frame-selected') {
					selected = className.replace('frame-', '');
				}
			}
			event.target.classList.add('frame-selected');

			
			mosaic.classList.add('selected-' + selected, 'selection-active');
			addBackdrop();
		}
	}

	function closeMosaic() {
		var current = document.querySelector('.frame-selected');
		current.style.zIndex = 1050;
		current.classList.remove('frame-selected');
		for (let i = 0; i < mosaic.classList.length; i++) {
			let className = mosaic.classList[i];
			if (className.startsWith('selected-')) {
				mosaic.classList.remove(className);
			}
		}
		mosaic.classList.remove('selection-active');
		removeBackdrop(current);
	}

	function addBackdrop() {
		body.appendChild(modalBg);
		modalBg.offsetHeight; // force repaint
		modalBg.classList.add('show');
	}

	function removeBackdrop(current) {
		modalBg.classList.remove('show');
		setTimeout(function(){
			body.removeChild(modalBg);
			current.style.zIndex = null;
		}, 1000);
	}

	var mosaic = document.querySelector('.mosaic');
	var frames = document.querySelectorAll('.frame');

	for (let i = 0; i < frames.length; i++) {
		frames[i].addEventListener('click', openMosaic);
	}

	var body = document.querySelector('body');
	var modalBg = document.createElement('div');
	var closeBtn = document.getElementById("mosaicClose");
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
			} else {
				header.classList.add('header-mini');
				header.classList.add('filled-mobile');
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
