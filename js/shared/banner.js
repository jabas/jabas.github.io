(function() {
	//adjustable 100vh to account for mobile chrome
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	// window.addEventListener('resize', () => {
	// 	let vh = window.innerHeight * 0.01;
	// 	document.documentElement.style.setProperty('--vh', `${vh}px`);
	// });
	var video = document.getElementById('videoLoop');
	var source = document.getElementById('mp4Video');
	var logoAnimation = document.getElementById('logoIn');
	var isLandscape = window.innerWidth >= window.innerHeight;

	if (isLandscape) {
		video.classList.add('banner-landscape');
		source.setAttribute('src', '/images/prospect/lt-banner-landscape.mp4');
		video.load();
	}

	function forceVidPlay() {
		video.play();
	}

	function triggerTextAnim() {
		console.log(video.currentTime);
	}

	video.addEventListener('suspend', () => {
		document.body.addEventListener('click', forceVidPlay, { once: true });
		document.body.addEventListener('touchstart', forceVidPlay, { once: true });
	});
    
    video.addEventListener('play', () => {
    	logoAnimation.beginElement();
    }, { once: true });
    
    video.addEventListener('timeupdate', triggerTextAnim);
	
	video.addEventListener('ended', () => {
		video.removeEventListener('timeupdate', triggerTextAnim);
		video.currentTime = 7.0;
		video.play();
	});
})();