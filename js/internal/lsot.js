(function ( $ ) {
///
	var allCollapse = $('#allDaysCollapse');
	var eachCollapse = $('#eachDayCollapse');

	$(':radio[name="editRadio"]').change(function(){
		console.log(this.value);
		if (this.value === 'all') {
			allCollapse.collapse('show');
			eachCollapse.collapse('hide');
		} else {
			allCollapse.collapse('hide');
			eachCollapse.collapse('show');
		}
	});
///
}( jQuery ));
