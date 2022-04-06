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