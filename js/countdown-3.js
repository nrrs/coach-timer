$(document).ready(function() {
    $('#start').on("click", function() {
        var displayRds  = document.querySelector('#timerRounds'),
            displayHrs  = document.querySelector('#timerHours'),
            displayMins = document.querySelector('#timerMins'),
            displaySecs = document.querySelector('#timerSecs'),
            rounds      = displayRds.value,
            hrs         = displayHrs.value === "" ? 0 : displayHrs.value *60*60,
            mins        = displayMins.value  === "" ? 0 : displayMins.value *60,
            secs        = displaySecs.value  === "" ? 0 : displaySecs.value,
            duration    = hrs + mins + secs;

        timer = countDown( duration, "display-counter", function() { alert('done!'); } );
    });

    $('#pause').on("click", function() {
        timer.pause();
    });
    $('#resume').on("click", function() {
        timer.resume();
    });
});

function countDown(duration, container, onComplete) {
    var startTime,
        timer,
        obj = {},
        ms = duration*1000,
        display = document.getElementById(container);
        console.log(duration);
    obj.resume = function() {
        startTime = new Date().getTime();
        timer = setInterval(obj.tick, 1000);
    };

    obj.pause = function() {
        ms = obj.tick();
        clearInterval(timer);
    };

    obj.tick = function() {
        var now = Math.max(0, ms - (new Date().getTime() - startTime) ),
            min = Math.floor(now/60000),
            sec = Math.floor(now/1000)%60;

        sec = (sec < 10 ? "0" : "")+sec;
        display.innerHTML = min + ":" + sec;

        if( now == 0 ) {
            clearInterval(timer);
            obj.resume = function() {};
            if( onComplete ) onComplete();
        }

        return now;
    };

    obj.resume();
    return obj;
}

// function startTimer(seconds, container, oncomplete) {
//     var startTime, timer, obj, ms = seconds*1000,
//         display = document.getElementById(container);
//         console.log(display);
//     obj = {};
//     obj.resume = function() {
//         startTime = new Date().getTime();
//         timer = setInterval(obj.step,250); // adjust this number to affect granularity
//                             // lower numbers are more accurate, but more CPU-expensive
//     };
//     obj.pause = function() {
//         ms = obj.step();
//         clearInterval(timer);
//     };
//     obj.step = function() {
//         var now = Math.max(0,ms-(new Date().getTime()-startTime)),
//             m = Math.floor(now/60000), s = Math.floor(now/1000)%60;
//         s = (s < 10 ? "0" : "")+s;
//         display.innerHTML = m+":"+s;
//         if( now == 0) {
//             clearInterval(timer);
//             obj.resume = function() {};
//             if( oncomplete) oncomplete();
//         }
//         return now;
//     };
//     obj.resume();
//     return obj;
// }

// // start:
// var timer = startTimer(5*60, "timer", function() {alert("Done!");});
// // pause:
// timer.pause();
// // resume:
// timer.resume();