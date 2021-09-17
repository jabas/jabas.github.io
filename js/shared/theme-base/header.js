(function($) {
///
	var body = $('body');
	var mobileOpen = false;

	// keyboard focus loops
	var fLoopStart; // object - the first focuable item inside a looped dropdown/collpase
	var fLoopEnd; // object - the last focusable item inside a looped dropdown/collapse
	var fLoopTrigger; // object - the trigger that opened the loop
	var fLoopIncludeTrigger; // boolean whether to include the trigger as part of the loop
	var fLoopActive = false; 

	function findFocus(el){
		return el.find('a[href], input:not([disabled]), select:not([disabled]), button:not([disabled])').filter(':visible');
	}

	function handleTab(e) {
		if (e.keyCode === 9) {
			
			var current = $(document.activeElement);
			var next = false;

			if (e.shiftKey) {
				// backwards
				if (current.is(fLoopTrigger)) {
					next = fLoopEnd;
				} else if (current.is(fLoopStart)) {
					next = fLoopIncludeTrigger ? fLoopTrigger : fLoopEnd;
				}
			} else {
				// forwards
				if (current.is(fLoopTrigger)) {
					next = fLoopStart;
				} else if (current.is(fLoopEnd)) {
					next = fLoopIncludeTrigger ? fLoopTrigger : fLoopStart;
				}
			}

			if (next) {
				e.preventDefault();
				next.focus();
			}
		}
	}

	function assignFocusLoop(start, end, trigger, include) {
		fLoopStart = start;
		fLoopEnd = end;
		fLoopTrigger = trigger;
		fLoopIncludeTrigger = include;
	}

	function activateFocusLoop() {
		body.on('keydown', handleTab);
		fLoopActive = true;
	}

	function deactivateFocusLoop() {
		body.off('keydown', handleTab);
		fLoopActive = false;
	}

	function isDesktop() {
		var bp = lthelp.getBreakpoint();
		return bp === 'lg' || bp === 'xl';
	}

	body.on('click', '[data-toggle="headernav"]', function(e){
		e.preventDefault();
		var trigger = $(this);
		var navpanel = $( trigger.data('target') );

		$('body').toggleClass('header-nav-open-body');
		trigger.toggleClass('navbar-toggler-open');
		navpanel.addClass('header-nav-animating').toggleClass('header-nav-open');

		mobileOpen = !mobileOpen;
		trigger.attr('aria-expanded', mobileOpen);

		if (mobileOpen) {
			var toplinks = $('.header-nav .nav-link:visible');
			assignFocusLoop(toplinks.first(), toplinks.last(), trigger, true);
			navpanel.attr('tabindex', "-1").focus();
			activateFocusLoop();

			if ($('.header-collapse.in').length > 0) {
				$('.header-collapse.in').collapse('hide');
			}
		} else {
			deactivateFocusLoop();
		}
	});

	body.on('transitionend MSTransitionEnd webkitTransitionEnd', '.header-nav-animating', function() {
		$(this).removeClass('header-nav-animating');
	});

	function activateFocusLoop() {
		body.on('keydown', handleTab);
		fLoopActive = true;
	}

	function deactivateFocusLoop() {
		body.off('keydown', handleTab);
		fLoopActive = false;
	}

	body.on('show.bs.dropdown', '.header-nav .dropdown', function(e){
		if (!isDesktop()) {
			var mainNav = $('.header-nav');
			$(this).find('.dropdown-menu').css('top', mainNav.scrollTop()).attr('tabindex', "-1").focus();
			mainNav.css('overflow', 'hidden');
			fLoopStart = $(this).find('.header-dropdown-back');
			fLoopEnd = $(this).find('.dropdown-item').last();
		}
	});

	body.on('hide.bs.dropdown', '.header-nav .dropdown', function(e){
		var subNav = $(this).find('.dropdown-menu');
		if (!isDesktop()) {
			var toplinks = $('.header-nav .nav-link:visible');
			fLoopStart = toplinks.first();
			fLoopEnd = toplinks.last();
		}
		setTimeout(function(){
			subNav.css('top', '');
			$('.header-nav').css('overflow', '');
		}, 200);
	});

	body.on('click', '.header-dropdown-back', function(e){
		body.trigger('click'); // closes open dropdowns
	});

	body.on('show.bs.dropdown', '.header-utility-dropdown', function(e){
		var dropdown = $(this);
		var trigger = $(e.relatedTarget);
		var triggers = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');
		var offset = trigger.offset();
		var trW = trigger.outerWidth();
		var hdW = $('.header').outerWidth(true);
		
		// locations on the trigger for matching up dropdown
		var trC = parseInt(hdW - offset.left - (trW/2));
		var trR = parseInt(hdW - offset.left - trW);

		// current bp
		var bp = lthelp.getBreakpoint();

		dropdown.find('.dropdown-arrow').css('right', trC + 'px');

		if (!(bp === 'xs' || bp === 'sm')) { // dropdown goes full width at these bps
			dropdown.find('.dropdown-menu').css('right', trR + 'px');
		}

		if (isDesktop()) { // dropdown placed relative to utility bar at these bps
			var top = $('.header-primary').offset().top;
			dropdown.css('top', top + 'px');
		}

		triggers.parent().addClass('open');
		triggers.attr('aria-expanded', true);
	});

	body.on('shown.bs.dropdown', '.header-utility-dropdown', function(e){
		var dropdown = $(this);
		var trigger = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]').filter(':visible');
		dropdown.attr('tabindex', "-1").focus();
		// focus loop 
		var focusable = findFocus(dropdown);
		assignFocusLoop(focusable.first(), focusable.last(), trigger, true);
		activateFocusLoop();
	});

	body.on('hidden.bs.dropdown', '.header-utility-dropdown', function(e){
		var dropdown = $(this);
		var triggers = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');
		triggers.attr('aria-expanded', false);
		triggers.parent().removeClass('open');
		dropdown.css('top', '');
		dropdown.find('.dropdown-arrow').css('right', '');
		dropdown.find('.dropdown-menu').css('right', '');
		if ($.contains(this, document.activeElement)) {
			triggers.filter(':visible').focus();
		}
		deactivateFocusLoop();
	});

	body.on('keydown', function(e){
		if (e.which === 27) {
			if ($('.header-collapse.in').length > 0 ) {
				$('.header-collapse.in').collapse('hide');
			}

			if (mobileOpen) {
				var trigger = $('[data-toggle="headernav"]').first();
				var active = $(document.activeElement);
	
				 if (!active.hasClass('dropdown-item') && $.contains($(trigger.data('target'))[0], active[0])) {
				 	trigger.trigger('click').focus();
				 }
			}
		}
		
	});

	body.on('mousedown touchstart', function(e) {
		if (fLoopActive) {
			deactivateFocusLoop();
		}
	});

	body.on('show.bs.collapse', '.header-collapse', function(e){
		var triggers = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');
		triggers.addClass('header-collapse-open');
		body.addClass('header-collapse-open-body');

		if (mobileOpen) {
			$('[data-toggle="headernav"]').first().trigger('click');
		}

		if(!isDesktop()) {
			var content = $(this).find('.header-collapse-content');
			content.css('padding-bottom', (content.height() - ($(window).height() - $('.header-mobile-bar').height())) + 'px');
		}
	});

	body.on('shown.bs.collapse', '.header-collapse', function(e){
		var collapse = $(this);
		var trigger = $('[href="#' + this.id + '"]:visible,[data-target="#' + this.id + '"]:visible').not('#' + this.id +' [data-toggle="collapse"]');
		collapse.attr('tabindex', "-1").focus();
		// focus loop 
		var focusable = findFocus(collapse);
		assignFocusLoop(focusable.first(), focusable.last(), trigger, true);
		activateFocusLoop();
	});

	body.on('hide.bs.collapse', '.header-collapse', function(e){
		var triggers = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');
		triggers.removeClass('header-collapse-open');
		if (!mobileOpen) {
			deactivateFocusLoop();
		}
	});

	body.on('hidden.bs.collapse', '.header-collapse', function(e){
		body.removeClass('header-collapse-open-body');
		$(this).find('.header-collapse-content').css('padding-bottom','');
	});

	body.on('show.bs.dropdown', '.header', function(e){
		$('.header-collapse.in').collapse('hide');
	});

	$(window).on('resize', function(){
		if (mobileOpen && isDesktop()) {
			$('[data-toggle="headernav"]').first().trigger('click');
			$('.header-nav-animating').removeClass('header-nav-animating');
		}
	});
///
})(jQuery);
