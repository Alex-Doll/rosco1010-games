var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();

// Time parameters
var startTime;
var startMinute;
var startSecond;
var startMillisecond;

var raceMinutes;
var raceSeconds;
var raceMilliseconds;


// Initialize
window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	// Image Loading Screen
	clearScreen();
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, "white");

	loadImages();
}


function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	var millisecondsPerFrame = 1000/framesPerSecond;

	setupInput();

	loadLevel(levelOne);

	setInterval(animateAll, millisecondsPerFrame);
	
};


function loadLevel(whichLevel) {
	trackGrid = whichLevel.slice();
	initializeStartTime();
	greenCar.reset(carPics[currentTheme][GREEN_CAR], "Green Gerblin", true);
	blueCar.reset(carPics[currentTheme][BLUE_CAR], "Blue Derplin", true);
}


function animateAll() {
	moveAll();
	drawAll();
}


function moveAll() {
	greenCar.move();
	blueCar.move();
	carToCarCollisionCheck(blueCar, greenCar);

	updateTime();
}


function drawAll() {
	drawTracks();
	greenCar.draw();
	blueCar.draw();
	displayTime();
}
























































