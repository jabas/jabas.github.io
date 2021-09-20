(function() {
	let ordinal;
	const mosaic = document.querySelector('.mosaic');

	function openMosaic(event) {
		event.preventDefault();
		ordinal = this.getAttribute('data-frame');
		var videoId = this.getAttribute('data-video-id');
		var target = document.querySelector('.frame-' + ordinal);
		mosaic.classList.add('selected-' + ordinal, 'selection-active');
		target.classList.add('frame-selected');

		switch (ordinal) {
			case 'northwest':
				// nw has no play change
				document.getElementById('nAnimHide').beginElement();
				document.getElementById('swAnimHide').beginElement();
				document.getElementById('sAnimHide').beginElement();
				document.getElementById('seAnimHide').beginElement();
				break;
			case 'north':
				document.getElementById('nAnimPlay').beginElement();
				document.getElementById('nwAnimHide').beginElement();
				document.getElementById('swAnimHide').beginElement();
				document.getElementById('sAnimHide').beginElement();
				document.getElementById('seAnimHide').beginElement();
				break;
			case 'center':
				// center has no play or hide change
				document.getElementById('nwAnimHide').beginElement();
				document.getElementById('nAnimHide').beginElement();
				document.getElementById('swAnimHide').beginElement();
				document.getElementById('sAnimHide').beginElement();
				document.getElementById('seAnimHide').beginElement();
				break;
			case 'southeast':
				document.getElementById('seAnimPlay').beginElement();
				document.getElementById('nwAnimHide').beginElement();
				document.getElementById('nAnimHide').beginElement();
				document.getElementById('swAnimHide').beginElement();
				document.getElementById('sAnimHide').beginElement();
				break;
			case 'south':
				document.getElementById('sAnimPlay').beginElement();
				document.getElementById('nwAnimHide').beginElement();
				document.getElementById('nAnimHide').beginElement();
				document.getElementById('swAnimHide').beginElement();
				document.getElementById('seAnimHide').beginElement();
				break;
			case 'southwest':
				// sw has no play state
				document.getElementById('nwAnimHide').beginElement();
				document.getElementById('nAnimHide').beginElement();
				document.getElementById('sAnimHide').beginElement();
				document.getElementById('seAnimHide').beginElement();
				break;
		}
		addBackdrop();
	}

	function closeMosaic() {
		var current = document.querySelector('.frame-selected');
		current.style.zIndex = 1050;
		current.classList.remove('frame-selected');
		for (let i = 0; i < mosaic.classList.length; i++) {
			let className = mosaic.classList[i];
			if (className.startsWith('selected-')) {
				mosaic.classList.remove(className);
			}
		}
		
		switch (ordinal) {
			case 'northwest':
				// nw has no play change
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
			case 'north':
				document.getElementById('nAnimPlayReturn').beginElement();
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
			case 'center':
				// center has no play or hide change
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
			case 'southeast':
				document.getElementById('seAnimPlayReturn').beginElement();
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				break;
			case 'south':
				document.getElementById('sAnimPlayReturn').beginElement();
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('swAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
			case 'southwest':
				// sw has no play state
				document.getElementById('nwAnimHideReturn').beginElement();
				document.getElementById('nAnimHideReturn').beginElement();
				document.getElementById('sAnimHideReturn').beginElement();
				document.getElementById('seAnimHideReturn').beginElement();
				break;
		}

		mosaic.classList.remove('selection-active');
		removeBackdrop(current);
	}

	function addBackdrop() {
		// body.appendChild(modalBg);
		// modalBg.offsetHeight; // force repaint
		// modalBg.classList.add('show');
	}

	function removeBackdrop(current) {
		// modalBg.classList.remove('show');
		// setTimeout(function(){
		// 	body.removeChild(modalBg);
		// 	current.style.zIndex = null;
		// }, 1000);
	}

	var anchors = document.querySelectorAll('.bubble-anchor');

	for (let i = 0; i < anchors.length; i++) {
		anchors[i].addEventListener('click', openMosaic);
	}

	var body = document.querySelector('body');
	var modalBg = document.createElement('div');
	var closeBtn = document.getElementById("mosaicClose");
	modalBg.classList.add('modal-backdrop', 'fade');
	modalBg.addEventListener('click', closeMosaic);
	closeBtn.addEventListener('click', closeMosaic);
})();