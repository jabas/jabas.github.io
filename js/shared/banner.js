(function() {
	var video = document.getElementById("bannerVideo");
	if (video) {
		video.addEventListener('ended', function(){
			video.currentTime = 2.8;
			video.play();
		});
	}
})();