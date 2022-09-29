(function ( $ ) {
///
	var collapse = $('#selectionDetails');
	var sticky = $('.omsc-summary');
	var body = $('body');
	var modalBg = $('<div class="modal-backdrop fade"></div>');
	var duesCards = $('.omsc-dues-item .card-product');

	function mobileSize() {
		var bp = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
		return bp === 'xs' || bp === 'sm';
	}

	function escClose(e) {
		if ((e.keyCode || e.which) === 27) {
			collapse.collapse('hide');
		}
	}

	collapse.on('show.bs.collapse', function(e){
		if (e.target.id === 'selectionDetails') { // ignore nested collapses
			sticky.addClass('omsc-summary-open');
			body.data('scrollPos', $(window).scrollTop());
			if (!mobileSize()) {
				body.append(modalBg);
				modalBg[0].offsetHeight; // force repaint
				modalBg.addClass('in');
			}
			body.on('keydown', escClose);
		}
	});

	collapse.on('shown.bs.collapse', function(e){
		if (e.target.id === 'selectionDetails') {
			if (mobileSize()) {
				body.addClass('modal-open modal-body-fixed');
			} 
		}
	});

	collapse.on('hide.bs.collapse', function(e){
		if (e.target.id === 'selectionDetails') {
			modalBg.removeClass('in');
			body.removeClass('modal-open modal-body-fixed');
			if (mobileSize()) {
				$(window).scrollTop(body.data('scrollPos') || 0);
				$('.omsc-scroll').scrollTop(0);
			}
		}
		body.off('keydown', escClose);
	});

	collapse.on('hidden.bs.collapse', function(e){
		if (e.target.id === 'selectionDetails') {
			sticky.removeClass('omsc-summary-open');
			modalBg.detach();
		}
	});

	modalBg.on('click', function(){
		collapse.collapse('hide');
	});

	duesCards.on('click', function(){
		var cb = $(this).next().find('input');
		cb.prop('checked', !cb.prop('checked'));
	});


///
}( jQuery ));