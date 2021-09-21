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
