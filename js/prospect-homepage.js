(function( $ ) {
	
	$.fn.cling = function() {
		return this.each(function(){
			var windowElem = $(window);
			
			// cling elements
			var cling = $(this);
			cling.wrap('<div class="cling-wrap"></div>');
			var clingWrap = cling.parent();
			var clingModal = $(cling.find('[data-toggle="modal"]').data('target'));
			var clingInputs = cling.find('input[data-target]');

			// scroll variables
			var scrollTop;
			var clingThreshold;
			var isStuck = false;

			// color values
			var colorInline = cling.css('background-color');
			var colorFixed = typeof(cling.data('colorFixed')) === 'string' ? cling.data('colorFixed') : false;

			// exitTarget
			var exitStr = cling.data('clingExit');
			var exitTarget = typeof(exitStr) === 'string' ? $(exitStr) : false;
			var exitThreshold = exitTarget ? exitTarget.offset().top - windowElem.outerHeight() : false;
			var isExited = false;

			// layer previous jumbotron or billboard
			var isLayered = cling.hasClass('cling-layered');
			var prevElem = isLayered ? clingWrap.prev() : false;
			var prevType = 'none';
			if (isLayered) {
				if (prevElem.hasClass('jumbotron')){
					prevType = 'jumbotron';
				} else if (prevElem.hasClass('billboard')) {
					prevType = 'billboard';
				} else {
					prevType = 'other';
				}
			}

			function watchCling() {
				scrollTop = windowElem.scrollTop();

				if ( scrollTop > clingThreshold && !isStuck ) {
					isStuck = true;
					cling.addClass('cling-stuck');

					if (colorFixed) {
						cling.css('background-color', colorFixed);
					}

				} else if ( scrollTop <= clingThreshold && isStuck ) {
					isStuck = false;
					cling.removeClass('cling-stuck');

					if (colorFixed) {
						cling.css('background-color', colorInline);
					}
				}

				if (exitTarget) {
					if ( scrollTop >= exitThreshold && !isExited ) {
						isExited = true;
						cling.addClass('cling-exit');
					} else if ( scrollTop < exitThreshold && isExited ) {
						isExited = false;
						cling.removeClass('cling-exit');
					}
				}

			}

			function setCling() {
				var hgt = cling.outerHeight();
				
				if (exitTarget) {
					exitThreshold = exitTarget.offset().top - windowElem.outerHeight();
				}

				if (isLayered) {
					clingWrap.css('margin-top', '-' + hgt + 'px');

					switch(prevType) {
						case 'billboard':
							prevElem.css('padding-bottom', hgt);
							break;
						case 'jumbotron':
							prevElem.find('.jumbotron-content').css('padding-bottom', hgt);
							break;
						case 'other':
							prevElem.css('padding-bottom', hgt);
							break;
						default:
							break;
					}
				}

				clingWrap.css('height', hgt );
				clingThreshold = clingWrap.offset().top;
				watchCling();
			}

			function matchInputs(slave, master) {
				if (master.length > 0 && slave.length > 0 && slave.val() !== master.val() ) {
					slave.val(master.val());
					slave.trigger('change');
				}
			}

			// init variables
			setCling();

			// watch scroll position and toggle stickiness
			windowElem.scroll(watchCling);
			windowElem.on('focus load', setCling);

			// events within the input fields
			// open modal on enter press
			clingInputs.on('keydown', function(e){
				if ( e.which == 13 ) {
					e.preventDefault();
					var trigger = cling.find('[data-toggle="modal"]');
					trigger.focus();
					trigger[0].click();
				}
			});

			// fixes ios fixed position bug
			clingInputs.on('touchstart', function(){
				if (isStuck) {
					cling.css({
						'position':'absolute',
						'top': scrollTop
					});
				}
			});

			// reset on blur if fixed position bugfix is in action
			clingInputs.on('blur', function(){
				cling.css({
					'position':'',
					'top': ''
				});
			});

			// reset on screen resize
			var lazyResize = lthelp.debounce(setCling, 100);
			window.addEventListener('resize', lazyResize);

			clingModal.on('show.bs.modal', function() {
				if (lthelp.checkScrollbar() && cling.hasClass('cling-stuck')) {
					var scrollwidth = lthelp.getScrollbarWidth();
					cling.css('right', scrollwidth + 'px');
				}
				clingInputs.each(function(){
					var master = $(this);
					var slave = $(master.data('target'));
					matchInputs(slave, master);
				});
			});

			clingModal.on('hide.bs.modal', function() {
				clingInputs.each(function(){
					var slave = $(this);
					var master = $(slave.data('target'));
					matchInputs(slave, master);
				});
			});

			clingModal.on('hidden.bs.modal', function() {
				cling.css('right', '');
			});

		});
	};

	$(document).ready( function() {
		// https://youtu.be/guqVgQFvXXY
		$('.cling').cling();
	});

})( jQuery );

(function ( $ ) {
///
$.fn.videolbox = function() {
	return this.each(function(){
		var trigger = $(this);
		var data = trigger.data();
		var modal; // modal jquery object
		var video; // video dom element

		function createModal() {
			modal = $('<div class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"/>');
			var titleHTML = typeof data.videoTitle !== 'string' ? '' : '<h5 class="modal-title">' + data.videoTitle + '</h5>';
			var modalInner = '<div class="modal-dialog modal-lightbox">';
				modalInner += '<div class="modal-content">';
				modalInner += '<div class="modal-header">';
				modalInner += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
				modalInner += titleHTML;
				modalInner += '</div>'; // .END modal-header
				modalInner += '<div class="modal-body"><div class="embed-responsive embed-responsive-16by9"></div></div>';
				modalInner += '</div></div>'; // END .modal-content & .modal-dialog
			modal.html(modalInner);
			modal.appendTo($('body'));
			modal.modal();

			trigger.on('click', function(e) {
				modal.modal('show');
				playVideo();
			});
		}

		function createVideo() {
			// dynamically build the player video element
			var videoHTML = '<video id="vid' + data.videoId + '" data-video-id="' + data.videoId + '" data-account="' + data.account + '" data-player="' + data.player + '" data-embed="default" class="embed-responsive-item video-js" controls />';
			// inject the player code into the DOM
			modal.find('.embed-responsive').html(videoHTML);
			bc('vid' + data.videoId);
			videojs('vid' + data.videoId).ready(function(){
				video = this;
				video.on('fullscreenchange', function() {
					if (!video.isFullscreen() && isMobile()) {
						video.pause();
					}
				});
				playVideo();

				// transcript
				video.on("loadstart", function(){
					var responseEdited = '';
					var chosenTrack = video.mediainfo.textTracks.filter(function(track) { return track.kind === 'captions' || track.kind === 'subtitles'; });
					
					if (chosenTrack.length > 0) { // file available for transcript
						var url = chosenTrack[0].src;
						var colonLocation = url.indexOf(':');
						url =  url.substr(colonLocation + 1);

						getFile(url, function(response) {
							if (response) {
								responseEdited = response.replace('WEBVTT','');
								responseEdited = responseEdited.replace('X-TIMESTAMP-MAP=LOCAL:','');
								// older format
								responseEdited = responseEdited.replace(/\d\d:\d\d:\d\d.\d\d\d.*/gi,'');
								// newer format
								responseEdited = responseEdited.replace(/\d\d:\d\d\.\d\d\d\s+-->\s+\d\d:\d\d\.\d\d\d.*\n/gi,'');
							}
						});

						var btnWrap = $('<div class="small p-y-sm text-xs-right" />');
						var btn = $('<a href="#" role="button" class="link-reversed">Download Transcript</a>');

						btn.click(function(){
							download(responseEdited, "transcript.txt", "text/plain");
						});

						btn.appendTo(btnWrap);
						btnWrap.insertAfter(modal.find('.embed-responsive'));
					}
				});
			});

			modal.on('hidden.bs.modal', function() {
				video.pause();
			});
		}

		function playVideo() {
			if(!video.ended()) {
				video.play().then(function(){
					if (isMobile()) {
						video.requestFullscreen();
					}
				});
			}
		}

		function isMobile() {
			var size = lthelp.getBreakpoint();
			return size === 'xs' || size === 'sm';
		}

		createModal();
		createVideo();
	});
};

function getFile(url, callback) {
	var httpRequest = new XMLHttpRequest();
	var response;
	// response handler
	getResponse = function() {
		try {
			if (httpRequest.readyState === 4) {
				if (httpRequest.status === 200) {
					response = httpRequest.responseText;
					if (response === "{null}") {
						response = null;
					}
					callback(response);
				} else {
					callback(null);
				}
			}
		} catch (e) {
			callback(null);
		}
	};
	httpRequest.onreadystatechange = getResponse;
	httpRequest.open("GET", url);
	httpRequest.send(); 
}

$(document).ready(function(){
	$('body').on('click', '[data-toggle="video"]', function(e){
		e.preventDefault();

		var trigger = $(this);
		var data = trigger.data();

		if (!data.videolbox) {
			trigger.videolbox();
			trigger.data('videolbox', true);
		}
	});
});

///
}( jQuery ));

(function( $ ) {

	$('body').on('animationstart MSAnimationStart webkitAnimationStart', function(e){
		if (e.animationName == "videoInserted" || e.originalEvent.animationName == "videoInserted") {
			$('.video-js').each(function(){
				var el = $(this);
				var id = el.attr('id');

				if (!el.data('isVideoTranscript')) {
					videoTranscript(id);
				}
				el.data('isVideoTranscript', true);
			});
		}
	});

	function videoTranscript(id) {
		videojs(id).ready(function(){
			var video = this;

			video.on("loadstart", function(){
				var responseEdited = '';
				var chosenTrack = video.mediainfo.textTracks.filter(function(track) { return track.kind === 'captions' || track.kind === 'subtitles'; });
				
				if (chosenTrack.length > 0) { // file available for transcript
					var url = chosenTrack[0].src;
					var colonLocation = url.indexOf(':');
					url =  url.substr(colonLocation + 1);

					getFile(url, function(response) {
						if (response) {
							responseEdited = response.replace('WEBVTT','');
							responseEdited = responseEdited.replace('X-TIMESTAMP-MAP=LOCAL:','');
							// older format
							responseEdited = responseEdited.replace(/\d\d:\d\d:\d\d.\d\d\d.*/gi,'');
							// newer format
							responseEdited = responseEdited.replace(/\d\d:\d\d\.\d\d\d\s+-->\s+\d\d:\d\d\.\d\d\d.*\n/gi,'');
						}
					});

					var downloadBtn = document.createElement("button");
					downloadBtn.innerHTML = "Transcript";
					downloadBtn.id = "downloadButton" + id;

					var spacer = video.controlBar.customControlSpacer.el();
					spacer.setAttribute("style", "justify-content: flex-end;");
					spacer.appendChild(downloadBtn);
					downloadBtn.addEventListener("click", function() {
						download(responseEdited, "transcript.txt", "text/plain");
					});
				}
			});
		});
	}

	function getFile(url, callback) {
		var httpRequest = new XMLHttpRequest();
		var response;
		// response handler
		getResponse = function() {
			try {
				if (httpRequest.readyState === 4) {
					if (httpRequest.status === 200) {
						response = httpRequest.responseText;
						if (response === "{null}") {
							response = null;
						}
						callback(response);
					} else {
						callback(null);
					}
				}
			} catch (e) {
				callback(null);
			}
		};
		httpRequest.onreadystatechange = getResponse;
		httpRequest.open("GET", url);
		httpRequest.send(); 
	}
})( jQuery );
(function ( $ ) {
///
$('body').on('click', '[data-anchor-button]', function(e){
	e.preventDefault();
});

$('body').on('keydown', '[data-anchor-button]', function(e){
	if (e.which === 32) {
		e.preventDefault();
		$(this).trigger('click');
	}
});
///
}( jQuery ));
(function ( $ ) {
///
$.fn.bcSwipe = function(settings) {
	var isTouchDevice = !!(('ontouchstart' in window) || window.navigator && window.navigator.msPointerEnabled && window.MSGesture || window.DocumentTouch && document instanceof window.DocumentTouch);
	var config = { threshold: 50 };
	
	if(settings) {
		$.extend(config, settings);
	}

	this.each(function() {
		var stillMoving = false;
		var start;

		function onTouchMove(e) {
			if(stillMoving) {
				var x = e.touches[0].pageX;
				var difference = start - x;
				if(Math.abs(difference) >= config.threshold) {
					this.removeEventListener('touchmove', onTouchMove);
					start = null;
					stillMoving = false;
					if(difference > 0) {
						$(this).carousel('next');
					} else{
						$(this).carousel('prev');
					}
				}
			}
		}

		function onTouchStart(e) {
			if(e.touches.length === 1) {
				start = e.touches[0].pageX;
				stillMoving = true;
				this.addEventListener('touchmove', onTouchMove, false);
			}
		}

		if(isTouchDevice && !$(this).data('isSwipe')) {
			$(this).data('isSwipe',true);
			this.addEventListener('touchstart', onTouchStart, false);
		}
	});

	return this;
};
///
}( jQuery ));
(function ( $ ) {
///
	$('.carousel').bcSwipe();

	$('body').on('slide.bs.carousel', '.carousel-dash', function(e) {
		// DOM elements
		var carousel = $(this);
		var detached = !carousel.find('.carousel-dash-panel').length > 0; // boolean
		var dash = detached ? $('.carousel-dash-panel[data-target="#' + carousel.attr('id') + '"]') : carousel.find('.carousel-dash-panel');
		var indicators = dash.find('.carousel-indicators li');
		var prev = dash.find('[data-slide="prev"]');
		var next = dash.find('[data-slide="next"]');
		// maths
		var l = indicators.length; // length of indicators
		var n = $(e.relatedTarget).index(); // index of next slide

		if (carousel.data('wrap') === false) {
			if (n === 0) {
				prev.addClass('disabled');
			} else {
				prev.removeClass('disabled');
			}

			if (n === l - 1) {
				next.addClass('disabled');
			} else {
				next.removeClass('disabled');
			}
		}

		if (detached) { // active state doesn't work when indicators are outside carousel 
			indicators.removeClass('active');
			indicators.eq(n).addClass('active');
		}

		if (l >= 6) { // this logic only matters if there are 6 or more slides
			indicators.removeClass('indicate-far indicate-near indicate-here');
			
			// first three indicators
			if (n <= 2) {
				indicators.slice(0,3).addClass('indicate-here');
			} else if (n === 3 || (n > 3 && l === 6)) {
				indicators.eq(1).addClass('indicate-near');
				indicators.slice(2,4).addClass('indicate-here');
			} else if (n >= l - 2) {
				indicators.eq(-5).addClass('indicate-far');
				indicators.eq(-4).addClass('indicate-near');
				indicators.eq(-3).addClass('indicate-here');
			} else {
				indicators.eq(n-2).addClass('indicate-far');
				indicators.eq(n-1).addClass('indicate-near');
				indicators.eq(n).addClass('indicate-here');
			}

			// last two indicators
			if (n === l - 4 || (n <= 2 && l===6)) {
				indicators.eq(-3).addClass('indicate-here');
				indicators.eq(-2).addClass('indicate-near');
			} else if (n <= 2) {
				indicators.eq(3).addClass('indicate-near');
				indicators.eq(4).addClass('indicate-far');
			} else if (n >= l - 3) {
				indicators.slice(-2).addClass('indicate-here');
			} else {
				indicators.eq(n+2).addClass('indicate-far');
				indicators.eq(n+1).addClass('indicate-near');
			}
		}
	});

	$.fn.cardCarousel = function() {
		return this.each(function(){
			var carousel = $(this);
			var slideWrap = carousel.find('.carousel-inner');
			var dash = carousel.find('.carousel-dash-panel');
			var prevBtn = dash.find('[data-slide="prev"]');
			var nextBtn = dash.find('[data-slide="next"]');
			var indicatorWrap = dash.find('.carousel-indicators');
			var bp = lthelp.getBreakpoint();

			function cardsPerSlide() {
				var p = 1; // cards per slide, default at xs = 1
				if (bp === 'sm' || bp === 'md') {
					p = 2;
				} else if (bp === 'lg' || bp === 'xl') {
					p = 3;
				}
				return p;
			}

			// watch for DOM changes to slide count
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					countSlides();
				});    
			});

			function countSlides() {
				var p = cardsPerSlide();
				var cards = slideWrap.find('.card').detach();
				var slideCount = Math.ceil(cards.length/p);
				var slides = $();
				var indicators = $();

				observer.disconnect();
				slideWrap.empty();
				indicatorWrap.empty();

				for (var i=0; i < slideCount; i++) {
					var slide = i === 0 ? $('<div class="carousel-item active"/>') : $('<div class="carousel-item"/>');
					var indicator = i === 0 ? $('<li class="active"/>') : $('<li/>');
					var set = p === 1 ? cards.eq(i) : cards.slice(i*p,(i+1)*p);
					set.appendTo(slide);
					slides = slides.add(slide);
					indicators = indicators.add(indicator);
				}

				slides.appendTo(slideWrap);
				indicators.appendTo(indicatorWrap);

				if (carousel.data('wrap') === false) {
					prevBtn.addClass('disabled');
					nextBtn.removeClass('disabled');
				}

				if (slideCount === 1) {
					dash.addClass('hidden-xs-up');
				} else {
					dash.removeClass('hidden-xs-up');
				}

				observer.observe(slideWrap[0], {childList: true});
			}

			if(!carousel.data('isCardCarousel')) {
				carousel.data('isCardCarousel', true);

				observer.observe(slideWrap[0], {childList: true}); // turn on observer

				if (bp !== 'xs') {
					countSlides();
				}

				var debounceCount = lthelp.debounce(function() {
					var nbp = lthelp.getBreakpoint();
					if (nbp !== bp) {
						bp = nbp;
						countSlides();
					}
				}, 100);

				$(window).on('resize', debounceCount);
			}


		});
	};

	$(document).ready(function(){
		if ($('.carousel-card').length > 0) {
			$('.carousel-card').cardCarousel();
		}

		// attach overflow behavior listener - tied to unique animation event when inserted into DOM - see _navbar.scss
		$('body').on('animationstart MSAnimationStart webkitAnimationStart', function(e){
			if (e.animationName == "cardCarouselInserted" || e.originalEvent.animationName == "cardCarouselInserted") {
				$('.carousel-card').bcSwipe().cardCarousel();
			}
		});
	});
///
}( jQuery ));
(function ( $ ) {
///
	function labelSwap(id, labeltype) {
		// TO DO : look at data on collapse elem when using shown/hidden.bs.collase events
		var triggers = $('[data-toggle="collapse"]').filter('[href="#' + id + '"],[data-target="#' + id + '"]');
		triggers.each(function(){
			var trigger = $(this);
			var label = trigger.data(labeltype);

			if(typeof labeltype === 'string') {
				trigger.html(label);
			}
		});
	}

	$('body').on('show.bs.collapse', '.collapse', function(e){
		if (e.currentTarget.id === e.target.id) {
			labelSwap(e.target.id, 'labelExpanded');
		}
	});

	$('body').on('hide.bs.collapse', '.collapse', function(e){
		if (e.currentTarget.id === e.target.id) {
			labelSwap(e.target.id, 'labelCollapsed');
		}
	});
///
}( jQuery ));
//download.js v4.21, by dandavis; 2008-2018. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compatible way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.download = factory();
  }
}(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}else{//not data url, is it a string with special needs?
			if(/([\x80-\xff])/.test(payload)){			  
				var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
				for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
			 	payload=new myBlob([tempUiArr], {type: mimeType});
			}		  
		}
		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			indexDecoder = strUrl.indexOf("charset")>0 ? 3: 2,
			decoder= parts[indexDecoder] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
 				anchor.addEventListener('click', function(e) {
 					e.stopPropagation();
 					this.removeEventListener('click', arguments.callee);
 				});
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode && /^data:/.test(url)){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));
(function ( $ ) {
///
$(document).ready(function() {
	var body = $('body');

	body.on('click', '.dropdown-menu', function(e){
		// keep clicks inside of dropdowns from closing dropdowns
		e.stopPropagation();
	});

	body.on('keydown', function(e){
		if (e.which === 27 && $('.open .dropdown-menu').length > 0) {
			$('.open .dropdown-toggle').dropdown('toggle');
		}
	});

	body.on('show.bs.dropdown', '.dropdown', function(e){
		var dropdown = $(this).find('.dropdown-menu');
		// need to be displayed to to get offset position
		dropdown.css({'display':'block','visibility':'hidden'});
		var offset = dropdown.offset();
		if (offset.left < 0) {
			dropdown.css('transform','translateX(' + (0 - parseInt(offset.left)) + 'px)');
		} else if (offset.right < 0) {
			dropdown.css('transform','translateX(' + parseInt(offset.right)+ 'px)');
		}
	});

	body.on('shown.bs.dropdown', '.dropdown', function(){
		var dropdown = $(this).find('.dropdown-menu');
		dropdown.css({'display':'','visibility':''});
	});

	body.on('hide.bs.dropdown', '.dropdown', function(e){
		var dropdown = $(this).find('.dropdown-menu');
		if ($.contains(dropdown[0], document.activeElement)) {
			$(e.relatedTarget).focus();
		}
	});
});
///
}( jQuery ));

(function ( $ ) {
///
$.fn.focusLabel = function() {
	return this.each(function() {
		var input = $(this);
		var label = $('label[for="' + input.attr('id') + '"]');
		var onClass = 'has-focus';
		var showClass = 'has-value';

		input.bind('checkval change click keyup input paste',function() {
			if (input.val() !== '') {
				label.addClass(showClass);
			} else {
				label.removeClass(showClass);
			}
		}).on('focus',function() {
			label.addClass(onClass);
		}).on('blur',function() {
			label.removeClass(onClass);
		}).trigger('checkval');
	});
};

jQuery.expr[':'].insensitiveContains = function(a, i, m) {
	return jQuery(a).text().toUpperCase()
		.indexOf(m[3].toUpperCase()) >= 0;
};

$.fn.multiselect = function() {
	return this.each(function() {
		var multiselect = $(this);
		var toggle = multiselect.find('.multiselect-btn');
		var dropdown = multiselect.find('.multiselect-wrap');

		// Add base ARIA attributes
		toggle.attr('aria-expanded', 'false');
		dropdown.attr('aria-hidden', 'true');

		toggle.on('click', function(e) {
			e.preventDefault();
			// Switch ARIA attributes
			if (toggle.attr('aria-expanded') === 'true') {
				toggle.attr('aria-expanded', 'false');
				dropdown.attr('aria-hidden', 'true');
			} else {
				toggle.attr('aria-expanded', 'true');
				dropdown.attr('aria-hidden', 'false');
			}

			// Toggle visibility
			toggle.toggleClass('is-active');
			dropdown.slideToggle('fast');
			
		});
		
		function closeMultiselect() {
			// Switch ARIA attributes
			toggle.attr('aria-expanded', 'false');
			dropdown.attr('aria-hidden', 'true');
			// Hide dropdown
			toggle.removeClass('is-active');
			dropdown.hide();
		}

		// Close dropdown when clicking outside
		$(document).mouseup(function(e) {
			if (!multiselect.is(e.target) && multiselect.has(e.target).length === 0) {
				closeMultiselect();
			}
		});

		// Close dropdown on 'esc' keypress
		multiselect.keyup(function(e) {
			if (e.which === 27) {
				closeMultiselect();
				toggle.focus();
			}
		});
	});
};



// Typeahead Multiselect

$.fn.typeaheadMultiselect = function() {
	return this.each(function() {
		var
			typeaheadMultiselect = $(this),
			multiPanel = typeaheadMultiselect.find('.multi-panel'),
			toggle = typeaheadMultiselect.find('.multi-btn'),
			input = typeaheadMultiselect.find('.multi-input'),
			clearButton = typeaheadMultiselect.find('.form-input-clear'),
			dropdown = typeaheadMultiselect.find('.multiselect-wrap'),
			checkboxes = dropdown.find('.c-checkbox-sm input'),
			liveArea = typeaheadMultiselect.find('.live-area'),
			subheadings = typeaheadMultiselect.find('.multiselect-subheading');

		// Add base ARIA attributes
		toggle.attr('aria-expanded', 'false');
		dropdown.attr('aria-hidden', 'true');
		
		// Clicking anywhere in multiPanel expands the dropdown
		multiPanel.on('click', function(e) {
			openTypeaheadMultiselect();
			e.preventDefault();
		});

		// If toggle button is clicked, collapse dropdown (expand is handled by click on entire multiPanel)
		toggle.on('click', function(e) {
			if (typeaheadMultiselect.hasClass('is-active')) {
				closeTypeaheadMultiselect();
				typeaheadMultiselect.focus();
				e.stopPropagation(); // Don't fire click on multiPanel
			}
		});
		
		// Remove "faux focus" from options when the toggle button is focused (since hitting return/enter will then close the typeahead multiselect)
		toggle.on('focus', function(e) {
			checkboxes.removeClass('has-focus');
		});
		
		// When input changes, filter options
		input.on('input change', function(e) {
			var
				searchText = input.val().toLowerCase(),
				inputMatches = (searchText.length === 0) ? dropdown.find('.c-checkbox-sm') : dropdown.find('.c-checkbox-sm:insensitiveContains("'+searchText+'")');

			// Future enhancement: Highlight matched text (see https://markjs.io/)
			inputMatches.removeClass('hidden-xs-up');
			dropdown.find('.c-checkbox-sm').not(inputMatches).addClass('hidden-xs-up').find('input').removeClass('has-focus');
			
			dropdown.find('.multiselect-subheading').each(function() {
				if ($(this).nextUntil('.multiselect-subheading','.c-checkbox-sm').not('.hidden-xs-up').length < 1) {
					$(this).addClass('hidden-xs-up');
				} else {
					$(this).removeClass('hidden-xs-up');
				}
			});

			// "No results found" message
			if (searchText.length > 0 && inputMatches.length === 0) {
				if (typeaheadMultiselect.find('.no-results').length === 0) {
					typeaheadMultiselect.find('.multiselect-group').append('<div class="no-results">No results found</div>');
				}
			} else {
				typeaheadMultiselect.find('.no-results').remove();
			}

			liveArea.text('Filtered to ' + inputMatches.length + ' option' + ((inputMatches.length !== 1) ? 's' : '') + ', ' + inputMatches.find('input:checked').length + ' selected. Use up and down arrow keys to focus options and return or enter to select them.');
		});

		// Handle clicks on dropdown options
		dropdown.on('click', function(e) {
			// Set .has-focus on clicked option, so if user switches to keyboard arrowing continues from there
			if ($(e.target).is(checkboxes)) {
				checkboxes.removeClass('has-focus');
				$(e.target).addClass('has-focus');
			}
			e.stopImmediatePropagation(); // Stop click from bubbling up to parent elements
		});

		// Close typeahead multiselect when it loses focus
		typeaheadMultiselect.focusout(function(e) {
			if (!typeaheadMultiselect.is($(e.relatedTarget).closest('.typeahead-multiselect'))) {
				closeTypeaheadMultiselect();
			}
		});
		
		// Keyboard events
		typeaheadMultiselect.keydown(function(e) {
			switch(e.which) {
				
				// If focus is on the parent typeaheadMultiselect and the dropdown isn't already expanded, pressing space or return/enter expands the dropdown
				// Otherwise, pressing return/enter (or space if not on another control) toggles the option that has the "faux focus"
				case 32: // Space
				case 13: // Enter
					if ($(e.target).is(typeaheadMultiselect) && !typeaheadMultiselect.hasClass('is-active')) {
						openTypeaheadMultiselect();
						e.preventDefault();
					} else if (($(e.target).is(input) && e.which === 13) || !($(e.target).is(input) || $(e.target).is(toggle) || $(e.target).is(clearButton))) {
						toggleFocusedOption();
						e.preventDefault();
					}
					break;
				
				// Pressing escape collapses dropdown and puts focus back on the parent typeaheadMultiselect
				case 27: // Esc
					closeTypeaheadMultiselect();
					typeaheadMultiselect.focus();
					e.preventDefault();
					break;
				
				// If focus is on the parent typeaheadMultiselect, pressing the up or down arrow expands the dropdown. Otherwise they change the "faux focus" in the options list.
				case 38: // Up
				case 40: // Down
					if (!typeaheadMultiselect.hasClass('is-active')) {
						openTypeaheadMultiselect();
					} else {
						e.which === 38 ? arrowPressed('up') : arrowPressed('down');
					}
					e.preventDefault();
					break;
					
				default:
					if (
						typeaheadMultiselect.hasClass('is-active') // Dropdown is expanded
						&& !$(e.target).is(input) // Input isn't focused already
						&& e.which !== 9 // Ignore Tab
						&& e.which !== 16 // Ignore Shift
						&& e.which !== 17 // Ignore Ctrl
						&& e.which !== 18 // Ignore Alt
						&& e.which !== 19 // Ignore Pause/Break
						&& e.which !== 20 // Ignore Caps Lock
						&& e.which !== 35 // Ignore End
						&& e.which !== 36 // Ignore Home
						&& e.which !== 91 // Ignore Command (Safari/Chrome)
						&& e.which !== 93 // Ignore Command (Safari/Chrome)
						&& e.which !== 224 // Ignore Command (Firefox)
					) {
						input.focus();
					} else {
						return;
					}
			}
		});
		
		function toggleFocusedOption() {
			var
				focusedElement = checkboxes.filter('.has-focus'),
				focusedElementParent = focusedElement.closest('.c-checkbox-sm'),
				focusedElementSubheadingText = focusedElementParent.prevAll('.multiselect-subheading').text();
			focusedElement.click();
			liveArea.text($.trim(focusedElementParent.text()) + ', ' + (focusedElementSubheadingText ? focusedElementSubheadingText + ', ' : '') + (focusedElement.prop('checked') ? 'checked' : 'unchecked'));
		}
			
		function arrowPressed(upOrDown) {
			var
				focusableCheckboxes = checkboxes.filter(':visible:enabled'),
				focusableLength = focusableCheckboxes.length,
				focusedElement = checkboxes.filter('.has-focus').first(),
				focusedIndex = focusableCheckboxes.index(focusedElement),
				focusedElementParent,
				focusedElementSubheadingText,
				scrollArea;

			checkboxes.removeClass('has-focus');

			if (focusableLength > 0) {
				upOrDown === 'up' ? focusedIndex-- : focusedIndex++;
				if (focusedIndex < 0) {
					focusedIndex = focusableLength - 1;
				} else if (focusedIndex >= focusableLength) {
					focusedIndex = 0;
				}
				
				focusedElement = focusableCheckboxes.eq(focusedIndex);
				focusedElement.addClass('has-focus');
				focusedElementParent = focusedElement.closest('.c-checkbox-sm');
				focusedElementSubheadingText = focusedElementParent.prevAll('.multiselect-subheading').text();
				
				// Set scrollTop to keep faux-focused option in view
				scrollArea = focusedElement.closest('.multiselect-group');
				
				scrollArea.stop().animate({
					scrollTop: scrollArea.scrollTop() + focusedElementParent.position().top
				}, 200);
				
				liveArea.text($.trim(focusedElementParent.text()) + ', ' + (focusedElementSubheadingText ? focusedElementSubheadingText + ', ' : '') + (focusedElement.prop('checked') ? 'checked' : 'unchecked'));
			}
		}
			
		function openTypeaheadMultiselect() {
			if (!typeaheadMultiselect.hasClass('is-active') && !typeaheadMultiselect.hasClass('disabled')) {
				
				// Switch ARIA attributes
				typeaheadMultiselect.attr('aria-expanded', 'true');
				dropdown.attr('aria-hidden', 'false');

				// Add .sr-only text to the toggle button (only when expanded, since otherwise Chrome reads it when the typeahead multiselect is focused)
				toggle.append('<span class="sr-only">Hide Options</span>');
				
				// Expand dropdown
				typeaheadMultiselect.toggleClass('is-active', true);
				dropdown.collapse('show');
				
				// Show input
				input.show();
				
				// Make things tabbable
				input.attr('tabindex', 0);
				clearButton.attr('tabindex', 0);
				toggle.attr('tabindex', 0);
			}
		}
				
		function closeTypeaheadMultiselect() {
			if (typeaheadMultiselect.hasClass('is-active')) {
	
				// Switch ARIA attributes
				typeaheadMultiselect.attr('aria-expanded', 'false');
				dropdown.attr('aria-hidden', 'true');
				
				// Remove the .sr-only text from the toggle button (since otherwise Chrome reads it when the typeahead multiselect is focused)
				toggle.empty();
				
				// Collapse dropdown
				typeaheadMultiselect.removeClass('is-active');
				dropdown.collapse('hide');
				
				// Clear and hide input
				input.hide();
				input.val('').trigger('change');
				clearButton.removeClass('has-value');
				
				// Make things un-tabbable
				input.attr('tabindex', -1);
				clearButton.attr('tabindex', -1);
				toggle.attr('tabindex', -1);
			}
		}
		
	});
};

$.fn.clearInput = function() {
	return this.each(function() {
		var clearButton = $(this);
		var input = $(clearButton.data('target'));
		var showClass = 'has-value';

		input.bind('checkval change click keyup input paste',function() {
			if (input.val() !== '') {
				clearButton.addClass(showClass);
			} else {
				clearButton.removeClass(showClass);
			}
		}).trigger('checkval');

		clearButton.on('click', function(e) {
			e.preventDefault();
			input.val('').focus().trigger('change');
			clearButton.removeClass(showClass);
		});
	});
};

$.fn.charCount = function() {
	return this.each(function() {
		var input = $(this); // Input
		var el = $(input.data('charcount')); // Element selected via data-charcount
		var content = typeof input.data('chartext') !== 'string' ? '$rem characters remaining' : input.data('chartext');
		var contentSR = $('<span class="sr-only" role="status" aria-live="polite" aria-atomic="true"></span>'); // Create element for screen readers
		var max = input.attr('maxlength');
		var rem = max - input.val().length;
		var rSpan; // Object of span that holds current character count

		// Timer to update count for screen readers — this isn't tied to the other content area because that updates
		// with each character and would be really annoying for screen reader users to hear the count immediately after
		// each character. This allows the update to be read only after a longer pause.
		var typeTimer;
		var doneTypingInterval = 2000;  // 2 seconds

		if (!isNaN(rem) && el.length > 0) {
			content = content.replace('$rem', '<span class="mylt-remain"></span>').replace('$max', max);
			el.html(content);
			rSpan = el.find('.mylt-remain');
			el.append(contentSR); // Add the screen reader content

			input.bind('checkval change click keyup input paste',function() {
				rem = max - input.val().length;
				rSpan.text(rem);

				if (rem <= 25) {
					rSpan.addClass('text-danger');
				} else {
					rSpan.removeClass('text-danger');
				}

				// Start timer on pause
				clearTimeout(typeTimer);
				typeTimer = setTimeout(doneTyping, doneTypingInterval);

				// Update text for screen reader users
				function doneTyping() {
					contentSR.html(rem + ' of ' + max + ' characters remaining'); // Update the counter for screen readers
				}
			}).trigger('checkval');

			// Reset timer on key press
			input.bind('keydown',function() {
				clearTimeout(typeTimer);
			});
		}
	});
};

$(document).ready(function() {
	$('form :input').focusLabel();
	$('.multiselect').multiselect();
	$('.typeahead-multiselect').typeaheadMultiselect();
	$('.form-input-clear').clearInput();
	$('[data-charcount]').charCount();
});

///
}( jQuery ));
(function($) {
///
	var body = $('body');
	var mobileOpen = false;

	// keyboard focus loops
	var fLoopStart; // object - the first focuable item inside a looped dropdown/collpase
	var fLoopEnd; // object - the last focusable item inside a looped dropdown/collapse
	var fLoopTrigger; // object - the trigger that opened the loop
	var fLoopIncludeTrigger; // boolean whether to include the trigger as part of the loop
	var fLoopActive = false; 

	function findFocus(el){
		return el.find('a[href], input:not([disabled]), select:not([disabled]), button:not([disabled])').filter(':visible');
	}

	function handleTab(e) {
		if (e.keyCode === 9) {
			
			var current = $(document.activeElement);
			var next = false;

			if (e.shiftKey) {
				// backwards
				if (current.is(fLoopTrigger)) {
					next = fLoopEnd;
				} else if (current.is(fLoopStart)) {
					next = fLoopIncludeTrigger ? fLoopTrigger : fLoopEnd;
				}
			} else {
				// forwards
				if (current.is(fLoopTrigger)) {
					next = fLoopStart;
				} else if (current.is(fLoopEnd)) {
					next = fLoopIncludeTrigger ? fLoopTrigger : fLoopStart;
				}
			}

			if (next) {
				e.preventDefault();
				next.focus();
			}
		}
	}

	function assignFocusLoop(start, end, trigger, include) {
		fLoopStart = start;
		fLoopEnd = end;
		fLoopTrigger = trigger;
		fLoopIncludeTrigger = include;
	}

	function activateFocusLoop() {
		body.on('keydown', handleTab);
		fLoopActive = true;
	}

	function deactivateFocusLoop() {
		body.off('keydown', handleTab);
		fLoopActive = false;
	}

	function isDesktop() {
		var bp = lthelp.getBreakpoint();
		return bp === 'lg' || bp === 'xl';
	}

	body.on('click', '[data-toggle="headernav"]', function(e){
		e.preventDefault();
		var trigger = $(this);
		var navpanel = $( trigger.data('target') );

		$('body').toggleClass('header-nav-open-body');
		trigger.toggleClass('navbar-toggler-open');
		navpanel.addClass('header-nav-animating').toggleClass('header-nav-open');

		mobileOpen = !mobileOpen;
		trigger.attr('aria-expanded', mobileOpen);

		if (mobileOpen) {
			var toplinks = $('.header-nav .nav-link:visible');
			assignFocusLoop(toplinks.first(), toplinks.last(), trigger, true);
			navpanel.attr('tabindex', "-1").focus();
			activateFocusLoop();

			if ($('.header-collapse.in').length > 0) {
				$('.header-collapse.in').collapse('hide');
			}
		} else {
			deactivateFocusLoop();
		}
	});

	body.on('transitionend MSTransitionEnd webkitTransitionEnd', '.header-nav-animating', function() {
		$(this).removeClass('header-nav-animating');
	});

	function activateFocusLoop() {
		body.on('keydown', handleTab);
		fLoopActive = true;
	}

	function deactivateFocusLoop() {
		body.off('keydown', handleTab);
		fLoopActive = false;
	}

	body.on('show.bs.dropdown', '.header-nav .dropdown', function(e){
		if (!isDesktop()) {
			var mainNav = $('.header-nav');
			$(this).find('.dropdown-menu').css('top', mainNav.scrollTop()).attr('tabindex', "-1").focus();
			mainNav.css('overflow', 'hidden');
			fLoopStart = $(this).find('.header-dropdown-back');
			fLoopEnd = $(this).find('.dropdown-item').last();
		}
	});

	body.on('hide.bs.dropdown', '.header-nav .dropdown', function(e){
		var subNav = $(this).find('.dropdown-menu');
		if (!isDesktop()) {
			var toplinks = $('.header-nav .nav-link:visible');
			fLoopStart = toplinks.first();
			fLoopEnd = toplinks.last();
		}
		setTimeout(function(){
			subNav.css('top', '');
			$('.header-nav').css('overflow', '');
		}, 200);
	});

	body.on('click', '.header-dropdown-back', function(e){
		body.trigger('click'); // closes open dropdowns
	});

	body.on('show.bs.dropdown', '.header-utility-dropdown', function(e){
		var dropdown = $(this);
		var trigger = $(e.relatedTarget);
		var triggers = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');
		var offset = trigger.offset();
		var trW = trigger.outerWidth();
		var hdW = $('.header').outerWidth(true);
		
		// locations on the trigger for matching up dropdown
		var trC = parseInt(hdW - offset.left - (trW/2));
		var trR = parseInt(hdW - offset.left - trW);

		// current bp
		var bp = lthelp.getBreakpoint();

		dropdown.find('.dropdown-arrow').css('right', trC + 'px');

		if (!(bp === 'xs' || bp === 'sm')) { // dropdown goes full width at these bps
			dropdown.find('.dropdown-menu').css('right', trR + 'px');
		}

		if (isDesktop()) { // dropdown placed relative to utility bar at these bps
			var top = $('.header-primary').offset().top;
			dropdown.css('top', top + 'px');
		}

		triggers.parent().addClass('open');
		triggers.attr('aria-expanded', true);
	});

	body.on('shown.bs.dropdown', '.header-utility-dropdown', function(e){
		var dropdown = $(this);
		var trigger = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]').filter(':visible');
		dropdown.attr('tabindex', "-1").focus();
		// focus loop 
		var focusable = findFocus(dropdown);
		assignFocusLoop(focusable.first(), focusable.last(), trigger, true);
		activateFocusLoop();
	});

	body.on('hidden.bs.dropdown', '.header-utility-dropdown', function(e){
		var dropdown = $(this);
		var triggers = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');
		triggers.attr('aria-expanded', false);
		triggers.parent().removeClass('open');
		dropdown.css('top', '');
		dropdown.find('.dropdown-arrow').css('right', '');
		dropdown.find('.dropdown-menu').css('right', '');
		if ($.contains(this, document.activeElement)) {
			triggers.filter(':visible').focus();
		}
		deactivateFocusLoop();
	});

	body.on('keydown', function(e){
		if (e.which === 27) {
			if ($('.header-collapse.in').length > 0 ) {
				$('.header-collapse.in').collapse('hide');
			}

			if (mobileOpen) {
				var trigger = $('[data-toggle="headernav"]').first();
				var active = $(document.activeElement);
	
				 if (!active.hasClass('dropdown-item') && $.contains($(trigger.data('target'))[0], active[0])) {
				 	trigger.trigger('click').focus();
				 }
			}
		}
		
	});

	body.on('mousedown touchstart', function(e) {
		if (fLoopActive) {
			deactivateFocusLoop();
		}
	});

	body.on('show.bs.collapse', '.header-collapse', function(e){
		var triggers = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');
		triggers.addClass('header-collapse-open');
		body.addClass('header-collapse-open-body');

		if (mobileOpen) {
			$('[data-toggle="headernav"]').first().trigger('click');
		}

		if(!isDesktop()) {
			var content = $(this).find('.header-collapse-content');
			content.css('padding-bottom', (content.height() - ($(window).height() - $('.header-mobile-bar').height())) + 'px');
		}
	});

	body.on('shown.bs.collapse', '.header-collapse', function(e){
		var collapse = $(this);
		var trigger = $('[href="#' + this.id + '"]:visible,[data-target="#' + this.id + '"]:visible').not('#' + this.id +' [data-toggle="collapse"]');
		collapse.attr('tabindex', "-1").focus();
		// focus loop 
		var focusable = findFocus(collapse);
		assignFocusLoop(focusable.first(), focusable.last(), trigger, true);
		activateFocusLoop();
	});

	body.on('hide.bs.collapse', '.header-collapse', function(e){
		var triggers = $('[href="#' + this.id + '"],[data-target="#' + this.id + '"]');
		triggers.removeClass('header-collapse-open');
		if (!mobileOpen) {
			deactivateFocusLoop();
		}
	});

	body.on('hidden.bs.collapse', '.header-collapse', function(e){
		body.removeClass('header-collapse-open-body');
		$(this).find('.header-collapse-content').css('padding-bottom','');
	});

	body.on('show.bs.dropdown', '.header', function(e){
		$('.header-collapse.in').collapse('hide');
	});

	$(window).on('resize', function(){
		if (mobileOpen && isDesktop()) {
			$('[data-toggle="headernav"]').first().trigger('click');
			$('.header-nav-animating').removeClass('header-nav-animating');
		}
	});
///
})(jQuery);

(function($) {
///
	$.fn.heroBGVideo = function() {
		return this.each(function(){
			var hero = $(this);
			var btn = hero.find('.btn-video');
			var videoID = hero.find('.hero-media-video').attr('id');
			var video;

			if (videoID) {
				videojs(videoID).ready(function(){
					video = this;
					// our setup assumes that autoplay is set for bg video, so we'll pause it
					// if user prefers reduced motion, but keep the ability for them
					// to play it if desired
					btn.removeClass('hidden-xs-up');

					video.on('play', function(){
						btn.addClass('btn-video-pause');
						btn.text('Pause Background Video');
					});

					video.on('pause', function(){
						btn.removeClass('btn-video-pause');
						btn.text('Play Background Video');
					});

					btn.click(function(){
						if (btn.hasClass('btn-video-pause')) {
							video.pause();
						} else {
							video.play();
						}
					});

					if (window.matchMedia('(prefers-reduced-motion)').matches) {
						video.pause();
					}
				});

				
			}
		});
	}
	$(document).ready(function(){
		$('.hero-video').heroBGVideo();
	});
///
})(jQuery);
(function ( $ ) {
///
	$('body').on('click', '.input-counter .btn', function(e){
		e.preventDefault();
		var btn = $(this);
		var input = btn.parents('.input-counter').find('.form-control');
		input.val(parseInt(input.val(), 10) + (btn.data('count') === 'less' ? -1 : 1));
		input.trigger('change');
	});

	$('body').on('focus', '.input-counter .form-control', function(e){
		$(this).select();
		$('.input-counter-focus-help[data-target="#' + $(this).attr('id') + '"]').addClass('in');
	});

	$('body').on('blur', '.input-counter .form-control', function(e){
		$('.input-counter-focus-help[data-target="#' + $(this).attr('id') + '"]').removeClass('in');
	});

	$('body').on('change input paste', '.input-counter .form-control', function(e){
		var input = $(this);
		var lessBtn = input.parents('.input-counter').find('[data-count="less"]');
		var moreBtn = input.parents('.input-counter').find('[data-count="more"]');

		var isNum = /^\d+$/.test(input.val());
		var val = parseInt(input.val(), 10);
		var min = input.data('counterMin');
		var max = input.data('counterMax');

		if (val >= 0 && isNum) {
			lessBtn.prop('disabled', val <= min);
			moreBtn.prop('disabled', val >= max);
			if (val < min) {
				input.val(min);
				input.select();
			}
			if (val > max) {
				input.val(max);
				input.select();
			}
		} else {
			input.val(min);
			lessBtn.prop('disabled', true);
			moreBtn.prop('disabled', false);
			input.select();
		}
	});
///
}( jQuery ));

(function ( $ ) {
///
	// currently, the only option for masking is 'phone'
	// as such, the value for the data-inputmask attribute is not evaluated

	function digitsOnly(str) {
		str = str.replace(/[^0-9]/g, '');
		if (str[0] === '1') {
			str = str.substring(1);
		}
		return str;
	}

	$('body').on('focus', '[data-inputmask="phone"]', function(e){
		var input = $(this);
		var val = input.val();
		input.val(digitsOnly(val));
	});

	$('body').on('blur', '[data-inputmask="phone"]', function(e){
		var input = $(this);
		var nval = digitsOnly(input.val()).replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
		input.removeAttr('maxlength').val(nval);
	});

	$('body').on('change keyup input', '[data-inputmask="phone"]', function(e){
		var input = $(this);
		var val = input.val();

		if (digitsOnly(val).length >= 10) {
			input.attr('maxlength', val.length);
		} else {
			input.removeAttr('maxlength');
		}
	});
///
}( jQuery ));
(function() {
	// this line is from lazyload.transpiled.min.js
	// storing here for order of operations
	var _extends=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a},_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};!function(a,b){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):a.LazyLoad=b()}(this,function(){"use strict";var a={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"originalSet",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_initial:"initial",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null},b=!("onscroll"in window)||/glebot/.test(navigator.userAgent),c=function(a,b){a&&a(b)},d=function(a){return a.getBoundingClientRect().top+window.pageYOffset-a.ownerDocument.documentElement.clientTop},e=function(a,b,c){return(b===window?window.innerHeight+window.pageYOffset:d(b)+b.offsetHeight)<=d(a)-c},f=function(a){return a.getBoundingClientRect().left+window.pageXOffset-a.ownerDocument.documentElement.clientLeft},g=function(a,b,c){var d=window.innerWidth;return(b===window?d+window.pageXOffset:f(b)+d)<=f(a)-c},h=function(a,b,c){return(b===window?window.pageYOffset:d(b))>=d(a)+c+a.offsetHeight},i=function(a,b,c){return(b===window?window.pageXOffset:f(b))>=f(a)+c+a.offsetWidth},j=function(a,b,c){return!(e(a,b,c)||h(a,b,c)||g(a,b,c)||i(a,b,c))},k=function(a,b){var c=new a(b),d=new CustomEvent("LazyLoad::Initialized",{detail:{instance:c}});window.dispatchEvent(d)},l=function(a,b){var c=a.parentElement;if("PICTURE"===c.tagName)for(var d=0;d<c.children.length;d++){var e=c.children[d];if("SOURCE"===e.tagName){var f=e.dataset[b];f&&e.setAttribute("srcset",f)}}},m=function(a,b,c){var d=a.tagName,e=a.dataset[c];if("IMG"===d){l(a,b);var f=a.dataset[b];return f&&a.setAttribute("srcset",f),void(e&&a.setAttribute("src",e))}if("IFRAME"===d)return void(e&&a.setAttribute("src",e));e&&(a.style.backgroundImage="url("+e+")")},n=function(b){this._settings=_extends({},a,b),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),this._isFirstLoop=!0,window.addEventListener("resize",this._boundHandleScroll),this.update()};n.prototype={_reveal:function(a){var b=this._settings,d=function d(){b&&(a.removeEventListener("load",e),a.removeEventListener("error",d),a.classList.remove(b.class_loading),a.classList.add(b.class_error),c(b.callback_error,a))},e=function e(){b&&(a.classList.remove(b.class_loading),a.classList.add(b.class_loaded),a.removeEventListener("load",e),a.removeEventListener("error",d),c(b.callback_load,a))};"IMG"!==a.tagName&&"IFRAME"!==a.tagName||(a.addEventListener("load",e),a.addEventListener("error",d),a.classList.add(b.class_loading)),m(a,b.data_srcset,b.data_src),c(b.callback_set,a)},_loopThroughElements:function(){var a=this._settings,d=this._elements,e=d?d.length:0,f=void 0,g=[],h=this._isFirstLoop;for(f=0;f<e;f++){var i=d[f];a.skip_invisible&&null===i.offsetParent||(b||j(i,a.container,a.threshold))&&(h&&i.classList.add(a.class_initial),this._reveal(i),g.push(f),i.dataset.wasProcessed=!0)}for(;g.length>0;)d.splice(g.pop(),1),c(a.callback_processed,d.length);0===e&&this._stopScrollHandler(),h&&(this._isFirstLoop=!1)},_purgeElements:function(){var a=this._elements,b=a.length,c=void 0,d=[];for(c=0;c<b;c++){a[c].dataset.wasProcessed&&d.push(c)}for(;d.length>0;)a.splice(d.pop(),1)},_startScrollHandler:function(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))},_stopScrollHandler:function(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))},handleScroll:function(){var a=this._settings.throttle;if(0!==a){var b=function(){(new Date).getTime()},c=b(),d=a-(c-this._previousLoopTime);d<=0||d>a?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=c,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(function(){this._previousLoopTime=b(),this._loopTimeout=null,this._loopThroughElements()}.bind(this),d))}else this._loopThroughElements()},update:function(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()},destroy:function(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}};var o=window.lazyLoadOptions;return o&&function(a,b){var c=b.length;if(c)for(var d=0;d<c;d++)k(a,b[d]);else k(a,b)}(n,o),n});
	// this intializes the lazyloader
	var lazyload = new LazyLoad({
		elements_selector: ".lazyload"
	});
}());
// angular-ngmodules, from /source/lt-shared-components/lib/angular-ngmodules.js, activated only by the "lt-ng-" prefix
(function(){
	var ngmodules = [],
		ngelements = [],
		ngAttrPrefixes = ['lt-ng-'];

	/**
	 * Finds ngModules in root element.
	 * @param  {int}  [id]  the index of the module to return
	 * @returns {HTMLElement}  if id param passed
	 * @returns {array}        if id is null, an array of HTMLElements are returned
	 */
	function lookup(id) {
		var i, j, found, name, elements = [];
		for(i = 0; i < ngAttrPrefixes.length; i++) {
			name = (ngAttrPrefixes[i] + 'module').replace(':', '\\:');
			if(this.element.querySelectorAll) {
				found = this.element.querySelectorAll('[' + name + ']');
				if(id || id === 0) {
					return found[id];
				}
				for(j = 0; j < found.length; j++) {
					elements.push(found[j]);
				}
			}
		}
		return elements;
	}

	/**
	 * Generates a camel case module name for reference.
	 * @private
	 * @param {string}  input  module name to store
	 * @returns {string} camel case module name
	 */
	function setName(input) {
		return input.toLowerCase().replace(/[^a-zA-Z0-9](.)/g, function() {
			return arguments[1].toUpperCase();
		});
	}

	/**
	 * Checks if value given is a string.
	 * @param  {mixed}  value  object to check
	 * @returns {boolean} returns true if it is a string
	 */
	function isString(value) {
		return typeof value === 'string';
	}

	/**
	 * Retrieves a NG attribute from given element.
	 * @param  {HTMLElement}  element  element to retrieve attribute off of
	 * @param  {string}       ngAttr   attribute property minus ng- prefix
	 * @returns {string} NG attribute from given element.
	 */
	function getNgAttribute(element, ngAttr) {
		var attr, i;
		element = angular.element(element);
		for(i=0; i < ngAttrPrefixes.length; ++i) {
			attr = ngAttrPrefixes[i] + ngAttr;
			if(isString(attr = element.attr(attr))) {
				return attr;
			}
		}
		return null;
	}

	/**
	 * Bootstraps individual module.
	 * @private
	 * @param  {HTMLElement}  element   root element to load module
	 * @param  {int}          position  index of module loaded in page
	 * @param  {array}        modules   array of module names
	 * @returns {undefined}
	 */
	function bootstrap(element, position, modules) {
		var
			self  = this,
			config = { strictDi: getNgAttribute(element, 'strict-di') !== null },
			name   = setName.call(this, modules.join(',')),
			injector;
		ngelements.push(element); // store element for unload

		if(this.extensions && this.extensions.length) {
			modules = modules.concat(this.extensions);
		}
		injector = angular.bootstrap(element, modules, config);
		ngmodules.push({
			key: position,
			name: name,
			element: lookup.call(this, position),
			injector: injector,
			unload: function() { 
				self.unload(this.key);
			}
		});
	}

	/**
	 * Locates modules in root element.
	 * @private
	 * @returns {undefined}
	 */
	function init() {
		var i, elements, modules;

		elements = lookup.call(this);
		for(i = 0; i < elements.length; i++) {
			modules = getNgAttribute(elements[i], 'module') || '';
			bootstrap.call(this, elements[i], i, modules.replace(/\s/g, '').split(','));
		}
	}

	/**
	 * Constructor class for ngModules. Initializes modules on dom ready.
	 * @param  {HTMLElement}  element     root element to locate ngModules
	 * @returns {undefined}
	 */
	function NgModules(element) {
		var self = this;
		this.element = element;
		this.extensions = [];
		angular.element(element).ready(function() {
			init.call(self);
		});
	}

	/**
	 * Loops through all initialized ngModules.
	 * @param  {Function} callback the function called on each iteration
	 * @returns {undefined}
	 */
	NgModules.prototype.forEach = function forEach(callback) {
		angular.forEach(ngmodules, function(module) {
			callback(module);
		});
	};

	/**
	 * Retrieves ngModule by name or index.
	 * @param  {mixed}  name  can be given ngModule name or index
	 * @returns {ngModule} ngModule
	 */
	NgModules.prototype.get = function get(name) {
		if(!isString(name)) {
			return ngmodules[name];
		}
		for(var i = 0; i < ngmodules.length; i++) {
			if(ngmodules[i] && ngmodules[i].name === name) {
				return ngmodules[i];
			}
		}
		return;
	};

	/**
	 * Gives a list of all initialize ngModule names.
	 * @returns {array} list ngModule names
	 */
	NgModules.prototype.list = function list() {
		return ngmodules.map(function(obj) {
			return obj.name;
		});
	};

	/**
	 * Destroys a loaded ngModule by name or index.
	 * @param  {mixed}  name can be given ngModule name or index
	 * @returns {undefined}
	 */
	NgModules.prototype.unload = function unload(name) {
		var i, key;
		if(!isString(name)) {
			key = name;
		}else{
			for(i = 0; i < ngmodules.length; i++) {
				if(ngmodules[i] && ngmodules[i].name === name) {
					key = i;
					break;
				}
			}
		}
		angular.element(ngmodules[key].element).replaceWith(ngelements[key]);
		delete ngmodules[key];
		delete ngelements[key];
	};

	if(window.angular) {
		window.angular.ngmodules = new NgModules(document);
	}
})();
var lthelp = {};

// https://davidwalsh.name/javascript-debounce-function
lthelp.debounce = function (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

lthelp.urlParam = function(name) {
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results === null){
		return null;
	} else {
		return decodeURI(results[1]) || 0;
	}
};

lthelp.checkScrollbar = function () {
	return document.body.clientWidth < window.innerWidth;
};

lthelp.getScrollbarWidth = function () {
	var scrollDiv = document.createElement('div');
	scrollDiv.className = 'modal-scrollbar-measure';
	document.body.appendChild(scrollDiv);
	var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	return scrollbarWidth;
};

lthelp.getBreakpoint = function () {
	 return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

lthelp.scrollTo = function (target, offset, speed) {
	// target = unique selector for item scrolled to, jquery element or 'top' to scroll to top
	// offset = offset scroll point relative to target top
	// speed = speed to move to point

	var pos = 0; // position of target

	if (typeof target === 'string' && target.charAt(0) === '#' && target !== '#') {
		history.pushState({}, '', target);
	} else {
		history.pushState({}, '', window.location.pathname + window.location.search);
	}

	if (target === 'top') {
		target = $('body');
	} else if (typeof target === 'string') {
		target = $(target);
	}
	
	pos = target.offset().top + offset;

	$('html, body').animate({ scrollTop: pos }, speed, function(){
		// ensure that keyboard focus moves to target
		target.focus();
		if (target.is(":focus")) {
			return false;
		} else {
			target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
			target.focus(); // Set focus again
		};
	});

};

(function ( $ ) {
///
$(document).ready(function() {
	$('body').on('show.bs.modal', '.modal', function(){
		$(this).attr('aria-hidden', false);
	});

	$('body').on('hide.bs.modal', '.modal', function(){
		$(this).attr('aria-hidden', true);
	});

	$('body').on('show.bs.modal', '.modal:has(.modal-full)', function(){
		$(this).data('modalScroll', $(window).scrollTop());
	});

	$('body').on('shown.bs.modal', '.modal:has(.modal-full)', function(){
		$('body').addClass('modal-body-fixed');
	});

	$('body').on('hide.bs.modal', '.modal:has(.modal-full)', function(){
		$('body').removeClass('modal-body-fixed');
		$(window).scrollTop($(this).data('modalScroll'));
	});

	$('body').on('show.bs.modal', '.modal:has(.modal-lightbox)', function(){
		$('body').addClass('body-lightbox');
	});

	$('body').on('hidden.bs.modal', '.modal:has(.modal-lightbox)', function(){
		$('body').removeClass('body-lightbox');
	});
});
///
}( jQuery ));

(function ( $ ) {
///
$(document).ready(function() {
	$('body').on('shown.bs.modal', '.modal', function(){
		$('[autofocus]', this).focus();
	});

	$('body').on('keydown', '[data-enter-target]', function(event) {
		var keyCode = event.which;
		var $enterTrigger = $(this);
		var $enterTarget = $($enterTrigger.data('enter-target'));
		if(keyCode === 13 && $enterTrigger.is(':focus')){
			$enterTarget.click();
		}
	});

});
///
}( jQuery ));
(function($) {
///
	$.fn.navbarOverflow = function() {
		return this.each(function(){
			var navbar = $(this);
			var nav = $(navbar.data('navbarOverflow'));
			var overflow;
			var overDrop;
			var overList;
			var overflowWidths = []; // for calculation of "can the first item fit?"
			
			function evalRemainingSpace() {
				var last = nav.find('.nav-item:visible').last();
				if (last.length > 0) {
					return navbar.innerWidth() - (last.offset().left + last.outerWidth());
				} else {
					return 0;
				}
			}

			function removeItems() {
				var oddman = nav.children('li:eq(-2)');
				overflowWidths.unshift(oddman.outerWidth(true));
				oddman.prependTo(overList);
				oddman.removeClass('nav-item');
				oddman.find('.nav-link').removeClass('nav-link').addClass('dropdown-item');
				overflow.removeClass('hidden-xs-up');

				// continue until spacing is available
				if (evalRemainingSpace() < 0) {
					removeItems();
				}
			}

			function returnItem() {
				var oddman = overList.find('li:eq(0)');
				oddman.addClass('nav-item');
				oddman.find('.dropdown-item').removeClass('dropdown-item').addClass('nav-link');
				overflowWidths.shift();
				oddman.insertBefore(overflow);			
			}

			function returnItems() {
				returnItem();

				if (overflowWidths.length === 0) {
					overflow.addClass('hidden-xs-up');
				} else {
					while(evalRemainingSpace() > overflowWidths[0]) {
						evalItemPlacement();
					}
				}
			}

			function evalItemPlacement() {	
				var remaining = evalRemainingSpace();

				if (remaining < 0) {
					removeItems();
				} else if( (remaining > overflowWidths[0]) || (overflowWidths.length === 1 && remaining + overflow.outerWidth(true) > overflowWidths[0]) ) {
					returnItems();
				}
			}

			function addOverflow() {
				overflow = $('<li class="nav-item dropdown hidden-xs-up"></li>');
				overflow.append('<a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More<span class="sr-only"> Menu Items</span></a><div class="dropdown-arrow"></div>');
				overDrop = $('<div class="dropdown-menu dropdown-menu-right"></div>');
				overList = $('<ul class="list-unstyled"></ul>');
				overDrop.append(overList);
				overflow.append(overDrop);
				nav.append(overflow);
			}

			function emptyOverflow() {
				var mlength = overList.find('li').length;
				// make sure there's something in the overflow
				if(mlength > 0) {
					overflow.addClass('hidden-xs-up');
					for(var i=0; i < mlength; i++) {
						returnItem();
					}
				}
			}

			if(nav.length > 0 && !navbar.data('isNavbarOverflow')) {
				navbar.data('isNavbarOverflow',true);
				addOverflow();
				evalItemPlacement();
				navbar.addClass('navbar-overflow'); // change overflow after initalized

				var debounceMore = lthelp.debounce(function() {
					// if navbar changes to collpased state, undo everything
					if(navbar.css('display') !== 'flex') {
						emptyOverflow();
					}else{
						evalItemPlacement();
					}
				}, 100);

				$(window).on('resize', debounceMore);

				// force redraw of header on window focus
				// fixes WEB-11521
				$(window).on('focus', function(){
					setTimeout(function(){
						if(navbar.css('display') === 'flex') {
							evalItemPlacement();
						}
					}, 500);
				});
			}

		});
	};

	$(document).ready(function(){
		if ($('[data-navbar-overflow]').length > 0) {
			$('[data-navbar-overflow]').navbarOverflow();
		}

		// attach overflow behavior listener - tied to unique animation event when inserted into DOM - see _navbar.scss
		$('body').on('animationstart MSAnimationStart webkitAnimationStart', function(e){
			if (e.animationName == "navbarInserted" || e.originalEvent.animationName == "navbarInserted") {
				$('[data-navbar-overflow]').navbarOverflow();
			}
		});

	});

///
})(jQuery);
(function ( $ ) {
///
$(document).ready(function(){
	$('body').on('click', '[data-scrollto]', function(e){
		e.preventDefault();

		var trigger = $(this);
		var href = trigger.attr('href');
		var data = trigger.data();
		var offset = typeof data.offset !== 'number' ? -12 : data.offset;
		var speed = typeof data.speed !== 'number' ? 500 : data.speed;
		
		if (data.scrollto === 'href') {
			data.scrollto = href;
		}

		lthelp.scrollTo(data.scrollto, offset, speed);

	});
});
///
}( jQuery ));
/*
 * For tables that leverage the responsive horizontal scroll pattern
 * it’s necessary to add tabindex="0" when they overflow the container
 * so that the scrolling can be done via keyboard. Helper text is also
 * appended to the caption to help indicate to a user that scrolling is
 * necessary to view all of the content.
 *
 * Based on the work of Heydon Pickering https://inclusive-components.design/data-tables/
*/

(function($) {

	$.fn.responsiveTable = function() {
		return this.each(function() {

			var winWidth = $(window).width(),
				tableWrap = $('.table-responsive'),
				captionHelp = ' <span class="js-scrollHelp d-block small">(scroll for more)</span>';

			// Determine if the table is wider than its wrapper table
			detectOverflow();

			var debounceCount = lthelp.debounce(function() {
			  detectOverflow();
			}, 100);

			window.addEventListener('resize', debounceCount);

			function detectOverflow() {

				tableWrap.each(function() {
					var wrap = $(this),
							resTable = wrap.find('table'),
							caption = wrap.find('caption'),
							help = caption.find('.js-scrollHelp');

					if (resTable.width() > wrap.width()) {
						// Add tabindex so that the table can be focusable and scrolled via keyboard
						wrap.attr('tabindex', 0);

						if (help.length == 0) {
							// Add the helper text only if it doesn’t already exist
							caption.append(captionHelp);
						}

					} else {
						// Remove tabindex
						wrap.attr('tabindex', null);
						// Remove helper text
						help.remove();
					}
				});
			}

		});
	};

	$(document).ready(function(){
		if ($('.table-responsive').length > 0) {
			$('.table-responsive').responsiveTable();
		}
	});

})(jQuery);

// Tooltips

(function ( $ ) {
$.fn.myltTooltip = function(){
	return this.each(function(){
		var toggle = $(this);
		var data = toggle.data();
		var preventDefault = data.preventDefault;
		var tooltip;
		var template = (data.modalTooltip === 'true' || data.modalTooltip === true ) ? '<div class="tooltip tooltip-modal" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' : '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';

		// apply Bootstrap tooltip method with specific options
		toggle.tooltip({ 
			html: true,
			template: template,
			constraints: [{to: $('body')[0], attachment: 'together', pin: true }]
		});

		// controls option to add prevent default
		toggle.on('click', function(e){
			if( preventDefault === 'true' || preventDefault === true ) {
				e.preventDefault();
			}
		});

		// control placement of arrow to allow to remain attached to toggle
		toggle.on('shown.bs.tooltip', function() {
			tooltip = $(data['bs.tooltip'].tip);
			// only move for placement above or below
			if(typeof data.placement === 'undefined' || data.placement === 'top' || data.placement === 'bottom' ) {
				var arrow = tooltip.find('.tooltip-arrow');
				var toggleCenter = toggle.offset().left + (toggle.outerWidth(true) / 2);
				var toolLeft = tooltip.offset().left;
				var toolCenter = toolLeft + (tooltip.outerWidth(true) / 2);

				if(Math.abs(toggleCenter - toolCenter) > 1 ) { 
					arrow.css('left', (toggleCenter - toolLeft) + 'px');
				}else{
					arrow.attr('style', '');
				}
			}
		});
	});
};

$(document).ready(function(){
	$('[data-toggle="tooltip"]').myltTooltip();
});

}( jQuery ));




// Toggletips

(function ( $ ) {
$.fn.myltToggletip = function() {
	return this.each(function() {
		var
			toggletipText = this,
			container = toggletipText.parentNode, // Define the container
			bubbleContainer = $(toggletipText).closest('.toggletip').length ? $(toggletipText).closest('.toggletip')[0] : container, // Find block-level ancestor with .toggletip class to use when parent is an inline element (otherwise same as container)
			toggletipBtn = document.createElement('button'), // Create the button element
			btnLabel = toggletipText.getAttribute('data-btn-label'),
			message = toggletipText.textContent,
			liveRegion = document.createElement('span'), // Create the live region
			positionTop = true,
			debouncedCloseToggletip;
		
		bubbleContainer.classList.add('toggletip');
		toggletipBtn.className = 'toggletip-btn';
		toggletipBtn.setAttribute('type', 'button');
		toggletipBtn.setAttribute('aria-label', btnLabel);
		toggletipBtn.setAttribute('data-toggletip-content', message);
		toggletipBtn.innerHTML = toggletipText.getAttribute('data-char') || 'i';

		// Place the button element in the container
		container.insertBefore(toggletipBtn, toggletipText);

		// Set attributes on the live region and place it in the container
		liveRegion.className = 'toggletip-bubble';
		liveRegion.setAttribute('role', 'status');
		liveRegion.setAttribute('aria-live', 'assertive');
		container.appendChild(liveRegion);

		// Top or bottom bubble placement
		if (toggletipText.getAttribute('data-position') === 'bottom') positionTop = false; // Default (or data-position="top") is top
		container.removeChild(toggletipText); // Remove the original element

		// Create the arrow
		var arrow = document.createElement('span');
		arrow.className = 'tooltip-arrow';		

		// Position toggletip
		function moveToggletip(elem) {
			// Reset transform
			liveRegion.setAttribute('style', 'transform: translate(0,0);');
			liveRegion.classList.remove('arrow-b');
			liveRegion.classList.remove('arrow-t');
			
			// Dimensions & positions: button, viewport, live region, and arrow
			var
				btnBounds = elem.getBoundingClientRect(),
				btnH = elem.offsetHeight,
				btnWHalf = elem.offsetWidth/2,
				winH = window.innerHeight,
				winW = window.innerWidth,
				docH = document.documentElement.clientHeight,
				docW = document.documentElement.clientWidth,
				bubbleInner = liveRegion.firstChild,
				bubbleBounds = bubbleInner.getBoundingClientRect(),
				bubbleH = bubbleInner.offsetHeight,
				bubbleWHalf = bubbleInner.offsetWidth/2,
				bubbleT = Math.round(bubbleBounds.top),
				arrowH = arrow.offsetHeight,
				arrowWHalf = arrow.offsetWidth/2,
				arrowOffset = elem.offsetLeft + btnWHalf - arrowWHalf,
				transArrowH,
				transH,
				transform;

			// Calculate horizontal transforms
			if (btnBounds.left - bubbleWHalf >= 0 && btnBounds.right + bubbleWHalf <= (winW || docW)) {
				transH = (elem.offsetLeft + btnWHalf) - bubbleWHalf;
			} else if (btnBounds.left - bubbleWHalf <= 0) {
				transH = 0;
			} else if (btnBounds.right + bubbleWHalf >= (winW || docW)) {
				// The container is relatively positioned
				transH = (container.offsetWidth + container.offsetLeft) - Math.round(bubbleBounds.right);
			}
			transArrowH = elem.offsetLeft - transH + btnWHalf - arrowWHalf;

			// If set to top and top is in view or if set to bottom, but would be cropped
			if (positionTop && btnBounds.top - bubbleH >= 0 || !positionTop && Math.round(bubbleBounds.bottom) >= (winH || docH)) {
				transform = btnBounds.top - bubbleT - bubbleH - arrowH;
				liveRegion.setAttribute('style', 'transform: translate('+ transH +'px, '+ transform +'px);');
				liveRegion.classList.add('arrow-b');
				// Position the arrow
				arrow.setAttribute('style', 'transform: translate('+ transArrowH +'px, '+ bubbleH +'px);');
			// If set to bottom and bottom is in view or if set to top, but would be cropped
			} else if (!positionTop && btnBounds.bottom <= (winH || docH) || positionTop && btnBounds.top - bubbleH <= 0) {
				transform = btnBounds.bottom - bubbleT + arrowH;
				liveRegion.setAttribute('style', 'transform: translate('+ transH +'px, '+ transform +'px);');
				liveRegion.classList.add('arrow-t');
				// Position the arrow
				arrow.setAttribute('style', 'transform: translate('+ transArrowH +'px, -'+ arrowH +'px);');
			}
		};

		// Toggle the message
		toggletipBtn.addEventListener('click', function() {
			liveRegion.innerHTML = '<span class="toggletip-bubble-inner">'+ message +'</span>';
			// Place the arrow in the live region
			liveRegion.appendChild(arrow);
			// Position the toggletip
			moveToggletip(toggletipBtn);
		});

		// Close function
		function closeToggletip() {
			liveRegion.innerHTML = '';
			liveRegion.setAttribute('style', 'transform: translateY(0);');
		};

		// Close on outside click
		document.addEventListener('click', function(e) {
			if (toggletipBtn !== e.target) {
				closeToggletip();
			}
		});

		// Close on losing focus
		toggletipBtn.addEventListener('blur', function() {
			closeToggletip();
		});

		// Close on screen resize
		$(document).ready(function() {
			debouncedCloseToggletip = lthelp.debounce(closeToggletip, 1000, true);
			window.addEventListener('resize', debouncedCloseToggletip);
		});

		// Remove toggletip on ESC
		toggletipBtn.addEventListener('keydown', function(e) {
			if ((e.keyCode || e.which) === 27) {
				closeToggletip();
			}
		});

	});
};

$(document).ready(function(){
	$('[data-toggletip]').myltToggletip();
});

}( jQuery ));

(function($) {

	$('body').on('click', '[data-toggle="truncate"]', function(e){
		e.preventDefault();
		var target = $( $(this).attr('href') );
		target.toggleClass('truncate-open');
	});

})(jQuery);

/**
 * what-input - A global utility for tracking the current input method (mouse, keyboard or touch).
 * @version v5.0.1
 * @link https://github.com/ten1seven/what-input
 * @license MIT
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("whatInput",[],t):"object"==typeof exports?exports.whatInput=t():e.whatInput=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t){"use strict";e.exports=function(){var e=document.documentElement,t=null,n="initial",o=n,i=["input","select","textarea"],r=[],u=[16,17,18,91,93],d={keydown:"keyboard",keyup:"keyboard",mousedown:"mouse",mousemove:"mouse",MSPointerDown:"pointer",MSPointerMove:"pointer",pointerdown:"pointer",pointermove:"pointer",touchstart:"touch"},a=!1,s=!1,c={x:null,y:null},p={2:"touch",3:"touch",4:"mouse"},w=!1;try{var f=Object.defineProperty({},"passive",{get:function(){w=!0}});window.addEventListener("test",null,f)}catch(e){}var v=function(){var e=!!w&&{passive:!0};window.PointerEvent?(window.addEventListener("pointerdown",l),window.addEventListener("pointermove",h)):window.MSPointerEvent?(window.addEventListener("MSPointerDown",l),window.addEventListener("MSPointerMove",h)):(window.addEventListener("mousedown",l),window.addEventListener("mousemove",h),"ontouchstart"in window&&(window.addEventListener("touchstart",L,e),window.addEventListener("touchend",L))),window.addEventListener(b(),h,e),window.addEventListener("keydown",l),window.addEventListener("keyup",l),window.addEventListener("focusin",y),window.addEventListener("focusout",E)},l=function(e){if(!a){var t=e.which,r=d[e.type];"pointer"===r&&(r=x(e));var s="keyboard"===r&&t&&-1===u.indexOf(t)||"mouse"===r||"touch"===r;if(n!==r&&s&&(n=r,m("input")),o!==r&&s){var c=document.activeElement;c&&c.nodeName&&-1===i.indexOf(c.nodeName.toLowerCase())&&(o=r,m("intent"))}}},m=function(t){e.setAttribute("data-what"+t,"input"===t?n:o),g(t)},h=function(e){if(k(e),!a&&!s){var t=d[e.type];"pointer"===t&&(t=x(e)),o!==t&&(o=t,m("intent"))}},y=function(n){t=n.target.nodeName.toLowerCase(),e.setAttribute("data-whatelement",t),n.target.classList.length&&e.setAttribute("data-whatclasses",n.target.classList.toString().replace(" ",","))},E=function(){t=null,e.removeAttribute("data-whatelement"),e.removeAttribute("data-whatclasses")},L=function(e){"touchstart"===e.type?(a=!1,l(e)):a=!0},x=function(e){return"number"==typeof e.pointerType?p[e.pointerType]:"pen"===e.pointerType?"touch":e.pointerType},b=function(){return"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"},g=function(e){for(var t=0,i=r.length;t<i;t++)r[t].type===e&&r[t].fn.call(void 0,"input"===e?n:o)},M=function(e){for(var t=0,n=r.length;t<n;t++)if(r[t].fn===e)return t},k=function(e){c.x!==e.screenX||c.y!==e.screenY?(s=!1,c.x=e.screenX,c.y=e.screenY):s=!0};return"addEventListener"in window&&Array.prototype.indexOf&&function(){d[b()]="mouse",v(),m("input"),m("intent")}(),{ask:function(e){return"intent"===e?o:n},element:function(){return t},ignoreKeys:function(e){u=e},registerOnChange:function(e,t){r.push({fn:e,type:t||"input"})},unRegisterOnChange:function(e){var t=M(e);t&&r.splice(t,1)}}}()}])});
//# sourceMappingURL=prospect-homepage.js.map
