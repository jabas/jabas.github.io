/*
 * For tables that leverage the responsive horizontal scroll pattern
 * it’s necessary to add tabindex="0" when they overflow the container
 * so that the scrolling can be done via keyboard. Helper text is also
 * appended to the caption to help indicate to a user that scrolling is
 * necessary to view all of the content.
 *
 * Based on the work of Heydon Pickering https://inclusive-components.design/data-tables/
*/

(function($) {

	$.fn.responsiveTable = function() {
		return this.each(function() {

			var winWidth = $(window).width(),
				tableWrap = $('.table-responsive'),
				captionHelp = ' <span class="js-scrollHelp d-block small">(scroll for more)</span>';

			// Determine if the table is wider than its wrapper table
			detectOverflow();

			var debounceCount = lthelp.debounce(function() {
			  detectOverflow();
			}, 100);

			window.addEventListener('resize', debounceCount);

			function detectOverflow() {

				tableWrap.each(function() {
					var wrap = $(this),
							resTable = wrap.find('table'),
							caption = wrap.find('caption'),
							help = caption.find('.js-scrollHelp');

					if (resTable.width() > wrap.width()) {
						// Add tabindex so that the table can be focusable and scrolled via keyboard
						wrap.attr('tabindex', 0);

						if (help.length == 0) {
							// Add the helper text only if it doesn’t already exist
							caption.append(captionHelp);
						}

					} else {
						// Remove tabindex
						wrap.attr('tabindex', null);
						// Remove helper text
						help.remove();
					}
				});
			}

		});
	};

	$(document).ready(function(){
		if ($('.table-responsive').length > 0) {
			$('.table-responsive').responsiveTable();
		}
	});

})(jQuery);
