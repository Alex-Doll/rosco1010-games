var canvas, canvasContext;

var blueWarrior = new warriorClass();


// Initialize
window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	// Image Loading Screen
	clearScreen();

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
	worldGrid = whichLevel.slice();
	blueWarrior.reset(blueWarriorPic, "Blue Derplin");
}


function animateAll() {
	moveAll();
	drawAll();
}


function moveAll() {
	blueWarrior.move();
}


function clearScreen() {
	colorRect(0, 0, canvas.width, canvas.height, "white");
}


function drawAll() {
	//clearScreen();
	drawWorlds();
	blueWarrior.draw();
}





















































