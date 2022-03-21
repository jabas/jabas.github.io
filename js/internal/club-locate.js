(function ( $ ) {
///
	var filterWrap = $('.club-locate .map-filters');
	var filterPanels = filterWrap.find('.collapse');
	var wrapClose = true;
	var mapWrap = $('.map-wrapper');
	var map = $('.map-canvas');
	var resultsList = $('.results-list');
	var result = resultsList.find('.map-result');

	filterPanels.on('show.bs.collapse', function(e){
		if (wrapClose) {
			filterWrap.addClass('active open');
			wrapClose = false;
		}
	});

	filterPanels.on('hide.bs.collapse', function(e){
		// if only one panel is left open, close the wrapper
		if (filterPanels.filter('.in').length === 1) {
			filterWrap.removeClass('open');
			wrapClose = true;
		}
	});

	filterPanels.on('hidden.bs.collapse', function(e){
		if (wrapClose) {
			filterWrap.removeClass('active');
		}
	});

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
		if(e.which === 13) {
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

///
}( jQuery ));