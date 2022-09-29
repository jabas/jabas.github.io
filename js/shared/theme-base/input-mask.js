(function ( $ ) {
///
	// currently, the only option for masking is 'phone'
	// as such, the value for the data-inputmask attribute is not evaluated

	function digitsOnly(str) {
		str = str.replace(/[^0-9]/g, '');
		if (str[0] === '1') {
			str = str.substring(1);
		}
		return str;
	}

	$('body').on('focus', '[data-inputmask="phone"]', function(e){
		var input = $(this);
		var val = input.val();
		input.val(digitsOnly(val));
	});

	$('body').on('blur', '[data-inputmask="phone"]', function(e){
		var input = $(this);
		var nval = digitsOnly(input.val()).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
		input.removeAttr('maxlength').val(nval);
	});

	$('body').on('change keyup input', '[data-inputmask="phone"]', function(e){
		var input = $(this);
		var val = input.val();

		if (digitsOnly(val).length >= 10) {
			input.attr('maxlength', val.length);
		} else {
			input.removeAttr('maxlength');
		}
	});
///
}( jQuery ));