(function() {

	const dropdownElementList = [].slice.call(document.querySelectorAll('.lt-header .dropdown .dropdown-toggle'));
	const dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
		return new bootstrap.Dropdown(dropdownToggleEl, {
			popperConfig: function (defaultBsPopperConfig) {
				let newPopperConfig = defaultBsPopperConfig;
				if (defaultBsPopperConfig.placement === 'bottom-start') {
					newPopperConfig.placement = 'bottom';
				}
				return newPopperConfig
			}
		});
	});
	
})();