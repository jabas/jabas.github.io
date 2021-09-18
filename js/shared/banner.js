(function() {
	// dom elements
	var video = document.getElementById('videoLoop');
	var source = document.getElementById('mp4Video');
	var logoAnimation = document.getElementById('logoIn');
	var headingEl = document.getElementById('bannerHeading');
	var moveEl = document.getElementById('bannerMove');
	var connectEl = document.getElementById('bannerConnect');
	var liveEl = document.getElementById('bannerLive');
	var workEl = document.getElementById('bannerWork');
	var ctaEl = document.getElementById('bannerCta');
	var scrollBtn = document.getElementById('bannerScroll');

	// future dynamic vars	
	var vh = window.innerHeight * 0.01,
		isLandscape = window.innerWidth >= window.innerHeight;

	//set height based on browser chrome
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	// switch out video if landscape page
	if (isLandscape) {
		video.classList.add('banner-landscape');
		source.setAttribute('src', '/images/prospect/lt-banner-landscape.mp4');
		video.load();
	}
	
	// force video to play on touch if suspended
	function forceVidPlay() {
		video.play();
	}

	video.addEventListener('suspend', () => {
		document.body.addEventListener('click', forceVidPlay, { once: true });
		document.body.addEventListener('touchstart', forceVidPlay, { once: true });
	});
 
 	// animation triggers
 	function triggerTextAnim() {
		var time = video.currentTime;
		
		if ( time >= 7.04 && !headingEl.classList.contains('head-animate-in') ) {
			headingEl.classList.add('head-animate-in');
		} else if ( time >= 8.29 && !moveEl.classList.contains('span-animate-in') ) {
			moveEl.classList.add('span-animate-in');
		} else if ( time >= 12.39 && !connectEl.classList.contains('span-animate-in') ) {
			connectEl.classList.add('span-animate-in');
		} else if (time >= 16.40 && !liveEl.classList.contains('span-animate-in') ) {
			liveEl.classList.add('span-animate-in');
		} else if (time >= 20.36 && !workEl.classList.contains('span-animate-in') ) {
			workEl.classList.add('span-animate-in');
		} 
	}

    video.addEventListener('play', () => {
    	logoAnimation.beginElement();
    }, { once: true });
    
    video.addEventListener('timeupdate', triggerTextAnim);
	
	video.addEventListener('ended', () => {
		headingEl.classList.add('head-animate-grow');
		ctaEl.classList.add('banner-cta-animate');
		video.removeEventListener('timeupdate', triggerTextAnim);
		video.currentTime = 7.0;
		video.play();
	});

	// scroll away button

	function SmoothVerticalScrolling(e, time, where) {
    var eTop = e.getBoundingClientRect().top;
    var eAmt = eTop / 100;
    var curTime = 0;
    while (curTime <= time) {
        window.setTimeout(SVS_B, curTime, eAmt, where);
        curTime += time / 100;
    }
}

function SVS_B(eAmt, where) {
    if(where == "center" || where == "")
        window.scrollBy(0, eAmt / 2);
    if (where == "top")
        window.scrollBy(0, eAmt);
}

	scrollBtn.addEventListener('click', () => {
		var el = document.getElementById('businessUnits');
	    SmoothVerticalScrolling(el, 275, "top");
	});
})();