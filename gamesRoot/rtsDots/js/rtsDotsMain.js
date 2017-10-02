// rtsDotsMain.js

var canvas, canvasContext;


// Initialize
window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	clearScreen();

	var framesPerSecond = 30;
	var millisecondsPerFrame = 1000/framesPerSecond;

	setInterval(animateAll, millisecondsPerFrame);

	canvas.addEventListener("mousemove", mousemoveHandler);
	canvas.addEventListener("mousedown", mousedownHandler);
	canvas.addEventListener("mouseup", mouseupHandler);

	populateTeam(playerUnits, PLAYER_START_UNITS, true);
	populateTeam(enemyUnits, ENEMY_START_UNITS, false);

}


function animateAll() {
	moveAll();
	drawAll();
}


function moveAll() {
	for (var i = 0; i < allUnits.length; i++) {
		allUnits[i].move();
	}

	removeDeadUnits();

	checkAndHandleVictory();
}


function drawAll() {
	clearScreen();
	for (var i = 0; i < allUnits.length; i++) {
		allUnits[i].draw();
	}
	for (var i = 0; i < selectedUnits.length; i++) {
		selectedUnits[i].drawSelectionBox();
	}
	if (isMouseDragging) {
		coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, "yellow");
	}

}



























































