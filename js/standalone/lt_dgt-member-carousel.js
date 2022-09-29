(function ( $ ) {
///
	var imgCarousel = $('#digtMembCarousel');
	var txtCarousel = $('#digtMembCarText');
	var txtInner = txtCarousel.find('.carousel-inner');
	var carTabs = $('#digtMembCarTabs');

	imgCarousel.on('slide.bs.carousel', function(e) {
		var index = $(e.relatedTarget).index();
		txtCarousel.carousel(index);
		carTabs.find('.active').removeClass('active');
		carTabs.find('.nav-item:eq(' + index + ') .nav-link').addClass('active');
	});

	txtCarousel.on('slide.bs.carousel', function(e) {
		txtInner.css('height', txtInner.height() + 'px');
	});

	txtCarousel.on('slid.bs.carousel', function(e) {
		txtInner.css('height', txtInner.find('.active').height() + 'px');
		txtInner.on('transitionend MSTransitionEnd webkitTransitionEnd', function(e){
			if(e.originalEvent.propertyName === "height") {
				txtInner.css('height', '');
			}
		});
	});
///
}( jQuery ));
