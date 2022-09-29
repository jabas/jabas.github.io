(function () {
///
	var dateInput = $('#moveInDate');
	var dateDisplay = $('#dateDisplay').find('.btn-icon-text');
	var today = moment();
	dateInput.val(today.format('YYYY-MM-DD'));
	dateDisplay.text(today.format('dddd, MMMM D, YYYY'));

	dateInput.datepicker({
		format: 'yyyy-mm-dd',
		autoclose: true,
		startDate: new Date(),
		orientation: 'bottom left',
	});

	dateInput.on('change', function() {
		var str = moment(dateInput.val(),'YYYY-MM-DD').format('dddd, MMMM D, YYYY');
		dateDisplay.text(str);
	});

	dateInput.on('touchstart', function(event){
		var el = $(event.target);
		if (el.attr('type') !== 'date') {
			event.preventDefault();
			el.attr('type', 'date');
			el.focus();
		}
	});
///
}( ));