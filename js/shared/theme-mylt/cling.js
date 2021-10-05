(function( $ ) {
	
	$.fn.cling = function() {
		return this.each(function(){
			var windowElem = $(window);
			
			// cling elements
			var cling = $(this);
			cling.wrap('<div class="cling-wrap"></div>');
			var clingWrap = cling.parent();
			var clingModal = $(cling.find('[data-toggle="modal"]').data('target'));
			var clingInputs = cling.find('input[data-target]');

			// scroll variables
			var scrollTop;
			var clingThreshold;
			var isStuck = false;

			// color values
			var colorInline = cling.css('background-color');
			var colorFixed = typeof(cling.data('colorFixed')) === 'string' ? cling.data('colorFixed') : false;

			// exitTarget
			var exitStr = cling.data('clingExit');
			var exitTarget = typeof(exitStr) === 'string' ? $(exitStr) : false;
			var exitThreshold = exitTarget ? exitTarget.offset().top - windowElem.outerHeight() : false;
			var isExited = false;

			// layer previous jumbotron or billboard
			var isLayered = cling.hasClass('cling-layered');
			var prevElem = isLayered ? clingWrap.prev() : false;
			var prevType = 'none';
			if (isLayered) {
				if (prevElem.hasClass('jumbotron')){
					prevType = 'jumbotron';
				} else if (prevElem.hasClass('billboard')) {
					prevType = 'billboard';
				} else {
					prevType = 'other';
				}
			}

			function watchCling() {
				scrollTop = windowElem.scrollTop();

				if ( scrollTop > clingThreshold && !isStuck ) {
					isStuck = true;
					cling.addClass('cling-stuck');

					if (colorFixed) {
						cling.css('background-color', colorFixed);
					}

				} else if ( scrollTop <= clingThreshold && isStuck ) {
					isStuck = false;
					cling.removeClass('cling-stuck');

					if (colorFixed) {
						cling.css('background-color', colorInline);
					}
				}

				if (exitTarget) {
					if ( scrollTop >= exitThreshold && !isExited ) {
						isExited = true;
						cling.addClass('cling-exit');
					} else if ( scrollTop < exitThreshold && isExited ) {
						isExited = false;
						cling.removeClass('cling-exit');
					}
				}

			}

			function setCling() {
				var hgt = cling.outerHeight();
				
				if (exitTarget) {
					exitThreshold = exitTarget.offset().top - windowElem.outerHeight();
				}

				if (isLayered) {
					clingWrap.css('margin-top', '-' + hgt + 'px');

					switch(prevType) {
						case 'billboard':
							prevElem.css('padding-bottom', hgt);
							break;
						case 'jumbotron':
							prevElem.find('.jumbotron-content').css('padding-bottom', hgt);
							break;
						case 'other':
							prevElem.css('padding-bottom', hgt);
							break;
						default:
							break;
					}
				}

				clingWrap.css('height', hgt );
				clingThreshold = clingWrap.offset().top;
				watchCling();
			}

			function matchInputs(slave, master) {
				if (master.length > 0 && slave.length > 0 && slave.val() !== master.val() ) {
					slave.val(master.val());
					slave.trigger('change');
				}
			}

			// init variables
			setCling();

			// watch scroll position and toggle stickiness
			windowElem.scroll(watchCling);
			windowElem.on('focus load', setCling);

			// events within the input fields
			// open modal on enter press
			clingInputs.on('keydown', function(e){
				if ( e.which == 13 ) {
					e.preventDefault();
					var trigger = cling.find('[data-toggle="modal"]');
					trigger.focus();
					trigger[0].click();
				}
			});

			// fixes ios fixed position bug
			clingInputs.on('touchstart', function(){
				if (isStuck) {
					cling.css({
						'position':'absolute',
						'top': scrollTop
					});
				}
			});

			// reset on blur if fixed position bugfix is in action
			clingInputs.on('blur', function(){
				cling.css({
					'position':'',
					'top': ''
				});
			});

			// reset on screen resize
			var lazyResize = lthelp.debounce(setCling, 100);
			window.addEventListener('resize', lazyResize);

			clingModal.on('show.bs.modal', function() {
				if (lthelp.checkScrollbar() && cling.hasClass('cling-stuck')) {
					var scrollwidth = lthelp.getScrollbarWidth();
					cling.css('right', scrollwidth + 'px');
				}
				clingInputs.each(function(){
					var master = $(this);
					var slave = $(master.data('target'));
					matchInputs(slave, master);
				});
			});

			clingModal.on('hide.bs.modal', function() {
				clingInputs.each(function(){
					var slave = $(this);
					var master = $(slave.data('target'));
					matchInputs(slave, master);
				});
			});

			clingModal.on('hidden.bs.modal', function() {
				cling.css('right', '');
			});

		});
	};

	$(document).ready( function() {
		// https://youtu.be/guqVgQFvXXY
		$('.cling').cling();
	});

})( jQuery );
