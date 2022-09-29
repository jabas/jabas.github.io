(function ( $ ) {
///
$(document).ready(function(){
	$('body').on('click', '[data-scrollto]', function(e){
		e.preventDefault();

		var trigger = $(this);
		var href = trigger.attr('href');
		var data = trigger.data();
		var offset = typeof data.offset !== 'number' ? -12 : data.offset;
		var speed = typeof data.speed !== 'number' ? 500 : data.speed;
		
		if (data.scrollto === 'href') {
			data.scrollto = href;
		}

		lthelp.scrollTo(data.scrollto, offset, speed);

	});
});
///
}( jQuery ));