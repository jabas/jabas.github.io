(function() {
	var intersectionOptions = {
		root: null,  // use the viewport
		rootMargin: '0px',
		threshold: 0.02
	}

	function enteredZone(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				unitsEl.classList.remove('zone-active');
			} else {
				unitsEl.classList.add('zone-active');
			}
		});
	}

	var enteredZoneObserver = new IntersectionObserver(enteredZone, intersectionOptions);

	var banner = document.querySelector('#mainBanner');
	var header = document.querySelector('#headerNav');
	var unitsEl = document.querySelector('#businessUnits');

	if (banner) {
		enteredZoneObserver.observe(banner);
	}

	var mosaic = document.querySelector('.mosaic');
	var frames = document.querySelectorAll('.frame');

	for (let i = 0; i < frames.length; i++) {
		frames[i].addEventListener('click', openMosaic);
	}

	var video = document.getElementById("bannerVideo");
	if (video) {
		video.addEventListener('ended', function(){
			video.currentTime = 2.8;
			video.play();
		});
	}


	var body = document.querySelector('body');
	var modalBg = document.createElement('div');
	var closeBtn = document.getElementById("mosaicClose");
	modalBg.classList.add('modal-backdrop', 'fade');
	modalBg.addEventListener('click', closeMosaic);
	closeBtn.addEventListener('click', closeMosaic);
})();