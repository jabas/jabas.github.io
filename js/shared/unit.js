(function() {
	var intersectionOptions = {
		root: null,  // use the viewport
		rootMargin: '0px',
		threshold: 0.30
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

	var unitsEl = document.querySelector('#businessUnits');
	var enteredZoneObserver = new IntersectionObserver(enteredZone, intersectionOptions);
	enteredZoneObserver.observe(unitsEl);
})();