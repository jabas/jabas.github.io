(function ( $ ) {
///
	function labelSwap(id, labeltype) {
		// TO DO : look at data on collapse elem when using shown/hidden.bs.collase events
		var triggers = $('[data-toggle="collapse"]').filter('[href="#' + id + '"],[data-target="#' + id + '"]');
		triggers.each(function(){
			var trigger = $(this);
			var label = trigger.data(labeltype);

			if(typeof labeltype === 'string') {
				trigger.html(label);
			}
		});
	}

	$('body').on('show.bs.collapse', '.collapse', function(e){
		if (e.currentTarget.id === e.target.id) {
			labelSwap(e.target.id, 'labelExpanded');
		}
	});

	$('body').on('hide.bs.collapse', '.collapse', function(e){
		if (e.currentTarget.id === e.target.id) {
			labelSwap(e.target.id, 'labelCollapsed');
		}
	});
///
}( jQuery ));