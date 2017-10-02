// Mouse Position
var mouseX;
var mouseY;

// Keyboard Key Codes
const W_KEY = 87;
const A_KEY = 65;
const S_KEY = 83;
const D_KEY = 68;
const UP_ARROW_KEY = 38;
const LEFT_ARROW_KEY = 37;
const DOWN_ARROW_KEY = 40;
const RIGHT_ARROW_KEY = 39;


function setupInput() {
	canvas.addEventListener("mousemove",
		function(evt) {
		});

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	blueWarrior.setupInput(W_KEY, A_KEY, S_KEY, D_KEY, 
				UP_ARROW_KEY, LEFT_ARROW_KEY, DOWN_ARROW_KEY, RIGHT_ARROW_KEY);
}


function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	/*// Cheat To Test Warrior Positions
	warriorX = mouseX;
	warriorY = mouseY;
	warriorSpeedX = 4;
	warriorSpeedY = -4;*/

	return {
		x: mouseX,
		y: mouseY
	};
}


function keySet(keyEvent, whichWarrior, setTo) {
	if (keyEvent.keyCode == whichWarrior.controlKeyLeft || keyEvent.keyCode == whichWarrior.altKeyLeft) {
		whichWarrior.keyHeld_West = setTo;
	}
	if (keyEvent.keyCode == whichWarrior.controlKeyRight || keyEvent.keyCode == whichWarrior.altKeyRight) {
		whichWarrior.keyHeld_East = setTo;
	}
	if (keyEvent.keyCode == whichWarrior.controlKeyUp || keyEvent.keyCode == whichWarrior.altKeyUp) {
		whichWarrior.keyHeld_North = setTo;
	}
	if (keyEvent.keyCode == whichWarrior.controlKeyDown || keyEvent.keyCode == whichWarrior.altKeyDown) {
		whichWarrior.keyHeld_South = setTo;
	}
}


function keyPressed(evt) {
	//console.log("Key Pressed: " + evt.keyCode);
	keySet(evt, blueWarrior, true);
	evt.preventDefault();
}


function keyReleased(evt) {
	//console.log("Key Released: " + evt.keyCode);
	keySet(evt, blueWarrior, false);
	evt.preventDefault();
}







