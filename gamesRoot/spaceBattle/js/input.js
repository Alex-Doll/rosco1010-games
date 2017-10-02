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
const KEY_SPACEBAR = 32;


function setupInput() {
	canvas.addEventListener("mousemove",
		function(evt) {
		});

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	player1Ship.setupInput(W_KEY, A_KEY, S_KEY, D_KEY, KEY_SPACEBAR);
}


function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x: mouseX,
		y: mouseY
	};
}


function keySet(keyEvent, whichCar, setTo) {
	if (keyEvent.keyCode == whichCar.controlKeyLeft) {
		whichCar.keyHeld_TurnLeft = setTo;
	}
	if (keyEvent.keyCode == whichCar.controlKeyRight) {
		whichCar.keyHeld_TurnRight = setTo;
	}
	if (keyEvent.keyCode == whichCar.controlKeyUp) {
		whichCar.keyHeld_Gas = setTo;
	}
}


function keyPressed(evt) {
	//console.log("Key Pressed: " + evt.keyCode);
	keySet(evt, player1Ship, true);

	if (evt.keyCode == player1Ship.controlKeyForShotFire) {
		player1Ship.cannonFire();
	}
	//evt.preventDefault();
}


function keyReleased(evt) {
	//console.log("Key Released: " + evt.keyCode);
	keySet(evt, player1Ship, false);
	evt.preventDefault();
}







