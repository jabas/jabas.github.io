(function ( $ ) {
///
	var emailCollapse = $('#additionalEmail');
	var emailCheckbox = $('#cbEmail');

	var styleCollapse = $('#colStyle');

	var singleCollapse = $('#colSingle');
	var multiCollapse = $('#colMulti');
	var allCollapse = $('#colAll');

	var stateCollapse = $('#multiState');
	var regionCollapse = $('#multiRegion');
	var listCollapse = $('#multiList');

	$('#cbEmail').change(function(){
		if ($(this).is(':checked')) {
			emailCollapse.collapse('show');
		} else {
			emailCollapse.collapse('hide');
		}
	});

	$('#selType').change(function(){
        var val = this.value;
        if (val === 'all') {
        	styleCollapse.collapse('show');
            singleCollapse.collapse('hide');
            multiCollapse.collapse('hide');
            allCollapse.collapse('show');
            $('#radState').prop('checked',true).trigger('change');
            emailCheckbox.attr("disabled", true);
        } else if (val === 'multi') {
        	styleCollapse.collapse('show');
            singleCollapse.collapse('hide');
            multiCollapse.collapse('show');
            allCollapse.collapse('hide');
             emailCheckbox.attr("disabled", true);
        } else {
        	styleCollapse.collapse('hide');
            singleCollapse.collapse('show');
            multiCollapse.collapse('hide');
            allCollapse.collapse('hide');
            $('#radState').prop('checked',true).trigger('change');
            emailCheckbox.removeAttr("disabled");
        }
    });

	$(':radio[name="multiOpt"]').change(function(){
		var val = this.value;
		if (val === 'state') {
			stateCollapse.collapse('show');
			regionCollapse.collapse('hide');
			listCollapse.collapse('hide');
		} else if (val === 'region') {
			stateCollapse.collapse('hide');
			regionCollapse.collapse('show');
			listCollapse.collapse('hide');
		} else if (val === 'list') {
			stateCollapse.collapse('hide');
			regionCollapse.collapse('hide');
			listCollapse.collapse('show');
		}
	});
///
}( jQuery ));