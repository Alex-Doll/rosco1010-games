// timeKeeping.js

// Time parameters
var startTime;
var startMinute;
var startSecond;
var startMillisecond;

var raceMinutes;
var raceSeconds;
var raceMilliseconds;

var isThereAPrevWinner = false;
var prevWinnerMin;
var prevWinnerSec;
var prevWinnerMilsec;
var prevWinnerName;


// Time Keeping Functions
function initializeStartTime() {
	startTime = new Date();
	startMinute = startTime.getMinutes();
	startSecond = startTime.getSeconds();
	startMillisecond = Math.round(startTime.getMilliseconds() / 100);
}


function updateTime() {
	var currentTime = new Date();
	var currentMinute = currentTime.getMinutes();
	var currentSecond = currentTime.getSeconds();
	var currentMillisecond = Math.round(currentTime.getMilliseconds() / 100);

	raceMinutes = calculateTimeDifference(startMinute, currentMinute, 60);
	raceSeconds = calculateTimeDifference(startSecond, currentSecond, 60);
	raceMilliseconds = calculateTimeDifference(startMillisecond, currentMillisecond, 10);
}


function updateNitroTime(whichCar) {
	var currentNitroTime = new Date();
	currentNitroTime = currentNitroTime.getSeconds();

	var nitroSeconds = calculateTimeDifference(whichCar.nitroBoostStartTime, currentNitroTime, 60);

	if (nitroSeconds >= whichCar.nitroLengthSeconds) {
		whichCar.usingNitroBoost = false;
		console.log(whichCar.name + "runs out of nitro boost at " + nitroSeconds);
	}
}


function setWinnerTime(whichCarName) {
	isThereAPrevWinner = true;

	prevWinnerMin = raceMinutes;
	prevWinnerSec = raceSeconds;
	prevWinnerMilsec = raceMilliseconds;
	prevWinnerName = whichCarName;
}


function displayTime() {
	var raceMin = timePadZero(raceMinutes);
	var raceSec = timePadZero(raceSeconds);
	var raceMilsec = raceMilliseconds;

	if (currentTheme == THEME_DAY) {
		colorText("Race Time: " + raceMin + ":" + raceSec + "." + raceMilsec, 10, 25, "black", "20px sans-serif");
	} else {
		colorText("Race Time: " + raceMin + ":" + raceSec + "." + raceMilsec, 10, 25, "white", "20px sans-serif");
	}
	
	if (isThereAPrevWinner) {
		displayPreviousWinnerTime();
	}
}


function displayPreviousWinnerTime() {
	if (currentTheme == THEME_DAY) {
		colorText(prevWinnerName + " won the last round in " + prevWinnerMin + ":" + prevWinnerSec + "." + prevWinnerMilsec, 400, 25, "blackww", "20px sans-serif");
	} else {
		colorText(prevWinnerName + " won the last round in " + prevWinnerMin + ":" + prevWinnerSec + "." + prevWinnerMilsec, 400, 25, "white", "20px sans-serif");
	}
	
}


function timePadZero(timeInteger) {
	if (timeInteger < 10) {
		timeInteger = "0" + timeInteger;
	}

	return timeInteger;
}


function calculateTimeDifference(setTime, movingTime, timeInterval) {
	if (movingTime >= setTime) {
		return (movingTime - setTime);
	} else {
		return timeInterval - (setTime - movingTime);
	}
}















