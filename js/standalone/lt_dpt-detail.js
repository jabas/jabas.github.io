(function () {
///

	function collapseSection(element) {
		const sectionHeight = element.scrollHeight;

		requestAnimationFrame(function() {
			element.style.height = sectionHeight + 'px';
			element.classList.remove('dpt_expanded');
	    
	    	requestAnimationFrame(function() {
				element.style.height = null;
			});
		});
	}

	function expandSection(element) {
		const sectionHeight = element.scrollHeight;

		element.style.height = sectionHeight + 'px';

		element.addEventListener('transitionend', function(e) {
			element.removeEventListener('transitionend', arguments.callee);
			element.style.height = null;
			element.classList.add('dpt_expanded');
		});
	}

	document.querySelector('#testimonialToggle').addEventListener('click', function(e) {
		e.preventDefault();
		const testimonials = document.querySelector('.dpt_testimonial-list');
		const isExpanded = testimonials.classList.contains('dpt_expanded');

		if (isExpanded) {
			collapseSection(testimonials);
		} else {
			expandSection(testimonials);
		}
	});


	const options = {
		root: null,
		rootMargin: '0px',
		threshold: 1.0
	}

	const callback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.remove("dpt_fade-out");
			} else {
				entry.target.classList.add("dpt_fade-out");
			}
		})
	}

	const backObserver = new IntersectionObserver(callback, options);
	backObserver.observe(document.querySelector('.dpt_navigation'));

///
}());