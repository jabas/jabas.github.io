(function ( $ ) {
///
$(document).ready(function() {
	$('body').on('show.bs.modal', '.modal', function(){
		$(this).attr('aria-hidden', false);
	});

	$('body').on('hide.bs.modal', '.modal', function(){
		$(this).attr('aria-hidden', true);
	});

	$('body').on('show.bs.modal', '.modal:has(.modal-full)', function(){
		$(this).data('modalScroll', $(window).scrollTop());
	});

	$('body').on('shown.bs.modal', '.modal:has(.modal-full)', function(){
		$('body').addClass('modal-body-fixed');
	});

	$('body').on('hide.bs.modal', '.modal:has(.modal-full)', function(){
		$('body').removeClass('modal-body-fixed');
		$(window).scrollTop($(this).data('modalScroll'));
	});

	$('body').on('show.bs.modal', '.modal:has(.modal-lightbox)', function(){
		$('body').addClass('body-lightbox');
	});

	$('body').on('hidden.bs.modal', '.modal:has(.modal-lightbox)', function(){
		$('body').removeClass('body-lightbox');
	});
});
///
}( jQuery ));
