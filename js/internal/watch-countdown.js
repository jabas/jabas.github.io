(function ( $ ) {
///
	var r; // remaining time in ms

	var watch = $('.watch');
	var minutesSpan = $('.minutes');
	var secondsSpan = $('.seconds');
	var textArea = $('.class-text');
	var ticks = $('.tick');
	var activeSeg = 0;
	var clockTicking = true;
	var timeinterval;

	var branded = { // used to map UPC numbers to the associated CSS classnames (should match mux-digital-signage/src/main/java/com/lifetime/DigitalSignage/DataweaveHelpers.java)
		'701592004345':'barbell-strength',
		'701592974921':'gluteus-maxout',
		'701592944436':'kettlebell-kombine',
		'701592818294':'life-barre',
		'701591061264':'en-barre',
		'701592986160':'spartan-strong',
		'701592004376':'strike',
		'701592004383':'tcx',
		'701591036231':'upper-rx',
		'701591039546':'xtreme',
		'701592705792':'warrior-sculpt',
		'701591045202':'ringside',
		'701592986184':'be',
		'701592986207':'flow',
		'701592986221':'flow',
		'701592986214':'flow',
		'701592986238':'flow',
		'701592986245':'root',
		'701592986191':'surrender',
		'701591072925':'sol',
		'701591072918':'sol',
		'701592706294':'yoga',
		'701592877246':'yoga',
		'701592733247':'yoga',
		'701592733265':'yoga',
		'701592877253':'yoga',
		'701592963406':'yoga',
		'701592733210':'yoga',
		'701592733256':'yoga',
		'701592966230':'amp',
		'701591029035':'amp-sculpt',
		'701592966292':'edg',
		'701591019869':'edg-sculpt',
		'701592966247':'pwr',
		'701592875297':'pilates',
		'701592705037':'pilates',
		'701592003287':'pilates',
		'701592003294':'pilates',
		'701592003300':'pilates',
		'701592003317':'pilates',
		'701592003270':'pilates',
		'701592004451':'pilates',
		'701592004444':'pilates',
		'701592783196':'combat-arts',
		'701592783288':'combat-arts',
		'701592783295':'combat-arts',
		'701592783318':'combat-arts',
		'701592783301':'combat-arts',
		'701592000576':'tennis',
		'701592000583':'tennis',
		'701592000590':'tennis',
		'701592000668':'tennis',
		'701592000859':'tennis',
		'701592000927':'tennis',
		'701592000934':'tennis',
		'701592004086':'tennis',
		'701592004093':'tennis',
		'701592004109':'tennis',
		'701592004116':'tennis',
		'701592004703':'tennis',
		'701592004710':'tennis',
		'701592004727':'tennis',
		'701592004734':'tennis',
		'701592004741':'tennis',
		'701592004758':'tennis',
		'701592004765':'tennis',
		'701592004772':'tennis',
		'701592004789':'tennis',
		'701592004796':'tennis',
		'701592004802':'tennis',
		'701592004932':'tennis',
		'701592004949':'tennis',
		'701592004956':'tennis',
		'701592704566':'tennis',
		'701592704597':'tennis',
		'701592704603':'tennis',
		'701592704610':'tennis',
		'701592704627':'tennis',
		'701592704634':'tennis',
		'701592704641':'tennis',
		'701592704658':'tennis',
		'701592704665':'tennis',
		'701592704672':'tennis',
		'701592704689':'tennis',
		'701592704696':'tennis',
		'701592704702':'tennis',
		'701592704719':'tennis',
		'701592723888':'tennis',
		'701592816092':'tennis',
		'701592859419':'tennis',
		'701592897237':'tennis',
		'701592918048':'tennis',
		'701592918055':'tennis',
		'701592918079':'tennis',
		'701591000096':'tennis',
		'701592004147':'tennis',
		'701592004154':'tennis',
		'701592004161':'tennis',
		'701592953162':'tennis',
		'701592953179':'tennis',
		'701592953186':'tennis',
		'701592953193':'tennis',
		'701592953209':'tennis',
		'701592953216':'tennis',
		'701592953223':'tennis',
		'701592001641':'swim',
		'701592004581':'swim',
		'701592783776':'swim',
		'701592001672':'swim',
		'701592783806':'swim',
		'701592001535':'swim',
		'701592001542':'swim',
		'701592001511':'swim',
		'701592001528':'swim',
		'701592001603':'swim',
		'701592001610':'swim',
		'701592001627':'swim',
		'701592001634':'swim',
		'701592846006':'swim',
		'701592783837':'swim',
		'701592001566':'swim',
		'701592001573':'swim',
		'701592001580':'swim',
		'701592913968':'kids',
		'701592787064':'kids',
		'701592975560':'kids',
		'701592828811':'kids',
		'701592807328':'kids',
		'701592831316':'kids',
		'701592862112':'kids',
		'701592975386':'kids',
		'701592975379':'kids',
		'701592787149':'kids',
		'701592822413':'kids',
		'701592975461':'kids',
		'701592787118':'kids',
		'701592864949':'kids',
		'701592975430':'kids',
		'701592975447':'kids',
		'701592975416':'kids',
		'701592788849':'kids',
		'701592787095':'kids',
		'701592822420':'kids',
		'701592788856':'kids',
		'701592975546':'kids',
		'701592975492':'kids',
		'701592975522':'kids',
		'701592975515':'kids',
		'701592975485':'kids',
		'701592975508':'kids',
		'701592975539':'kids',
		'701592787101':'kids',
		'701592001207':'kids',
		'701592702968':'kids',
		'701592705167':'kids',
		'701592713843':'kids',
		'701592001177':'kids',
		'701592002617':'basketball',
		'701592987020':'alpha-metcon',
		'701591021275':'alpha-metcon',
		'701592996213':'alpha-metcon',
		'701592995452':'alpha-metcon',
		'701591021084':'alpha-metcon',
		'701591021282':'alpha-metcon',
		'701592987006':'alpha-metcon',
		'701592005526':'alpha-metcon',
		'701592987068':'alpha-strong',
		'701591021299':'alpha-strong',
		'701592996244':'alpha-strong',
		'701592995469':'alpha-strong',
		'701591021091':'alpha-strong',
		'701591021305':'alpha-strong',
		'701592987037':'alpha-strong',
		'701592745622':'alpha-strong',
		'701592986993':'gtx-burn',
		'701591021237':'gtx-burn',
		'701592996220':'gtx-burn',
		'701592995445':'gtx-burn',
		'701591021077':'gtx-burn',
		'701591021244':'gtx-burn',
		'701592986979':'gtx-burn',
		'701592003843':'gtx-burn',
		'701592986962':'gtx-cut',
		'701591021251':'gtx-cut',
		'701592996237':'gtx-cut',
		'701592995438':'gtx-cut',
		'701591021060':'gtx-cut',
		'701591021268':'gtx-cut',
		'701592986948':'gtx-cut',
		'701592003799':'gtx-cut'
	};

	function urlParam (name) {
		var token = name !== 'token' ? urlParam('token') : null;
		var query = token ? '?' + atob(token) : window.location.href;
		var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(query);
		if (results === null){
			return null;
		} else {
			return decodeURIComponent(results[1]) || 0;
		}
	}

	function getTimeRemaining() {
		if (r <= 0 || r > 1200000) {
			return {
				'ms': r,
				'minutes': "00",
				'seconds': "00",
				'segments' : 0
			};
		} else {
			var seconds = Math.floor((r / 1000) % 60);
			var minutes = Math.floor((r / 1000 / 60) % 60);
			var segments = Math.ceil(r / 20000);

			if (seconds < 10) {
				seconds = "0" + seconds;
			}

			if (minutes < 10) {
				minutes = "0" + minutes;
			}

			return {
				'ms': r,
				'minutes': minutes,
				'seconds': seconds,
				'segments' : segments
			};
		}
	}

	function stopClock() {
		clearInterval(timeinterval);
		minutesSpan.text('00');
		secondsSpan.text('00');
		watch.addClass('inactive');
		ticks.attr('class','tick');
	}

	function initializeClock() {
		setClass();
		var t = getTimeRemaining();
		if (t.ms >= 0 && t.ms <= 1200000) {
			minutesSpan.text(t.minutes);
			secondsSpan.text(t.seconds);
			watch.removeClass('inactive');
			ticks.slice(0,t.segments).attr('class','tick tick-active');
		}
		watch.removeClass('hidden');
		r = r - 1000;
		timeinterval = setInterval(updateClock, 1000);
	}

	function lightTicks(n) {
		watch.removeClass('inactive');
		(function lightUp (i) {
			setTimeout(function () {
				ticks.eq(n - i).attr('class','tick tick-active');
				if (--i) {
					lightUp(i);
				}
			}, 10);
		})(n);
	}

	function updateClock() {
		var t = getTimeRemaining();
		if (t.ms > 1200000 && t.ms <= 1201750) {
			minutesSpan.text('20');
			lightTicks(ticks.length);
		} else if (t.ms >= 0 && t.ms <= 1200000) {
			minutesSpan.text(t.minutes);
			secondsSpan.text(t.seconds);

			var segments = t.segments;
			if (segments !== activeSeg) {
				ticks.eq(segments).attr('class','tick');
				activeSeg = segments;
			}
		} else if (t.ms < 0 && t.ms >= -5000) {
			ticks.attr('class','tick tick tick-active');
			setTimeout(function(){
				ticks.attr('class','tick');
			}, 500);
		} else if (t.ms < -5000) {
			stopClock();
		}
		r = r - 1000;
	}

	function setRemainingTime() {
		var timeParam = urlParam('starttime');
		var start = isNaN(parseInt(timeParam)) ? Date.parse(timeParam) : parseInt(timeParam);
		var s = typeof start !== 'number' ? 0 : start;
		r = s - Date.parse(new Date());
	}

	function setClass() {
		var classParam = urlParam('classname');
		var upcParam = urlParam('upc');

		var classText = typeof classParam !== 'string' ? 'Next Class' : classParam;

		if (branded[upcParam]) {
			watch.addClass('brand-' + branded[upcParam]);
		} else {
			truncateText(classText);
		}
	}

	function truncateText(text) {
		textArea.text(text);
		if (textArea.height() > 156) { // 78px line height, two lines
			textArea.append('...');
			while (textArea.height() > 156) {
				var text = textArea.text();
				text = text.slice(0,-4) + text.slice(-3);
				textArea.text(text);
			}
		}
	}

	function manualReset(ms) {
		watch.addClass('hidden');
		stopClock();
		r = ms;
		initializeClock();
	}

	setRemainingTime();
	$(document).ready(function(){
		initializeClock();
	});

	// TESTING BUTTONS
	$('#tminus5seconds').click(function(){
		manualReset(1205000);
	});
	$('#min15').click(function(){
		manualReset(900000);
	});
	$('#min10').click(function(){
		manualReset(600000);
	});
	$('#min5').click(function(){
		manualReset(300000);
	});
	$('#last10seconds').click(function(){
		manualReset(10000);
	});
	$('#randomTime').click(function(){
		manualReset( Math.floor(Math.random() * 1200) * 1000);
	});
	$('#brandSelect').change(function(){
		var val = $(this).val();
		var classArray = watch.attr('class').split(' ');
		for (var i = 0; i < classArray.length; ++i) {
			var c = classArray[i];
			if (c.substring(0, 6) === "brand-") {
				watch.removeClass(c);
				break;
			}
		}
		if (val !== "none") {
			watch.addClass('brand-' + val);
		} else {
			textArea.text($('#classText').val());
		}
	});
	$('#classTextSubmit').click(function(){
		truncateText($('#classText').val());
	});
///
}( jQuery ));