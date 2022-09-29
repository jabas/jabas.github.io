(function ( $ ) {
///
	const scroller = document.querySelector('#dptScroller');

	const list = document.querySelector('.dpt_trainer-ul');
	const cards = list.querySelectorAll('.dpt_trainer-li');
	const indicators = document.querySelectorAll('.carousel-indicators li');

	const controls = document.querySelectorAll('.dpt_scroller-btn');
	const prev = document.querySelector('.dpt_scroller-prev');
	const next = document.querySelector('.dpt_scroller-next');


	function handleIndicators(n) {
		const l = indicators.length;
		if (l > 1) {
			if (l >= 6) { // this logic only matters if there are 6 or more slides
				const nearClass = 'indicate-near',
					  hereClass = 'indicate-here',
					  farClass = 'indicate-far';

				for (let i = 0; i < l; i++) {
					indicators[i].classList.remove('active', nearClass, hereClass, farClass);
				}

				indicators[n].classList.add('active');

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
			} else {
				document.querySelector('.active').removeClass('active');
				indicators[n].classList.add('active');
			}
		} else if (l === 1) {
			document.querySelector('.dpt_dash-panel').classList.add('hidden-xs-up');
		}
	}


	let options = {
		root: scroller,
		rootMargin: '0px',
		threshold: [0, 0.6, 1]
	}

	let callback = (entries, observer) => {
		entries.forEach(entry => {
			const card = entry.target.querySelector('.dpt_trainer-card');
			const ratio = entry.intersectionRatio;

			if ( ratio <= 1 && ratio >= 0.6) {
				const index = [...entry.target.parentElement.children].indexOf(entry.target);
				handleIndicators(index);
				card.classList.add('dpt_visible');

				// hide prev control if first item
				if (cards.item(0) === card.parentNode) {
					prev.classList.add('dpt_scroller-btn-hide');
				} else {
					prev.classList.remove('dpt_scroller-btn-hide');
				}

				// hide next control if last item
				if (cards.item(cards.length - 1) === card.parentNode) {
					next.classList.add('dpt_scroller-btn-hide');
				} else {
					next.classList.remove('dpt_scroller-btn-hide');
				}

			} else {
				card.classList.remove('dpt_visible');
				if (entry.boundingClientRect.left - entry.rootBounds.left <=0 ) { // exit left
					card.classList.add('dpt_exit-left');
					card.classList.remove('dpt_exit-right');
				} else {
					card.classList.add('dpt_exit-right');
					card.classList.remove('dpt_exit-left');
				}
			}
		});
	};

	let observer = new IntersectionObserver(callback, options);

	// only enable functionality if there is more than one result
	if (cards.length > 1) {
		cards.forEach((card) => {
			if (card) {
				observer.observe(card);
			}
		});

		controls.forEach((btn) => {
			if (btn) {
				btn.addEventListener('click', (event) => {
					const distance = document.querySelector('.dpt_visible').clientWidth;
					if (event.currentTarget.classList.contains('dpt_scroller-prev')) {
						scroller.scrollBy(-distance, 0);
					} else {
						scroller.scrollBy(distance, 0);
					}
				});
			}
		});
	} else {
		cards.classList.add('dpt_visible');
		controls.classList.add('dpt_scroller-btn-hide');
	}


	
///
}());