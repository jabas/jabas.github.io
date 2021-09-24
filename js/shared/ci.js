(function() {
	let ordinal;
	const anchors = document.querySelectorAll('.bubble-anchor');
	const mosaic = document.querySelector('.mosaic');
	const heading = document.querySelector('.ci-leadin');
	const modalBg = document.createElement('div');
	const closeBtn = document.getElementById("mosaicClose");
	const bubbleMobile = document.querySelector('.bubble-stack');
	const mobileAnim = document.getElementById("mobileBubbles");
	const desktopAnim = document.getElementById("desktopBubbles");
	const mobileAnimStarted = false;
	const desktopAnimStarted = false;

	var headingAnimOpts = {
		root: null,  // use the viewport
		rootMargin: '-80px',
		threshold: 0.02
	}

	function openMosaic(event) {
		event.preventDefault();
		ordinal = this.getAttribute('data-frame');
		const target = document.querySelector('.frame-' + ordinal);
		const vidWrap = document.querySelector('.video-' + ordinal);
		const vidPlayer = document.querySelector('.video-' + ordinal + ' video');
		mosaic.classList.add('selected-' + ordinal, 'selection-active');
		target.classList.add('frame-selected');

		if (this.hasAttribute('data-is-mobile')) {
			vidWrap.classList.add('video-active');
			vidPlayer.play();
			vidPlayer.addEventListener('ended', closeMosaic);
			addBackdrop('body');
		} else {
			target.addEventListener('transitionend', () => {
				vidWrap.classList.add('video-active');
				vidPlayer.play();
				vidPlayer.addEventListener('ended', closeMosaic);
			}, {once: true});

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
			addBackdrop('mosaic');
		}
		
	}

	function closeMosaic() {
		var currentFrame = document.querySelector('.frame-selected');
		var currentVidWrap = document.querySelector('.video-active');
		var currentVid = document.querySelector('.video-' + ordinal + ' video');
		currentFrame.style.zIndex = 1050;
		currentFrame.classList.remove('frame-selected');
		currentVidWrap.classList.remove('video-active');
		currentVid.pause();
		currentVid.removeEventListener('ended', closeMosaic);
		mosaic.classList.remove('selected-' + ordinal, 'selection-active');
		
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
		removeBackdrop();
	}

	function addBackdrop(location) {
		if (location === 'body') {
			document.body.appendChild(modalBg);
		} else {
			mosaic.appendChild(modalBg);
		}
		modalBg.offsetHeight; // force repaint
		modalBg.classList.add('show');
	}

	function removeBackdrop() {
		modalBg.classList.remove('show');
		setTimeout(function(){
			modalBg.parentElement.removeChild(modalBg);
		}, 1000);
	}

	function headingAnimation(entries, observer) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('ci-leadin-animate-in');
				if (window.getComputedStyle(bubbleMobile).display  === 'none' && !desktopAnimStarted) {
					desktopAnim.beginElement();
					desktopAnimStarted = true;
				} else if (!mobileAnimStarted) {
					mobileAnim.beginElement();
					mobileAnimStarted = true;
				}
			}
		});
	}

	var headingAnimationObserver = new IntersectionObserver(headingAnimation, headingAnimOpts);
	headingAnimationObserver.observe(heading);


	for (let i = 0; i < anchors.length; i++) {
		anchors[i].addEventListener('click', openMosaic);
	}

	modalBg.classList.add('modal-backdrop', 'fade');
	modalBg.addEventListener('click', closeMosaic);
	closeBtn.addEventListener('click', closeMosaic);
})();