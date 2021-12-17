(function() {
	const mobileNav = document.getElementById('headerNav');
	const mobileNavToggle = document.getElementById('navToggle');

	mobileNav.addEventListener('show.bs.offcanvas', function (event) {
		mobileNavToggle.classList.add('navbar-toggler-open');
	});

	mobileNav.addEventListener('hide.bs.offcanvas', function (event) {
		mobileNavToggle.classList.remove('navbar-toggler-open');
	});
})();