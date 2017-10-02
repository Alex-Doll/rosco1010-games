// tennisManiaMain.js

// Setup Parameters
var canvas;
var canvasContext;

// Score Parameters
var playerScore = 0;
var compScore = 0;
const WINNING_SCORE = 5;
var showingTitleScreen = true;
var twoPlayerGame = false;

// Audio
var hit_audio = new soundOverlapsClass("audio/hit");
var miss_audio = new soundOverlapsClass("audio/miss");
var wall_audio = new soundOverlapsClass("audio/wall");


// Main Functions
window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	clearScreen();

	loadImages();
}


function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	var millisecondsPerFrame = 1000/framesPerSecond;

	ballReset();
	configureInput();

	setInterval(animateAll, millisecondsPerFrame);
	
};


function drawAll() {
	checkForWinAndDrawTitleScreen();
	if (!showingTitleScreen) {
		drawBackground();
		drawPaddles();
		drawBall();
		drawScore();
	}
}


function moveAll() {
	if (showingTitleScreen) {
		return;
	}
	if (twoPlayerGame) {
		playerLeftMove();
		playerRightMove();
	} else {
		computerMove();
	}
	
	ballMove();
}


function animateAll() {
	drawAll();
	moveAll();
}


function drawBackground() {
	drawBitmapCenteredNoRotation(backgroundPic, canvas.width/2, canvas.height/2);
}


function checkForWinAndDrawTitleScreen() {
	if (showingTitleScreen) {
		selectGameType();
		drawBackground();
		colorText("TENNIS MANIA!!!", 40, 90, "white", "40px sans-serif");

		colorText("Press 1 to use the mouse", 30, 160, "white", "14px sans-serif");
		colorText("and play against the", 30, 180, "white", "14px sans-serif");
		colorText("computer!", 30, 200, "white", "14px sans-serif");

		colorText("Press 2 to use W/S", 30, 240, "white", "14px sans-serif");
		colorText("and UP/DOWN to play", 30, 260, "white", "14px sans-serif");
		colorText("against a friend!", 30, 280, "white", "14px sans-serif");

		if (twoPlayerGame) {
			if (playerScore >= WINNING_SCORE) {
				colorText("Left Side Wins!", 30, 530, "white", "20px sans-serif");
			}
			else if (compScore >= WINNING_SCORE) {
				colorText("Right Side Wins!", 30, 530, "white", "20px sans-serif");
			}
		} else {
			if (playerScore >= WINNING_SCORE) {
				colorText("The Player Wins!", 30, 530, "white", "20px sans-serif");
			}
			else if (compScore >= WINNING_SCORE) {
				colorText("The Computer Wins...", 30, 530, "white", "20px sans-serif");
			}
		}
		return;
	}
}


function drawScore() {
	colorText(playerScore, 100, 100, "white", "20px sans-serif");
	colorText(compScore, canvas.width - 100, 100, "white", "20px sans-serif");
}


function selectGameType() {
	if (keyHeld_Num1) {
		twoPlayerGame = false;
		startGame();
	}
	if (keyHeld_Num2) {
		twoPlayerGame = true;
		startGame();
	}
}


function startGame() {
	playerScore = 0;
	compScore = 0;
	playerPaddleY = canvas.height/2 - PADDLE_HEIGHT/2;
	compPaddleY = canvas.height/2 - PADDLE_HEIGHT/2;
	showingTitleScreen = false;
}








