(function ( $ ) {
///
	$('#addNavbar').click(function(){
		$(this).prop('disabled', true);
		var newNav = '<nav class="navbar navbar-light" data-navbar-overflow="#navAdded"><div class="navbar-brand">Second</div><ul id="navAdded" class="nav nav-neutral"><li class="nav-item"><a href="#" class="nav-link">Overview</a></li><li class="nav-item"><a href="#" class="nav-link active">Link One</a></li><li class="nav-item"><a href="#" class="nav-link">Link Two</a></li><li class="nav-item"><a href="#" class="nav-link">Longer Link Three</a></li><li class="nav-item"><a href="#" class="nav-link">Many Links</a></li><li class="nav-item"><a href="#" class="nav-link">Many Links</a></li><li class="nav-item"><a href="#" class="nav-link">Many Links</a></li><li class="nav-item"><a href="#" class="nav-link">Many Links</a></li><li class="nav-item"><a href="#" class="nav-link">Many Links</a></li></ul></nav>';
		$('#addNavTarget').html(newNav);
	});
///
}( jQuery ));
