(function ( $ ) {
///
	$('.svg-seat').on('click',function(e){
		var number = $(this).find('text').text();
		alert('You have clicked Seat #' + number);
	});
///
}( jQuery ));