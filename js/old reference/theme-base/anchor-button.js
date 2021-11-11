(function ( $ ) {
///
$('body').on('click', '[data-anchor-button]', function(e){
	e.preventDefault();
});

$('body').on('keydown', '[data-anchor-button]', function(e){
	if (e.which === 32) {
		e.preventDefault();
		$(this).trigger('click');
	}
});
///
}( jQuery ));