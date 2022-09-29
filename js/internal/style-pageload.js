var options = {
	lines: 12, // The number of lines to draw
	length: 16, // The length of each line
	width: 5, // The line thickness
	radius: 16, // The radius of the inner circle
	scale: 0.8, // Scales overall size of the spinner
	corners: 1, // Corner roundness (0..1)
	direction: 1, // 1: clockwise, -1: counterclockwise
	color: '#444444', // #rgb or #rrggbb or array of colors
	speed: 1.5, // Rounds per second
	trail: 80, // Afterglow percentage
	className: 'spinner', // The CSS class to assign to the spinner
	rotate: 0, // The rotation offset
	shadow: false, // Whether to render a shadow
	hwaccel: true, // Whether to use hardware acceleration
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	top: '50%', // Top position relative to parent
	left: '50%' // Left position relative to parent
};

var target = document.getElementById('spinner');
var spinner = new Spinner(options).spin(target);

(function ($) {

	if (window.location.href.indexOf('04-themes-01-prospect') >= 0) {
		var stylesheet = $('#pagestyle');
		var newhref = stylesheet.attr('href').replace("shared-styles.css", "theme-prospect.css");
		stylesheet.attr('href', newhref);
	}

	$(document).ready(function () {
		// login demo button
		$('#showLoginLoad').click(function (e) {
			e.preventDefault();
			$('#showpassword').prop("checked", false).trigger('change');
			$('.login-loading').addClass('in');
			setTimeout(function () {
				$('.login-loading').removeClass('in');
			}, 3000);
		});

		// hours scroll to demo
		if (lthelp.urlParam('lt_hours') !== null) {
			var target = lthelp.urlParam('lt_hours');
			var collapse = $("[id^='" + target + "']").first();
			var card = collapse.closest('.card');
			collapse.collapse('show');
			lthelp.scrollTo(card, -12, 500);
		}
	});

}(jQuery));