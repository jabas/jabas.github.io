(function ( $ ) {
///
	$('.carousel').bcSwipe();

	$('body').on('slide.bs.carousel', '.carousel-dash', function(e) {
		// DOM elements
		var carousel = $(this);
		var detached = !carousel.find('.carousel-dash-panel').length > 0; // boolean
		var dash = detached ? $('.carousel-dash-panel[data-target="#' + carousel.attr('id') + '"]') : carousel.find('.carousel-dash-panel');
		var indicators = dash.find('.carousel-indicators li');
		var prev = dash.find('[data-slide="prev"]');
		var next = dash.find('[data-slide="next"]');
		// maths
		var l = indicators.length; // length of indicators
		var n = $(e.relatedTarget).index(); // index of next slide

		if (carousel.data('wrap') === false) {
			if (n === 0) {
				prev.addClass('disabled');
			} else {
				prev.removeClass('disabled');
			}

			if (n === l - 1) {
				next.addClass('disabled');
			} else {
				next.removeClass('disabled');
			}
		}

		if (detached) { // active state doesn't work when indicators are outside carousel 
			indicators.removeClass('active');
			indicators.eq(n).addClass('active');
		}

		if (l >= 6) { // this logic only matters if there are 6 or more slides
			indicators.removeClass('indicate-far indicate-near indicate-here');
			
			// first three indicators
			if (n <= 2) {
				indicators.slice(0,3).addClass('indicate-here');
			} else if (n === 3 || (n > 3 && l === 6)) {
				indicators.eq(1).addClass('indicate-near');
				indicators.slice(2,4).addClass('indicate-here');
			} else if (n >= l - 2) {
				indicators.eq(-5).addClass('indicate-far');
				indicators.eq(-4).addClass('indicate-near');
				indicators.eq(-3).addClass('indicate-here');
			} else {
				indicators.eq(n-2).addClass('indicate-far');
				indicators.eq(n-1).addClass('indicate-near');
				indicators.eq(n).addClass('indicate-here');
			}

			// last two indicators
			if (n === l - 4 || (n <= 2 && l===6)) {
				indicators.eq(-3).addClass('indicate-here');
				indicators.eq(-2).addClass('indicate-near');
			} else if (n <= 2) {
				indicators.eq(3).addClass('indicate-near');
				indicators.eq(4).addClass('indicate-far');
			} else if (n >= l - 3) {
				indicators.slice(-2).addClass('indicate-here');
			} else {
				indicators.eq(n+2).addClass('indicate-far');
				indicators.eq(n+1).addClass('indicate-near');
			}
		}
	});

	$.fn.cardCarousel = function() {
		return this.each(function(){
			var carousel = $(this);
			var slideWrap = carousel.find('.carousel-inner');
			var dash = carousel.find('.carousel-dash-panel');
			var prevBtn = dash.find('[data-slide="prev"]');
			var nextBtn = dash.find('[data-slide="next"]');
			var indicatorWrap = dash.find('.carousel-indicators');
			var bp = lthelp.getBreakpoint();

			function cardsPerSlide() {
				var p = 1; // cards per slide, default at xs = 1
				if (bp === 'sm' || bp === 'md') {
					p = 2;
				} else if (bp === 'lg' || bp === 'xl') {
					p = 3;
				}
				return p;
			}

			// watch for DOM changes to slide count
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					countSlides();
				});    
			});

			function countSlides() {
				var p = cardsPerSlide();
				var cards = slideWrap.find('.card').detach();
				var slideCount = Math.ceil(cards.length/p);
				var slides = $();
				var indicators = $();

				observer.disconnect();
				slideWrap.empty();
				indicatorWrap.empty();

				for (var i=0; i < slideCount; i++) {
					var slide = i === 0 ? $('<div class="carousel-item active"/>') : $('<div class="carousel-item"/>');
					var indicator = i === 0 ? $('<li class="active"/>') : $('<li/>');
					var set = p === 1 ? cards.eq(i) : cards.slice(i*p,(i+1)*p);
					set.appendTo(slide);
					slides = slides.add(slide);
					indicators = indicators.add(indicator);
				}

				slides.appendTo(slideWrap);
				indicators.appendTo(indicatorWrap);

				if (carousel.data('wrap') === false) {
					prevBtn.addClass('disabled');
					nextBtn.removeClass('disabled');
				}

				if (slideCount === 1) {
					dash.addClass('hidden-xs-up');
				} else {
					dash.removeClass('hidden-xs-up');
				}

				observer.observe(slideWrap[0], {childList: true});
			}

			if(!carousel.data('isCardCarousel')) {
				carousel.data('isCardCarousel', true);

				observer.observe(slideWrap[0], {childList: true}); // turn on observer

				if (bp !== 'xs') {
					countSlides();
				}

				var debounceCount = lthelp.debounce(function() {
					var nbp = lthelp.getBreakpoint();
					if (nbp !== bp) {
						bp = nbp;
						countSlides();
					}
				}, 100);

				$(window).on('resize', debounceCount);
			}


		});
	};

	$(document).ready(function(){
		if ($('.carousel-card').length > 0) {
			$('.carousel-card').cardCarousel();
		}

		// attach overflow behavior listener - tied to unique animation event when inserted into DOM - see _navbar.scss
		$('body').on('animationstart MSAnimationStart webkitAnimationStart', function(e){
			if (e.animationName == "cardCarouselInserted" || e.originalEvent.animationName == "cardCarouselInserted") {
				$('.carousel-card').bcSwipe().cardCarousel();
			}
		});
	});
///
}( jQuery ));