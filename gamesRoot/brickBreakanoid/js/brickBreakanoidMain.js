// brickBreakanoidMain.js

// Setup Parameters
var canvas, canvasContext;
var playerScore = 0;
const INIT_LIVES = 3;
var livesRemaining = INIT_LIVES;
var showingTitleScreen = true;
var lastRoundScore = null;

// Audio Clips
var miss_clip = new soundOverlapsClass("audio/miss");
var hit_clip = new soundOverlapsClass("audio/hit");
var wall_clip = new soundOverlapsClass("audio/wall");


// Initialize
window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	clearScreen();

	loadImages();
};


function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	var millisecondsPerFrame = 1000/framesPerSecond;


	paddleY = canvas.height - PADDLE_EDGE_DISTANCE - PADDLE_HEIGHT;		// Puts Bottom Edge of Paddle At canvas.height - PADDLE_EDGE_DISTANCE
	brickReset();
	configureInput();

	setInterval(animateAll, millisecondsPerFrame);	
}


function animateAll() {
	moveAll();
	drawAll();
}


function moveAll() {
	if (ballHeldForServe) {
		ballX = mouseX;
		ballY = paddleY - BALL_RADIUS/2;
	} else {
		moveBall();
	}
	collisionCheck();
}


function drawAll() {
	if (showingTitleScreen) {
		drawTitleScreen();
	} else {
		drawBackground();
		drawBall();
		drawPaddle();
		drawBricks();
		drawScoreAndLives();
	}
}


function drawTitleScreen() {
	drawBitmapCenteredNoRotation(titlescreenPic, canvas.width/2, canvas.height/2);
	if (lastRoundScore != null) {
		colorText("Last Round Score: " + lastRoundScore, 50, 140, "white", "36px sans-serif");
	}
}


function drawScoreAndLives() {
	colorText("Score: " + playerScore, 20, 580, "black", "18px sans-serif");
	drawLives();
}


function drawLives() {
	for (var i = 0; i < livesRemaining; i++) {
		drawBitmapCenteredNoRotation(lifePic, 780 - i * 20, 580);
	}
}


function drawBackground() {
	drawBitmapCenteredNoRotation(backgroundPic, canvas.width/2, canvas.height/2);
}


function gameReset() {
	if (livesRemaining < 0) {
		lastRoundScore = playerScore;
		brickReset();
		playerScore = 0;
		livesRemaining = INIT_LIVES;
		showingTitleScreen = true;
	}
}


function collisionCheck() {
	/*// Mouse-Brick Collision (Testing)
	var mouseBrickCol = Math.floor(mouseX / BRICK_W);
	var mouseBrickRow = Math.floor(mouseY / BRICK_H);
	var brickIndexUnderMouse = Math.floor(rowColToArrayIndex(mouseBrickCol, mouseBrickRow));
	colorText("C: " + mouseBrickCol + ", R: " + mouseBrickRow + "; X: " + brickIndexUnderMouse, mouseX, mouseY, "green");

	if (brickIndexUnderMouse >= 0 && brickIndexUnderMouse < BRICK_COLS * BRICK_ROWS) {
		brickGrid[brickIndexUnderMouse] = false;
	}*/

	ballWallCollision();

	ballBrickCollision();

	ballPaddleCollision();
}





































