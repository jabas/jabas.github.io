(function ( $ ) {
///
$(document).ready(function() {
	var body = $('body');

	body.on('click', '.dropdown-menu', function(e){
		// keep clicks inside of dropdowns from closing dropdowns
		e.stopPropagation();
	});

	body.on('keydown', function(e){
		if (e.which === 27 && $('.open .dropdown-menu').length > 0) {
			$('.open .dropdown-toggle').dropdown('toggle');
		}
	});

	body.on('show.bs.dropdown', '.dropdown', function(e){
		var dropdown = $(this).find('.dropdown-menu');
		// need to be displayed to to get offset position
		dropdown.css({'display':'block','visibility':'hidden'});
		var offset = dropdown.offset();
		if (offset.left < 0) {
			dropdown.css('transform','translateX(' + (0 - parseInt(offset.left)) + 'px)');
		} else if (offset.right < 0) {
			dropdown.css('transform','translateX(' + parseInt(offset.right)+ 'px)');
		}
	});

	body.on('shown.bs.dropdown', '.dropdown', function(){
		var dropdown = $(this).find('.dropdown-menu');
		dropdown.css({'display':'','visibility':''});
	});

	body.on('hide.bs.dropdown', '.dropdown', function(e){
		var dropdown = $(this).find('.dropdown-menu');
		if ($.contains(dropdown[0], document.activeElement)) {
			$(e.relatedTarget).focus();
		}
	});
});
///
}( jQuery ));
