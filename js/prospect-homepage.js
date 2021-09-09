(function() {
	var intersectionOptions = {
		root: null,  // use the viewport
		rootMargin: '0px',
		threshold: 0.02
	}

	function intersectionCallback(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				header.classList.remove('filled');
				unitsEl.classList.remove('zone-active');
			} else {
				header.classList.add('filled');
				unitsEl.classList.add('zone-active');
			}
		});
	}

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

	var observer = new IntersectionObserver(intersectionCallback, intersectionOptions);

	var banner = document.querySelector('#mainBanner');
	var header = document.querySelector('#headerNav');
	var unitsEl = document.querySelector('#businessUnits');

	if (banner) {
		observer.observe(banner);
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
//# sourceMappingURL=prospect-homepage.js.map
