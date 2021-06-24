var lthelp = {};

// https://davidwalsh.name/javascript-debounce-function
lthelp.debounce = function (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

lthelp.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results === null){
		return null;
	} else {
		return decodeURI(results[1]) || 0;
	}
};

lthelp.checkScrollbar = function () {
	return document.body.clientWidth < window.innerWidth;
};

lthelp.getScrollbarWidth = function () {
	var scrollDiv = document.createElement('div');
	scrollDiv.className = 'modal-scrollbar-measure';
	document.body.appendChild(scrollDiv);
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	return scrollbarWidth;
};

lthelp.getBreakpoint = function () {
	 return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

lthelp.scrollTo = function (target, offset, speed) {
	// target = unique selector for item scrolled to, jquery element or 'top' to scroll to top
	// offset = offset scroll point relative to target top
	// speed = speed to move to point

	var pos = 0; // position of target

	if (typeof target === 'string' && target.charAt(0) === '#' && target !== '#') {
		history.pushState({}, '', target);
	} else {
		history.pushState({}, '', window.location.pathname + window.location.search);
	}

	if (target === 'top') {
		target = $('body');
	} else if (typeof target === 'string') {
		target = $(target);
	}
	
	pos = target.offset().top + offset;

	$('html, body').animate({ scrollTop: pos }, speed, function(){
		// ensure that keyboard focus moves to target
		target.focus();
		if (target.is(":focus")) {
			return false;
		} else {
			target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
			target.focus(); // Set focus again
		};
	});

};
