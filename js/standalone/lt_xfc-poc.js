(function () {
//

	function fetchHTML(src, target) {
		fetch(src).then(function (response) {
			return response.text();
		}).then(function (html) {
			const regex = new RegExp('/content/dam/', 'g');
			html = html.replace(regex, 'https://www.lifetime.life/content/dam/');
			target.innerHTML = html;
		}).catch(function (err) {
			console.warn('Error fetching HTML from XF: ', err);
		});
	}

	document.querySelectorAll('[data-lt-xf-content]').forEach(node => { 
		fetchHTML(node.dataset.ltXfContent, node);
	});
//
}( ));