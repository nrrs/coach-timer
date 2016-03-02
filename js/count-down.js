$(document).ready(function() {
	
	$('#init-timer').on("click", function() {
		var display = document.querySelector('#time'),
			mins = $('#timerMins').val() *60,
			secs = $('#timerSecs').val(),
			duration = parseInt(mins) + parseInt(secs);
			timer = new CountDownTimer(duration),
			timeObj = CountDownTimer.parse(duration);

		console.log(duration);

		format(timeObj.minutes, timeObj.seconds);
		timer.onTick(format);
		timer.start();

		function format(minutes, seconds) {
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			display.textContent = minutes + ':' + seconds;
		}
	});
	
});


function CountDownTimer(duration, granularity) {
	this.duration = duration;
	this.granulairty = granularity || 1000;
	this.tickFunctions = [];
	this.running = false;
}

CountDownTimer.prototype.start = function() {
	if (this.running) {
		return;
	}
	this.running = true;
	var start = Date.now(),
		that = this,
		diff, obj;

	(function timer() {
		diff = that.duration - (((Date.now() - start) / 1000) | 0);

		if (diff > 0) {
			setTimeout(timer, that.granularity);
		} else {
			diff = 0;
			that.running = false;
			console.log('done');
		}

		obj = CountDownTimer.parse(diff);
		
		that.tickFunctions.forEach(function(ftn) {
			ftn.call(this, obj.minutes, obj.seconds);
		}, that);

	}());
}

CountDownTimer.prototype.onTick = function(ftn) {
	if (typeof ftn === 'function') {
		this.tickFunctions.push(ftn);
	}
	return this;
}

CountDownTimer.prototype.expired = function() {
	return !this.running;
}

CountDownTimer.parse = function(seconds) {
	return {
		'minutes' : (seconds / 60) | 0,
		'seconds' : (seconds % 60) | 0
	};
}

function playBreak() {
	console.log('playBreak() ran.');
}

function playGo() {
	console.log('playGo() ran.');
}

function playDone() {
	console.log('playDone() ran.');
}