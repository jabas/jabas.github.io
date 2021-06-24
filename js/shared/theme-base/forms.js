(function ( $ ) {
///
$.fn.focusLabel = function() {
	return this.each(function() {
		var input = $(this);
		var label = $('label[for="' + input.attr('id') + '"]');
		var onClass = 'has-focus';
		var showClass = 'has-value';

		input.bind('checkval change click keyup input paste',function() {
			if (input.val() !== '') {
				label.addClass(showClass);
			} else {
				label.removeClass(showClass);
			}
		}).on('focus',function() {
			label.addClass(onClass);
		}).on('blur',function() {
			label.removeClass(onClass);
		}).trigger('checkval');
	});
};

jQuery.expr[':'].insensitiveContains = function(a, i, m) {
	return jQuery(a).text().toUpperCase()
		.indexOf(m[3].toUpperCase()) >= 0;
};

$.fn.multiselect = function() {
	return this.each(function() {
		var multiselect = $(this);
		var toggle = multiselect.find('.multiselect-btn');
		var dropdown = multiselect.find('.multiselect-wrap');

		// Add base ARIA attributes
		toggle.attr('aria-expanded', 'false');
		dropdown.attr('aria-hidden', 'true');

		toggle.on('click', function(e) {
			e.preventDefault();
			// Switch ARIA attributes
			if (toggle.attr('aria-expanded') === 'true') {
				toggle.attr('aria-expanded', 'false');
				dropdown.attr('aria-hidden', 'true');
			} else {
				toggle.attr('aria-expanded', 'true');
				dropdown.attr('aria-hidden', 'false');
			}

			// Toggle visibility
			toggle.toggleClass('is-active');
			dropdown.slideToggle('fast');
			
		});
		
		function closeMultiselect() {
			// Switch ARIA attributes
			toggle.attr('aria-expanded', 'false');
			dropdown.attr('aria-hidden', 'true');
			// Hide dropdown
			toggle.removeClass('is-active');
			dropdown.hide();
		}

		// Close dropdown when clicking outside
		$(document).mouseup(function(e) {
			if (!multiselect.is(e.target) && multiselect.has(e.target).length === 0) {
				closeMultiselect();
			}
		});

		// Close dropdown on 'esc' keypress
		multiselect.keyup(function(e) {
			if (e.which === 27) {
				closeMultiselect();
				toggle.focus();
			}
		});
	});
};



// Typeahead Multiselect

$.fn.typeaheadMultiselect = function() {
	return this.each(function() {
		var
			typeaheadMultiselect = $(this),
			multiPanel = typeaheadMultiselect.find('.multi-panel'),
			toggle = typeaheadMultiselect.find('.multi-btn'),
			input = typeaheadMultiselect.find('.multi-input'),
			clearButton = typeaheadMultiselect.find('.form-input-clear'),
			dropdown = typeaheadMultiselect.find('.multiselect-wrap'),
			checkboxes = dropdown.find('.c-checkbox-sm input'),
			liveArea = typeaheadMultiselect.find('.live-area'),
			subheadings = typeaheadMultiselect.find('.multiselect-subheading');

		// Add base ARIA attributes
		toggle.attr('aria-expanded', 'false');
		dropdown.attr('aria-hidden', 'true');
		
		// Clicking anywhere in multiPanel expands the dropdown
		multiPanel.on('click', function(e) {
			openTypeaheadMultiselect();
			e.preventDefault();
		});

		// If toggle button is clicked, collapse dropdown (expand is handled by click on entire multiPanel)
		toggle.on('click', function(e) {
			if (typeaheadMultiselect.hasClass('is-active')) {
				closeTypeaheadMultiselect();
				typeaheadMultiselect.focus();
				e.stopPropagation(); // Don't fire click on multiPanel
			}
		});
		
		// Remove "faux focus" from options when the toggle button is focused (since hitting return/enter will then close the typeahead multiselect)
		toggle.on('focus', function(e) {
			checkboxes.removeClass('has-focus');
		});
		
		// When input changes, filter options
		input.on('input change', function(e) {
			var
				searchText = input.val().toLowerCase(),
				inputMatches = (searchText.length === 0) ? dropdown.find('.c-checkbox-sm') : dropdown.find('.c-checkbox-sm:insensitiveContains("'+searchText+'")');

			// Future enhancement: Highlight matched text (see https://markjs.io/)
			inputMatches.removeClass('hidden-xs-up');
			dropdown.find('.c-checkbox-sm').not(inputMatches).addClass('hidden-xs-up').find('input').removeClass('has-focus');
			
			dropdown.find('.multiselect-subheading').each(function() {
				if ($(this).nextUntil('.multiselect-subheading','.c-checkbox-sm').not('.hidden-xs-up').length < 1) {
					$(this).addClass('hidden-xs-up');
				} else {
					$(this).removeClass('hidden-xs-up');
				}
			});

			// "No results found" message
			if (searchText.length > 0 && inputMatches.length === 0) {
				if (typeaheadMultiselect.find('.no-results').length === 0) {
					typeaheadMultiselect.find('.multiselect-group').append('<div class="no-results">No results found</div>');
				}
			} else {
				typeaheadMultiselect.find('.no-results').remove();
			}

			liveArea.text('Filtered to ' + inputMatches.length + ' option' + ((inputMatches.length !== 1) ? 's' : '') + ', ' + inputMatches.find('input:checked').length + ' selected. Use up and down arrow keys to focus options and return or enter to select them.');
		});

		// Handle clicks on dropdown options
		dropdown.on('click', function(e) {
			// Set .has-focus on clicked option, so if user switches to keyboard arrowing continues from there
			if ($(e.target).is(checkboxes)) {
				checkboxes.removeClass('has-focus');
				$(e.target).addClass('has-focus');
			}
			e.stopImmediatePropagation(); // Stop click from bubbling up to parent elements
		});

		// Close typeahead multiselect when it loses focus
		typeaheadMultiselect.focusout(function(e) {
			if (!typeaheadMultiselect.is($(e.relatedTarget).closest('.typeahead-multiselect'))) {
				closeTypeaheadMultiselect();
			}
		});
		
		// Keyboard events
		typeaheadMultiselect.keydown(function(e) {
			switch(e.which) {
				
				// If focus is on the parent typeaheadMultiselect and the dropdown isn't already expanded, pressing space or return/enter expands the dropdown
				// Otherwise, pressing return/enter (or space if not on another control) toggles the option that has the "faux focus"
				case 32: // Space
				case 13: // Enter
					if ($(e.target).is(typeaheadMultiselect) && !typeaheadMultiselect.hasClass('is-active')) {
						openTypeaheadMultiselect();
						e.preventDefault();
					} else if (($(e.target).is(input) && e.which === 13) || !($(e.target).is(input) || $(e.target).is(toggle) || $(e.target).is(clearButton))) {
						toggleFocusedOption();
						e.preventDefault();
					}
					break;
				
				// Pressing escape collapses dropdown and puts focus back on the parent typeaheadMultiselect
				case 27: // Esc
					closeTypeaheadMultiselect();
					typeaheadMultiselect.focus();
					e.preventDefault();
					break;
				
				// If focus is on the parent typeaheadMultiselect, pressing the up or down arrow expands the dropdown. Otherwise they change the "faux focus" in the options list.
				case 38: // Up
				case 40: // Down
					if (!typeaheadMultiselect.hasClass('is-active')) {
						openTypeaheadMultiselect();
					} else {
						e.which === 38 ? arrowPressed('up') : arrowPressed('down');
					}
					e.preventDefault();
					break;
					
				default:
					if (
						typeaheadMultiselect.hasClass('is-active') // Dropdown is expanded
						&& !$(e.target).is(input) // Input isn't focused already
						&& e.which !== 9 // Ignore Tab
						&& e.which !== 16 // Ignore Shift
						&& e.which !== 17 // Ignore Ctrl
						&& e.which !== 18 // Ignore Alt
						&& e.which !== 19 // Ignore Pause/Break
						&& e.which !== 20 // Ignore Caps Lock
						&& e.which !== 35 // Ignore End
						&& e.which !== 36 // Ignore Home
						&& e.which !== 91 // Ignore Command (Safari/Chrome)
						&& e.which !== 93 // Ignore Command (Safari/Chrome)
						&& e.which !== 224 // Ignore Command (Firefox)
					) {
						input.focus();
					} else {
						return;
					}
			}
		});
		
		function toggleFocusedOption() {
			var
				focusedElement = checkboxes.filter('.has-focus'),
				focusedElementParent = focusedElement.closest('.c-checkbox-sm'),
				focusedElementSubheadingText = focusedElementParent.prevAll('.multiselect-subheading').text();
			focusedElement.click();
			liveArea.text($.trim(focusedElementParent.text()) + ', ' + (focusedElementSubheadingText ? focusedElementSubheadingText + ', ' : '') + (focusedElement.prop('checked') ? 'checked' : 'unchecked'));
		}
			
		function arrowPressed(upOrDown) {
			var
				focusableCheckboxes = checkboxes.filter(':visible:enabled'),
				focusableLength = focusableCheckboxes.length,
				focusedElement = checkboxes.filter('.has-focus').first(),
				focusedIndex = focusableCheckboxes.index(focusedElement),
				focusedElementParent,
				focusedElementSubheadingText,
				scrollArea;

			checkboxes.removeClass('has-focus');

			if (focusableLength > 0) {
				upOrDown === 'up' ? focusedIndex-- : focusedIndex++;
				if (focusedIndex < 0) {
					focusedIndex = focusableLength - 1;
				} else if (focusedIndex >= focusableLength) {
					focusedIndex = 0;
				}
				
				focusedElement = focusableCheckboxes.eq(focusedIndex);
				focusedElement.addClass('has-focus');
				focusedElementParent = focusedElement.closest('.c-checkbox-sm');
				focusedElementSubheadingText = focusedElementParent.prevAll('.multiselect-subheading').text();
				
				// Set scrollTop to keep faux-focused option in view
				scrollArea = focusedElement.closest('.multiselect-group');
				
				scrollArea.stop().animate({
					scrollTop: scrollArea.scrollTop() + focusedElementParent.position().top
				}, 200);
				
				liveArea.text($.trim(focusedElementParent.text()) + ', ' + (focusedElementSubheadingText ? focusedElementSubheadingText + ', ' : '') + (focusedElement.prop('checked') ? 'checked' : 'unchecked'));
			}
		}
			
		function openTypeaheadMultiselect() {
			if (!typeaheadMultiselect.hasClass('is-active') && !typeaheadMultiselect.hasClass('disabled')) {
				
				// Switch ARIA attributes
				typeaheadMultiselect.attr('aria-expanded', 'true');
				dropdown.attr('aria-hidden', 'false');

				// Add .sr-only text to the toggle button (only when expanded, since otherwise Chrome reads it when the typeahead multiselect is focused)
				toggle.append('<span class="sr-only">Hide Options</span>');
				
				// Expand dropdown
				typeaheadMultiselect.toggleClass('is-active', true);
				dropdown.collapse('show');
				
				// Show input
				input.show();
				
				// Make things tabbable
				input.attr('tabindex', 0);
				clearButton.attr('tabindex', 0);
				toggle.attr('tabindex', 0);
			}
		}
				
		function closeTypeaheadMultiselect() {
			if (typeaheadMultiselect.hasClass('is-active')) {
	
				// Switch ARIA attributes
				typeaheadMultiselect.attr('aria-expanded', 'false');
				dropdown.attr('aria-hidden', 'true');
				
				// Remove the .sr-only text from the toggle button (since otherwise Chrome reads it when the typeahead multiselect is focused)
				toggle.empty();
				
				// Collapse dropdown
				typeaheadMultiselect.removeClass('is-active');
				dropdown.collapse('hide');
				
				// Clear and hide input
				input.hide();
				input.val('').trigger('change');
				clearButton.removeClass('has-value');
				
				// Make things un-tabbable
				input.attr('tabindex', -1);
				clearButton.attr('tabindex', -1);
				toggle.attr('tabindex', -1);
			}
		}
		
	});
};

$.fn.clearInput = function() {
	return this.each(function() {
		var clearButton = $(this);
		var input = $(clearButton.data('target'));
		var showClass = 'has-value';

		input.bind('checkval change click keyup input paste',function() {
			if (input.val() !== '') {
				clearButton.addClass(showClass);
			} else {
				clearButton.removeClass(showClass);
			}
		}).trigger('checkval');

		clearButton.on('click', function(e) {
			e.preventDefault();
			input.val('').focus().trigger('change');
			clearButton.removeClass(showClass);
		});
	});
};

$.fn.charCount = function() {
	return this.each(function() {
		var input = $(this); // Input
		var el = $(input.data('charcount')); // Element selected via data-charcount
		var content = typeof input.data('chartext') !== 'string' ? '$rem characters remaining' : input.data('chartext');
		var contentSR = $('<span class="sr-only" role="status" aria-live="polite" aria-atomic="true"></span>'); // Create element for screen readers
		var max = input.attr('maxlength');
		var rem = max - input.val().length;
		var rSpan; // Object of span that holds current character count

		// Timer to update count for screen readers — this isn't tied to the other content area because that updates
		// with each character and would be really annoying for screen reader users to hear the count immediately after
		// each character. This allows the update to be read only after a longer pause.
		var typeTimer;
		var doneTypingInterval = 2000;  // 2 seconds

		if (!isNaN(rem) && el.length > 0) {
			content = content.replace('$rem', '<span class="mylt-remain"></span>').replace('$max', max);
			el.html(content);
			rSpan = el.find('.mylt-remain');
			el.append(contentSR); // Add the screen reader content

			input.bind('checkval change click keyup input paste',function() {
				rem = max - input.val().length;
				rSpan.text(rem);

				if (rem <= 25) {
					rSpan.addClass('text-danger');
				} else {
					rSpan.removeClass('text-danger');
				}

				// Start timer on pause
				clearTimeout(typeTimer);
				typeTimer = setTimeout(doneTyping, doneTypingInterval);

				// Update text for screen reader users
				function doneTyping() {
					contentSR.html(rem + ' of ' + max + ' characters remaining'); // Update the counter for screen readers
				}
			}).trigger('checkval');

			// Reset timer on key press
			input.bind('keydown',function() {
				clearTimeout(typeTimer);
			});
		}
	});
};

$(document).ready(function() {
	$('form :input').focusLabel();
	$('.multiselect').multiselect();
	$('.typeahead-multiselect').typeaheadMultiselect();
	$('.form-input-clear').clearInput();
	$('[data-charcount]').charCount();
});

///
}( jQuery ));