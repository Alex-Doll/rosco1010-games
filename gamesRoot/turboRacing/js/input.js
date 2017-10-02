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
const Q_KEY = 81;
const CTRL_KEY = 17;

const NUM_1_KEY = 49;
const NUM_2_KEY = 50;
const NUM_3_KEY = 51;


function setupInput() {
	canvas.addEventListener("mousemove",
		function(evt) {
		});

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	greenCar.setupInput(W_KEY, A_KEY, S_KEY, D_KEY, Q_KEY);
	blueCar.setupInput(UP_ARROW_KEY, LEFT_ARROW_KEY, DOWN_ARROW_KEY, RIGHT_ARROW_KEY, CTRL_KEY);
}


function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	/*// Cheat To Test Car Positions
	carX = mouseX;
	carY = mouseY;
	carSpeedX = 4;
	carSpeedY = -4;*/

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
	if (keyEvent.keyCode == whichCar.controlKeyDown) {
		whichCar.keyHeld_Reverse = setTo;
	}
	if (keyEvent.keyCode == whichCar.controlNitroKey) {
		if (whichCar.hasNitroBoost) {
			whichCar.hasNitroBoost = false;
			whichCar.usingNitroBoost = true;
			whichCar.nitroBoostStartTime = new Date();
			whichCar.nitroBoostStartTime = whichCar.nitroBoostStartTime.getSeconds();
			console.log(whichCar.name + " has engaged nitro boost at " + whichCar.nitroBoostStartTime);
		}
	}
	if (keyEvent.keyCode == NUM_1_KEY) {
		levelCounter = 0 - 1;
		changeTrack();
	}
	if (keyEvent.keyCode == NUM_2_KEY) {
		levelCounter = 1 - 1;
		changeTrack();
	}
	if (keyEvent.keyCode == NUM_3_KEY) {
		levelCounter = 2 - 1;
		changeTrack();
	}
}


function keyPressed(evt) {
	//console.log("Key Pressed: " + evt.keyCode);
	keySet(evt, greenCar, true);
	keySet(evt, blueCar, true);
	evt.preventDefault();
}


function keyReleased(evt) {
	//console.log("Key Released: " + evt.keyCode);
	keySet(evt, greenCar, false);
	keySet(evt, blueCar, false);
	evt.preventDefault();
}







