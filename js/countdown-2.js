$(document).ready(function() {
	
	$('#start').on("click", function() {
		var displayRds  = document.querySelector('#timerRounds'),
			displayHrs  = document.querySelector('#timerHours'),
			displayMins = document.querySelector('#timerMins'),
			displaySecs = document.querySelector('#timerSecs'),
			rounds 		= displayRds.value,
			hrs  		= displayHrs.value === "" ? 0 : displayHrs.value *60*60,
			mins 		= displayMins.value  === "" ? 0 : displayMins.value *60,
			secs 		= displaySecs.value  === "" ? 0 : displaySecs.value,
			duration 	= hrs + mins + secs,
			timer 		= new CountDownTimer(rounds, duration),
			timeObj 	= CountDownTimer.parse(duration);

		console.log("duration = "+ duration);

		format(timeObj.hours, timeObj.minutes, timeObj.seconds);
		timer.onTick(format);
		timer.start();
		
		// for (i = 0; i < displayRds.value; i++) {
		// 	timer.start();
		// 	console.log(i);
		// }

		function format(hours, minutes, seconds) {
			hours 	= hours   < 10 ? "0" + hours   : hours;
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			displayHrs.value  = hours;
			displayMins.value = minutes;
			displaySecs.value = seconds;
		}
	});
	
	$('#complete').on("click", function() {
		$('#complete').removeClass('show');
		$('#complete').addClass('hidden');
	});

	$('#reset').on("click", function() {
		location.reload();
	});
});

function CountDownTimer(rounds, duration, granularity) {
	this.rounds = rounds;
	this.duration = duration;
	this.granularity = granularity || 1000;
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
		
		// TIMER TICKS
		diff = that.duration - (((Date.now() - start) / 1000) | 0);

		if (diff > 0) {
			setTimeout(timer, that.granularity);
			console.log('tick = ' + diff);
		} else {
			diff = 0;
			that.running = false;
			complete();
		}

		// TIMER DISPLAY
		obj = CountDownTimer.parse(diff);
		
		that.tickFunctions.forEach(function(ftn) {
			ftn.call(this, obj.hours, obj.minutes, obj.seconds);
		}, that);

	}());
}

// CountDownTimer.prototype.timer = function() {
// 	var start = Date.now(),
// 		that = this,
// 		diff, obj;

// 	(function timer() {
		
// 		// TIMER TICKS
// 		diff = that.duration - (((Date.now() - start) / 1000) | 0);

// 		if (diff > 0) {
// 			setTimeout(timer, that.granularity);
// 			console.log('tick = ' + diff);
// 		} else {
// 			diff = 0;
// 			that.running = false;
// 			complete();
// 		}

// 		// TIMER DISPLAY
// 		obj = CountDownTimer.parse(diff);
		
// 		that.tickFunctions.forEach(function(ftn) {
// 			ftn.call(this, obj.hours, obj.minutes, obj.seconds);
// 		}, that);

// 	}());
// }

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
		'hours'	  : Math.floor(seconds / 3600) | 0,
		'minutes' : Math.floor(seconds % 3600)/60 | 0,
		'seconds' : (seconds % 60) | 0
	};
}

function complete() {
	// $('#complete').removeClass('hidden');
	// $('#complete').addClass('show');
	console.log('complete!');
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