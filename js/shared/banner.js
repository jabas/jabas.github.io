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

	if (window.innerWidth >= window.innerHeight) {
		source.setAttribute('src', '/images/prospect/lt-banner-landscape.mp4');
		video.load();
	}
	document.body.addEventListener('click touchstart', () => {
		console.log(event);
		video.play();
	}, { once: true });
	video.addEventListener('suspend', () => {
		document.body.addEventListener('click ontouchstart', () => {
			video.play();
		}, { once: true });
	});
    video.addEventListener('play', () => {
    	logoAnimation.beginElement();
    }, { once: true });
	video.addEventListener('ended', () => {
		video.currentTime = 7.0;
		video.play();
	});
})();