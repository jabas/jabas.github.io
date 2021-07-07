(function ( $ ) {
///
	$('body').on('click', '.input-counter .btn', function(e){
		e.preventDefault();
		var btn = $(this);
		var input = btn.parents('.input-counter').find('.form-control');
		input.val(parseInt(input.val(), 10) + (btn.data('count') === 'less' ? -1 : 1));
		input.trigger('change');
	});

	$('body').on('focus', '.input-counter .form-control', function(e){
		$(this).select();
		$('.input-counter-focus-help[data-target="#' + $(this).attr('id') + '"]').addClass('in');
	});

	$('body').on('blur', '.input-counter .form-control', function(e){
		$('.input-counter-focus-help[data-target="#' + $(this).attr('id') + '"]').removeClass('in');
	});

	$('body').on('change input paste', '.input-counter .form-control', function(e){
		var input = $(this);
		var lessBtn = input.parents('.input-counter').find('[data-count="less"]');
		var moreBtn = input.parents('.input-counter').find('[data-count="more"]');

		var isNum = /^\d+$/.test(input.val());
		var val = parseInt(input.val(), 10);
		var min = input.data('counterMin');
		var max = input.data('counterMax');

		if (val >= 0 && isNum) {
			lessBtn.prop('disabled', val <= min);
			moreBtn.prop('disabled', val >= max);
			if (val < min) {
				input.val(min);
				input.select();
			}
			if (val > max) {
				input.val(max);
				input.select();
			}
		} else {
			input.val(min);
			lessBtn.prop('disabled', true);
			moreBtn.prop('disabled', false);
			input.select();
		}
	});
///
}( jQuery ));
