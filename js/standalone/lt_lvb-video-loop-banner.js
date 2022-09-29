(function() {
	// dom elements
	var banner = document.getElementById('lvbBanner');
	var video = document.getElementById('lvbVideo');
	var source = document.getElementById('mp4Video');
	var vidBtn = document.getElementById('lbvBtn');

	// Show video until is loaded
	video.addEventListener('loadeddata', function() {
		video.style.zIndex = '0';
		vidBtn.style.zIndex = '6';
	 }, false);

	// future dynamic vars	
	var isLandscape = window.innerWidth >= window.innerHeight;

	// switch out video if landscape page
	if (isLandscape) {
		banner.classList.add('lt_lvb-landscape');
		video.setAttribute('poster', video.dataset.landscapePoster);
		source.setAttribute('src', source.dataset.landscapeSrc);
	}
	video.load();
	
	// force video to play on touch if suspended
	function forceVidPlay() {
		video.play();
	}

	video.addEventListener('suspend', () => {
		if (video.currentTime === 0) {
			document.body.addEventListener('click', forceVidPlay, { once: true });
	 		document.body.addEventListener('touchstart', forceVidPlay, { once: true });
		}
	});
 
	video.addEventListener('play', () => {
		vidBtn.classList.add('lt_lvb-vid-playing');
	});

	video.addEventListener('pause', () => {
		vidBtn.classList.remove('lt_lvb-vid-playing');
	});


	vidBtn.addEventListener('click', function(e){
		e.stopPropagation();
		
		if (vidBtn.classList.contains('lt_lvb-vid-playing')) {
			video.pause();
		} else {
			video.play();
		}
	})
})();