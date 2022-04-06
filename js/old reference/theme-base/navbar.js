(function($) {
///
	$.fn.navbarOverflow = function() {
		return this.each(function(){
			var navbar = $(this);
			var nav = $(navbar.data('navbarOverflow'));
			var overflow;
			var overDrop;
			var overList;
			var overflowWidths = []; // for calculation of "can the first item fit?"
			
			function evalRemainingSpace() {
				var last = nav.find('.nav-item:visible').last();
				if (last.length > 0) {
					return navbar.innerWidth() - (last.offset().left + last.outerWidth());
				} else {
					return 0;
				}
			}

			function removeItems() {
				var oddman = nav.children('li:eq(-2)');
				overflowWidths.unshift(oddman.outerWidth(true));
				oddman.prependTo(overList);
				oddman.removeClass('nav-item');
				oddman.find('.nav-link').removeClass('nav-link').addClass('dropdown-item');
				overflow.removeClass('hidden-xs-up');

				// continue until spacing is available
				if (evalRemainingSpace() < 0) {
					removeItems();
				}
			}

			function returnItem() {
				var oddman = overList.find('li:eq(0)');
				oddman.addClass('nav-item');
				oddman.find('.dropdown-item').removeClass('dropdown-item').addClass('nav-link');
				overflowWidths.shift();
				oddman.insertBefore(overflow);			
			}

			function returnItems() {
				returnItem();

				if (overflowWidths.length === 0) {
					overflow.addClass('hidden-xs-up');
				} else {
					while(evalRemainingSpace() > overflowWidths[0]) {
						evalItemPlacement();
					}
				}
			}

			function evalItemPlacement() {	
				var remaining = evalRemainingSpace();

				if (remaining < 0) {
					removeItems();
				} else if( (remaining > overflowWidths[0]) || (overflowWidths.length === 1 && remaining + overflow.outerWidth(true) > overflowWidths[0]) ) {
					returnItems();
				}
			}

			function addOverflow() {
				overflow = $('<li class="nav-item dropdown hidden-xs-up"></li>');
				overflow.append('<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More<span class="sr-only"> Menu Items</span></a><div class="dropdown-arrow"></div>');
				overDrop = $('<div class="dropdown-menu dropdown-menu-right"></div>');
				overList = $('<ul class="list-unstyled"></ul>');
				overDrop.append(overList);
				overflow.append(overDrop);
				nav.append(overflow);
			}

			function emptyOverflow() {
				var mlength = overList.find('li').length;
				// make sure there's something in the overflow
				if(mlength > 0) {
					overflow.addClass('hidden-xs-up');
					for(var i=0; i < mlength; i++) {
						returnItem();
					}
				}
			}

			if(nav.length > 0 && !navbar.data('isNavbarOverflow')) {
				navbar.data('isNavbarOverflow',true);
				addOverflow();
				evalItemPlacement();
				navbar.addClass('navbar-overflow'); // change overflow after initalized

				var debounceMore = lthelp.debounce(function() {
					// if navbar changes to collpased state, undo everything
					if(navbar.css('display') !== 'flex') {
						emptyOverflow();
					}else{
						evalItemPlacement();
					}
				}, 100);

				$(window).on('resize', debounceMore);

				// force redraw of header on window focus
				// fixes WEB-11521
				$(window).on('focus', function(){
					setTimeout(function(){
						if(navbar.css('display') === 'flex') {
							evalItemPlacement();
						}
					}, 500);
				});
			}

		});
	};

	$(document).ready(function(){
		if ($('[data-navbar-overflow]').length > 0) {
			$('[data-navbar-overflow]').navbarOverflow();
		}

		// attach overflow behavior listener - tied to unique animation event when inserted into DOM - see _navbar.scss
		$('body').on('animationstart MSAnimationStart webkitAnimationStart', function(e){
			if (e.animationName == "navbarInserted" || e.originalEvent.animationName == "navbarInserted") {
				$('[data-navbar-overflow]').navbarOverflow();
			}
		});

	});

///
})(jQuery);