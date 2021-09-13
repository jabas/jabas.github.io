(function() {
	//adjustable 100vh to account for mobile chrome
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	// window.addEventListener('resize', () => {
	// 	let vh = window.innerHeight * 0.01;
	// 	document.documentElement.style.setProperty('--vh', `${vh}px`);
	// });
	// var video = document.getElementById("bannerVideo");
	// if (video) {
	// 	video.addEventListener('ended', function(){
	// 		video.currentTime = 2.8;
	// 		video.play();
	// 	});
	// }
})();