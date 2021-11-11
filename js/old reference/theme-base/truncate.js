(function($) {

	$('body').on('click', '[data-toggle="truncate"]', function(e){
		e.preventDefault();
		var target = $( $(this).attr('href') );
		target.toggleClass('truncate-open');
	});

})(jQuery);
