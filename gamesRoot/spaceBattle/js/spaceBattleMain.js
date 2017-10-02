var canvas, canvasContext;

var player1Ship = new shipClass();
var enemy = new ufoClass();
var enemy1 = new ufoClass();
var enemy2 = new ufoClass();


// Initialize
window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	clearScreen();

	loadImages();
}


function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	var millisecondsPerFrame = 1000/framesPerSecond;


	setupInput();

	player1Ship.init(player1ShipPic);
	enemy.init(ufoPic);
	enemy1.init(ufoPic);
	enemy2.init(ufoPic);

	setInterval(animateAll, millisecondsPerFrame);
	
};


function animateAll() {
	moveAll();
	drawAll();
}


function moveAll() {
	player1Ship.move();
	enemy.move();
	enemy1.move();
	enemy2.move();
	player1Ship.checkMyShipAndShotCollisionAgainst(enemy);
	player1Ship.checkMyShipAndShotCollisionAgainst(enemy1);
	player1Ship.checkMyShipAndShotCollisionAgainst(enemy2);
}


function clearScreen() {
	colorRect(0, 0, canvas.width, canvas.height, "black");
}


function drawAll() {
	clearScreen();
	player1Ship.draw();
	enemy.draw();
	enemy1.draw();
	enemy2.draw();
}





















































