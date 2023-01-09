(function() {
	document.addEventListener('slide.bs.carousel', function (event) {
		const carousel = event.target,
			  dash = carousel.querySelector('.carousel-dashboard');
		if (dash) {
			const bsConfig = bootstrap.Carousel.getInstance(carousel)._config;
				  prev = dash.querySelector('.carousel-control-prev'),
				  next = dash.querySelector('.carousel-control-next'),
				  indicators = dash.querySelectorAll('.carousel-indicators button'),
				  l = indicators.length, // number of total slides
				  n = event.to; // index of upcoming slide
			// TO DO: Add ability to have a detatched dashboard? Was coded for hero, but never incorporated on site
			if (!bsConfig.wrap) {
				if (n === 0) {
					prev.classList.add('disabled');
				} else {
					prev.classList.remove('disabled');
				}

				if (n === l - 1) {
					next.classList.add('disabled');
				} else {
					next.classList.remove('disabled');
				}
			}

			if (l >= 6) { // this logic only matters if there are 6 or more slides
				const nearClass = 'indicate-near',
					  hereClass = 'indicate-here',
					  farClass = 'indicate-far';

				for (let i = 0; i < indicators.length; i++) {
					indicators[i].classList.remove(nearClass, hereClass, farClass);
				}

				// first three indicators
				if (n <= 2) {
					indicators[0].classList.add(hereClass);
					indicators[1].classList.add(hereClass);
					indicators[2].classList.add(hereClass);
				} else if (n === 3 || (n > 3 && l === 6)) {
					indicators[1].classList.add(nearClass);
					indicators[2].classList.add(hereClass);
					indicators[3].classList.add(hereClass);
				} else if (n >= l - 2) {
					indicators[l-5].classList.add(farClass);
					indicators[l-4].classList.add(nearClass);
					indicators[l-3].classList.add(hereClass);
				} else {
					indicators[n-2].classList.add(farClass);
					indicators[n-1].classList.add(nearClass);
					indicators[n].classList.add(hereClass);
				}

				// last two indicators
				if (n === l - 4 || (n <= 2 && l===6)) {
					indicators[l-3].classList.add(hereClass);
					indicators[l-2].classList.add(nearClass);
				} else if (n <= 2) {
					indicators[3].classList.add(nearClass);
					indicators[4].classList.add(farClass);
				} else if (n >= l - 3) {
					indicators[l-2].classList.add(hereClass);
					indicators[l-1].classList.add(hereClass);
				} else {
					indicators[n+2].classList.add(farClass);
					indicators[n+1].classList.add(nearClass);
				}
			}
		}
	});
})();
//# sourceMappingURL=core4-ui-system.js.map
