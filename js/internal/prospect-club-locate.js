(function ( $ ) {
///
	var resultsList = $('.pcl-results-list');
	var result = resultsList.find('.card-product');
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

	$('#mapCollapse').on('show.bs.collapse', function(e){
		var target = $(this);
		$('html, body').animate({ scrollTop: target.offset().top }, 500);
	});

///
}( jQuery ));