(function ( $ ) {
///
$(document).ready(function() {
	$('body').on('shown.bs.modal', '.modal', function(){
		$('[autofocus]', this).focus();
	});

	$('body').on('keydown', '[data-enter-target]', function(event) {
		var keyCode = event.which;
		var $enterTrigger = $(this);
		var $enterTarget = $($enterTrigger.data('enter-target'));
		if(keyCode === 13 && $enterTrigger.is(':focus')){
			$enterTarget.click();
		}
	});

});
///
}( jQuery ));