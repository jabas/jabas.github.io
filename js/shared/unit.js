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