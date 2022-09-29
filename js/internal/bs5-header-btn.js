(function() {

	const btn = document.getElementById('tmTestBtn');
	const header = document.createElement('header');
	header.setAttribute('id', 'ltTMHeader');
	btn.addEventListener('click', function (event) {
		document.body.prepend(header);
	});
	
})();