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

	var observer = new IntersectionObserver(intersectionCallback, intersectionOptions);

	var banner = document.querySelector('#mainBanner');
	var header = document.querySelector('#headerNav');
	var unitsEl = document.querySelector('#businessUnits');
	observer.observe(banner);
})();