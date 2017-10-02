// input.js

// Mouse Position
var mouseX;
var mouseY;


// Input Functions
function configureInput() {
	canvas.addEventListener("mousemove", mousemoveHandler);
	canvas.addEventListener("mouseup", mouseupHandler);
}


function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	/*// Cheat To Test Ball Positions
	ballX = mouseX;
	ballY = mouseY;
	ballSpeedX = 4;
	ballSpeedY = -4;*/

	return {
		x: mouseX,
		y: mouseY
	};
}


function mousemoveHandler(evt) {
	var mousePos = getMousePos(evt);
	paddleX = mousePos.x - PADDLE_WIDTH/2;
}


function mouseupHandler(evt) {
	if (!showingTitleScreen) {
		ballHeldForServe = false;
	}
	showingTitleScreen = false;
}