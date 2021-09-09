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

	function chooseMosaic(event) {
		var elClasses = event.target.classList;
		var current = document.querySelector('.frame-selected')
		var selected = '';
		for (let i = 0; i < elClasses.length; i++) {
			let className = elClasses[i];
			if (className.startsWith('frame-') && className !== 'frame-selected') {
				selected = className.replace('frame-', '');
			}
		}
		if (current) {
			current.classList.remove('frame-selected');
		}
		event.target.classList.add('frame-selected');

		for (let i = 0; i < mosaic.classList.length; i++) {
			let className = mosaic.classList[i];
			if (className.startsWith('selected-')) {
				mosaic.classList.remove(className);
			}
		}
		mosaic.classList.add('selected-' + selected);
		mosaic.classList.add('selection-active');
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
		frames[i].addEventListener('click', chooseMosaic);
	}
})();