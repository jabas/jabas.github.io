(function ( $ ) {
///

window.addEventListener('DOMContentLoaded', function() {
	var azureLsOptions = {
		"nativeControlsForTouch": false,
		"logo": { "enabled": true },
		controls: true,
		autoplay: true,
		width: "640",
		height: "400",
		poster: "https://www.lifetime.life/content/dam/mylt/images/live/live-streaming-key.jpg",
		cea708CaptionsSettings: { enabled: false, srclang: 'en', label: 'Live CC' },
		imsc1CaptionsSettings: [{ "label": "English", "srclang": "en-US" }]
	}

	// determine stream manifest location
	var apiUrl = "https://ltottprodampsa.blob.core.windows.net/streams/playback-endpoints/clubs";
	var searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has("club")) {
		apiUrl += "/" + searchParams.get("club");
	}
	if (searchParams.has("room")) {
		apiUrl += "/" + searchParams.get("room");
	}
	apiUrl += ".json";

	// get stream manifest, initialize player
	$.getJSON(apiUrl, function(json) {
		if (json.default.length > 0) {
			myPlayer = amp("azuremediaplayer", azureLsOptions);
			myPlayer.src([{
				"src": json.default,
				"type": "application/vnd.ms-sstr+xml"
			}]);
			myPlayer.addEventListener('error', function() {
				$('#liveLoadError').removeClass('hidden-xs-up');
			});
		} else {
			$('#liveLoadError').removeClass('hidden-xs-up');
		}
	})
	.fail(function(jqxhr, textStatus, error) {
		console.log( "Request Failed: " + textStatus + ", " + error );
		$('#liveLoadError').removeClass('hidden-xs-up');
	});
});


///
}( jQuery ));