// Tooltips

(function ( $ ) {
$.fn.myltTooltip = function(){
	return this.each(function(){
		var toggle = $(this);
		var data = toggle.data();
		var preventDefault = data.preventDefault;
		var tooltip;
		var template = (data.modalTooltip === 'true' || data.modalTooltip === true ) ? '<div class="tooltip tooltip-modal" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' : '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';

		// apply Bootstrap tooltip method with specific options
		toggle.tooltip({ 
			html: true,
			template: template,
			constraints: [{to: $('body')[0], attachment: 'together', pin: true }]
		});

		// controls option to add prevent default
		toggle.on('click', function(e){
			if( preventDefault === 'true' || preventDefault === true ) {
				e.preventDefault();
			}
		});

		// control placement of arrow to allow to remain attached to toggle
		toggle.on('shown.bs.tooltip', function() {
			tooltip = $(data['bs.tooltip'].tip);
			// only move for placement above or below
			if(typeof data.placement === 'undefined' || data.placement === 'top' || data.placement === 'bottom' ) {
				var arrow = tooltip.find('.tooltip-arrow');
				var toggleCenter = toggle.offset().left + (toggle.outerWidth(true) / 2);
				var toolLeft = tooltip.offset().left;
				var toolCenter = toolLeft + (tooltip.outerWidth(true) / 2);

				if(Math.abs(toggleCenter - toolCenter) > 1 ) { 
					arrow.css('left', (toggleCenter - toolLeft) + 'px');
				}else{
					arrow.attr('style', '');
				}
			}
		});
	});
};

$(document).ready(function(){
	$('[data-toggle="tooltip"]').myltTooltip();
});

}( jQuery ));




// Toggletips

(function ( $ ) {
$.fn.myltToggletip = function() {
	return this.each(function() {
		var
			toggletipText = this,
			container = toggletipText.parentNode, // Define the container
			bubbleContainer = $(toggletipText).closest('.toggletip').length ? $(toggletipText).closest('.toggletip')[0] : container, // Find block-level ancestor with .toggletip class to use when parent is an inline element (otherwise same as container)
			toggletipBtn = document.createElement('button'), // Create the button element
			btnLabel = toggletipText.getAttribute('data-btn-label'),
			message = toggletipText.textContent,
			liveRegion = document.createElement('span'), // Create the live region
			positionTop = true,
			debouncedCloseToggletip;
		
		bubbleContainer.classList.add('toggletip');
		toggletipBtn.className = 'toggletip-btn';
		toggletipBtn.setAttribute('type', 'button');
		toggletipBtn.setAttribute('aria-label', btnLabel);
		toggletipBtn.setAttribute('data-toggletip-content', message);
		toggletipBtn.innerHTML = toggletipText.getAttribute('data-char') || 'i';

		// Place the button element in the container
		container.insertBefore(toggletipBtn, toggletipText);

		// Set attributes on the live region and place it in the container
		liveRegion.className = 'toggletip-bubble';
		liveRegion.setAttribute('role', 'status');
		liveRegion.setAttribute('aria-live', 'assertive');
		container.appendChild(liveRegion);

		// Top or bottom bubble placement
		if (toggletipText.getAttribute('data-position') === 'bottom') positionTop = false; // Default (or data-position="top") is top
		container.removeChild(toggletipText); // Remove the original element

		// Create the arrow
		var arrow = document.createElement('span');
		arrow.className = 'tooltip-arrow';		

		// Position toggletip
		function moveToggletip(elem) {
			// Reset transform
			liveRegion.setAttribute('style', 'transform: translate(0,0);');
			liveRegion.classList.remove('arrow-b');
			liveRegion.classList.remove('arrow-t');
			
			// Dimensions & positions: button, viewport, live region, and arrow
			var
				btnBounds = elem.getBoundingClientRect(),
				btnH = elem.offsetHeight,
				btnWHalf = elem.offsetWidth/2,
				winH = window.innerHeight,
				winW = window.innerWidth,
				docH = document.documentElement.clientHeight,
				docW = document.documentElement.clientWidth,
				bubbleInner = liveRegion.firstChild,
				bubbleBounds = bubbleInner.getBoundingClientRect(),
				bubbleH = bubbleInner.offsetHeight,
				bubbleWHalf = bubbleInner.offsetWidth/2,
				bubbleT = Math.round(bubbleBounds.top),
				arrowH = arrow.offsetHeight,
				arrowWHalf = arrow.offsetWidth/2,
				arrowOffset = elem.offsetLeft + btnWHalf - arrowWHalf,
				transArrowH,
				transH,
				transform;

			// Calculate horizontal transforms
			if (btnBounds.left - bubbleWHalf >= 0 && btnBounds.right + bubbleWHalf <= (winW || docW)) {
				transH = (elem.offsetLeft + btnWHalf) - bubbleWHalf;
			} else if (btnBounds.left - bubbleWHalf <= 0) {
				transH = 0;
			} else if (btnBounds.right + bubbleWHalf >= (winW || docW)) {
				// The container is relatively positioned
				transH = (container.offsetWidth + container.offsetLeft) - Math.round(bubbleBounds.right);
			}
			transArrowH = elem.offsetLeft - transH + btnWHalf - arrowWHalf;

			// If set to top and top is in view or if set to bottom, but would be cropped
			if (positionTop && btnBounds.top - bubbleH >= 0 || !positionTop && Math.round(bubbleBounds.bottom) >= (winH || docH)) {
				transform = btnBounds.top - bubbleT - bubbleH - arrowH;
				liveRegion.setAttribute('style', 'transform: translate('+ transH +'px, '+ transform +'px);');
				liveRegion.classList.add('arrow-b');
				// Position the arrow
				arrow.setAttribute('style', 'transform: translate('+ transArrowH +'px, '+ bubbleH +'px);');
			// If set to bottom and bottom is in view or if set to top, but would be cropped
			} else if (!positionTop && btnBounds.bottom <= (winH || docH) || positionTop && btnBounds.top - bubbleH <= 0) {
				transform = btnBounds.bottom - bubbleT + arrowH;
				liveRegion.setAttribute('style', 'transform: translate('+ transH +'px, '+ transform +'px);');
				liveRegion.classList.add('arrow-t');
				// Position the arrow
				arrow.setAttribute('style', 'transform: translate('+ transArrowH +'px, -'+ arrowH +'px);');
			}
		};

		// Toggle the message
		toggletipBtn.addEventListener('click', function() {
			liveRegion.innerHTML = '<span class="toggletip-bubble-inner">'+ message +'</span>';
			// Place the arrow in the live region
			liveRegion.appendChild(arrow);
			// Position the toggletip
			moveToggletip(toggletipBtn);
		});

		// Close function
		function closeToggletip() {
			liveRegion.innerHTML = '';
			liveRegion.setAttribute('style', 'transform: translateY(0);');
		};

		// Close on outside click
		document.addEventListener('click', function(e) {
			if (toggletipBtn !== e.target) {
				closeToggletip();
			}
		});

		// Close on losing focus
		toggletipBtn.addEventListener('blur', function() {
			closeToggletip();
		});

		// Close on screen resize
		$(document).ready(function() {
			debouncedCloseToggletip = lthelp.debounce(closeToggletip, 1000, true);
			window.addEventListener('resize', debouncedCloseToggletip);
		});

		// Remove toggletip on ESC
		toggletipBtn.addEventListener('keydown', function(e) {
			if ((e.keyCode || e.which) === 27) {
				closeToggletip();
			}
		});

	});
};

$(document).ready(function(){
	$('[data-toggletip]').myltToggletip();
});

}( jQuery ));
