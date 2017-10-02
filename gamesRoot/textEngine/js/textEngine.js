// textEngineTestingMain.js
var canvas;
var canvasContext;
var framesPerSecond = 30;
var millisecondsPerFrame = 1000/framesPerSecond;

// Font Parameters
const FONT_SIZE = 18;
const LINE_SPACING = 24;
var isBlinking = true;
var blinkCount = 0;

// Key Codes
const ENTER_KEY = 13;
const A_KEY = 65;
const Z_KEY = 90;
const SPACE_KEY = 32;
const BACKSPACE_KEY = 8;

// Text Content
var currentInput = "";
var displayedText = [];
var scrollEnabled = false;


window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	document.addEventListener("keydown", keyPressed);
	
	setInterval(animateAll, millisecondsPerFrame);
}


function animateAll() {
	moveAll();
	drawAll();
}


function moveAll() {

}


function drawAll() {
	clearScreen("black");

	drawDisplayedText();
}


function drawDisplayedText() {
	colorText(currentInput, 50, 560, "white", FONT_SIZE + "px sans-serif");

	for (var i = displayedText.length - 1; i >= 0; i--) {
		colorText(displayedText[i], 50, 560 - LINE_SPACING * Math.abs(i - displayedText.length), "white", FONT_SIZE + "px sans-serif");
	}
}


function makeBlink(blinksPerSecond) {
	if (blinkCount < framesPerSecond / blinksPerSecond) {
		blinkCount++;
	} else {
		blinkCount = 0;
		isBlinking = !isBlinking;
	}
}


function editCurrentInput(keyEvent) {
	if (keyEvent.keyCode == BACKSPACE_KEY) {			// Backspace key, pop last currentInput element
		currentInput = currentInput.substr(0, currentInput.length - 1);
	} if ((keyEvent.keyCode >= A_KEY && keyEvent.keyCode <= Z_KEY) || keyEvent.keyCode == SPACE_KEY) {
		currentInput = currentInput.concat(String.fromCharCode(keyEvent.keyCode));
	}
}


function enterKeyPressed() {
	displayedText.push(currentInput);
	evaluateInput();
	currentInput = "";
	
	if (!scrollEnabled) {
		if (displayedText.length > 32) {
			displayedText = displayedText.slice(1, displayedText.length);
		}
	} else {
		if (displayedText.length > 64) {
			displayedText = displayedText.slice(1, displayedText.length);
		}
	}
}


function keyPressed(evt) {
	editCurrentInput(evt);
	//console.log(evt.keyCode);
	if (evt.keyCode == ENTER_KEY) {
		enterKeyPressed();
	}
	evt.preventDefault();
}


function evaluateInput() {
	switch (currentInput) {
		case "HELP":
			displayedText.push("Welcome to the Help Menu!");
			displayedText.push("Enter CLR to clear all text from the screen.");
			break;
		case "CLR":
			displayedText = [];
			break;
		default:
			break;
	}
}



















