(function ( $ ) {
///
	var locator = $('.pcl-club-locate');
	var navigation = $('.header, .footer-mylt');
	var resultsList = $('.pcl-results-list');
	var result = resultsList.find('.card-product');
	var toggle = $('#mapToggle');
	var resultsAreScrolling = false;

	function setScrollShadow(e) {
		if (!resultsAreScrolling) {
			window.requestAnimationFrame(function() {
				if (e.target.scrollTop > 0) {
					resultsList.addClass('scrolled');
				} else {
					resultsList.removeClass('scrolled');
				}
				resultsAreScrolling = false;
			});
			resultsAreScrolling = true;
		}
	}

	resultsList.on('scroll', setScrollShadow);

	function toggleSelected(elem) {
		if (elem.hasClass('selected')) {
			elem.removeClass('selected');
		} else {
			$('.selected').removeClass('selected');
			elem.addClass('selected');
		}
	}

	result.on('click',function(e){
		toggleSelected($(this));
	});

	result.on('keydown',function(e){
		if(e.which === 13 || e.which === 32) {
			e.preventDefault();
			toggleSelected($(this));
		}
		if(e.which === 40) {
			e.preventDefault();
			$(this).next().focus();
		}
		if(e.which === 38) {
			e.preventDefault();
			$(this).prev().focus();
		}
	});

	// mobile map changes

	function swapImages(bpOld, bpNew) {
		result.each(function(){
			var img = $(this).find('.card-img-top img');
			var newsrc = img.attr('src').replace('-' + bpOld + '.jpg', '-' + bpNew + '.jpg');
			img.attr('src', newsrc);
		});
	}

	toggle.on('click', function(e){
		if (locator.hasClass('pcl-map-view')) {
			locator.removeClass('pcl-map-view');
			navigation.removeClass('hidden-xs-up');
			toggle.html('<span class="ico-map-marker"></span> Map');
			swapImages('xs','sm');
		} else {
			locator.addClass('pcl-map-view');
			navigation.addClass('hidden-xs-up');
			toggle.html('<span class="ico-list"></span> List');
			swapImages('sm','xs');
		}
	});

///
}( jQuery ));