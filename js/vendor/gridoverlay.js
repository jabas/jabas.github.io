$(document).ready(function () {

	// Detect option + G (alt + G on PC) keypress to toggle the grid overlay
	$('body').on('keyup',function(e){
		if(e.which==71 && e.altKey){
			$('.sg-grid-overlay').toggleClass('invisible');
		}
	});
});