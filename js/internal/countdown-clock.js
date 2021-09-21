(function ( $ ) {
///
	var clock;
	// note: this clock is only good for less than 100 days out; three digits not handled
	var deadline = 'February 28 2017 21:00:00';
	var timeinterval;

	var daysSect;
	var hoursSect;
	var minutesSect;
	var secondsSect;

	var daysVal;
	var hoursVal;
	var minutesVal;
	var secondsVal;

	function getTimeRemaining(endtime) {
		var t = Date.parse(endtime) - Date.parse(new Date());

		if (t < 0) {
			return {
				'total': t,
				'days': 0,
				'hours': 0,
				'minutes': 0,
				'seconds': 0
			};
		} else {
			var seconds = Math.floor((t / 1000) % 60);
			var minutes = Math.floor((t / 1000 / 60) % 60);
			var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}
	}

	function initializeClock() {
		daysSect = clock.find('.cc-days');
		hoursSect = clock.find('.cc-hours');
		minutesSect = clock.find('.cc-minutes');
		secondsSect = clock.find('.cc-seconds');

		updateClock();
		timeinterval = setInterval(updateClock, 1000);
	}

	function numberSwitch(el, value) {
		value = ('0' + value).slice(-2);
		el.find('.lcd-number:nth-of-type(1)').attr('class', 'lcd-number lcd-number-' + value.charAt(0));
		el.find('.lcd-number:nth-of-type(2)').attr('class', 'lcd-number lcd-number-' + value.charAt(1));
	}

	function updateClock() {
		var t = getTimeRemaining(deadline);

		if (daysVal !== t.days) {
			daysVal = t.days
			numberSwitch(daysSect, daysVal);
		}

		if (hoursVal !== t.hours) {
			hoursVal = t.hours
			numberSwitch(hoursSect, hoursVal);
		}

		if (minutesVal !== t.minutes) {
			minutesVal = t.minutes
			numberSwitch(minutesSect, minutesVal);
		}

		secondsVal = t.seconds;
		numberSwitch(secondsSect, secondsVal, true);

		if (t.total <= 0) {
			clearInterval(timeinterval);
		}
	}

	$(document).ready(function() {
		clock = $('#countdownClock');
		
		if (clock.length > 0) {
			initializeClock();
		}
	});
///
}( jQuery ));