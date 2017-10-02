// input.js


// Input Parameters
var pLKeyHeld_Up = false;
var pLKeyHeld_Down = false;
var pRKeyHeld_Up = false;
var pRKeyHeld_Down = false;
var keyHeld_Num1 = false;
var keyHeld_Num2 = false;


// Keyboard Key Codes
const W_KEY = 87;
const S_KEY = 83;
const UP_ARROW_KEY = 38;
const DOWN_ARROW_KEY = 40;
const NUM_1_KEY = 49;
const NUM_2_KEY = 50;


// Input Functions
function configureInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);
	
	if (!twoPlayerGame) {
		canvas.addEventListener("mousemove", mousemoveHandler);
	}
}


function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	};
}


function mousemoveHandler(evt) {
	playerMove(evt);
}


function keySet(keyEvent, setTo) {
	if (keyEvent.keyCode == W_KEY) {
		pLKeyHeld_Up = setTo;
	}
	if (keyEvent.keyCode == S_KEY) {
		pLKeyHeld_Down = setTo;
	}
	if (keyEvent.keyCode == UP_ARROW_KEY) {
		pRKeyHeld_Up = setTo;
	}
	if (keyEvent.keyCode == DOWN_ARROW_KEY) {
		pRKeyHeld_Down = setTo;
	}
	if (keyEvent.keyCode == NUM_1_KEY) {
		keyHeld_Num1 = 	setTo;
	}
	if (keyEvent.keyCode == NUM_2_KEY) {
		keyHeld_Num2 = 	setTo;
	}
}


function keyPressed(evt) {
	//console.log("Key Pressed: " + evt.keyCode);
	keySet(evt, true);
	evt.preventDefault();
}


function keyReleased(evt) {
	//console.log("Key Released: " + evt.keyCode);
	keySet(evt, false);
	evt.preventDefault();
}