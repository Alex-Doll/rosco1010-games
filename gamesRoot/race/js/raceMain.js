var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();


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
	greenCar.reset(greenCarPic, "Green Gerblin");
	blueCar.reset(blueCarPic, "Blue Derplin");
}


function animateAll() {
	moveAll();
	drawAll();
}


function moveAll() {
	greenCar.move();
	blueCar.move();
}


function clearScreen() {
	colorRect(0, 0, canvas.width, canvas.height, "black");
}


function drawAll() {
	//clearScreen();
	drawTracks();
	greenCar.draw();
	blueCar.draw();
}





















































