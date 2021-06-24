(function ( $ ) {
///
	$(document).ready( function() {
		var stateSelect = $('#state-anchor');
		var offset = 0 - ( $('.locations-toolbar').outerHeight() + $('.state-header').first().outerHeight() );

		stateSelect.change(function(){
			var anchor = $(stateSelect.val() + ' > .club-result:first-child');
			if (anchor.length > 0) {
				lthelp.scrollTo(anchor, offset, 500);
			} else {
				lthelp.scrollTo('top', 0, 500);
			}
		});
	});
///
}( jQuery ));