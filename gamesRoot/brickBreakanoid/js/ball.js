// ball.js

// Ball Parameters
var ballX = 400;
var ballY = 300;
const INIT_BALL_SPEED_X = -5;
const INIT_BALL_SPEED_Y = -7;
var ballSpeedX = INIT_BALL_SPEED_X;
var ballSpeedY = INIT_BALL_SPEED_Y;
const BALL_RADIUS = 10;
var ballHeldForServe = true;


// Ball Functions
function drawBall() {
	//colorCircle(ballX, ballY, BALL_RADIUS, 0, 2*Math.PI, true, "white");
	drawBitmapCenteredNoRotation(ballPic, ballX, ballY);
}


function moveBall() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;
}


function ballReset() {
	livesRemaining--;
	gameReset();

	ballHeldForServe = true;

	ballSpeedX = INIT_BALL_SPEED_X;
}


function ballSpeedIncrease() {
	var ballSpeedIncrement = 3;
	if (bricksLeft == Math.floor(initialBricks * 0.75)) {
		if (ballSpeedY < 0.0) {
			ballSpeedY -= ballSpeedIncrement;
		} else {
			ballSpeedY += ballSpeedIncrement;
		}	
	} else if (bricksLeft == Math.floor(initialBricks * 0.50)) {
		if (ballSpeedY < 0.0) {
			ballSpeedY -= ballSpeedIncrement;
		} else {
			ballSpeedY += ballSpeedIncrement;
		}
	} else if (bricksLeft == Math.floor(initialBricks * 0.25)) {
		if (ballSpeedY < 0.0) {
			ballSpeedY -= ballSpeedIncrement;
		} else {
			ballSpeedY += ballSpeedIncrement;
		}
	}
	console.log(initialBricks);
	console.log(bricksLeft);
	console.log(ballSpeedY);
}


function ballWallCollision() {
	// Ball-Wall Collision
	if (ballX < 0 && ballSpeedX < 0.0) {				// Left Side
		ballSpeedX *= -1;
		wall_clip.play();
	}
	if (ballX > canvas.width && ballSpeedX > 0.0) {		// Right Side
		ballSpeedX *= -1;
		wall_clip.play();
	}
	if (ballY < 0 && ballSpeedY < 0.0) {				// Top Side
		ballSpeedY *= -1;
		wall_clip.play();
	}
	if (ballY > canvas.height) {						// Bottom Side
		ballSpeedY *= -1;
		miss_clip.play();
		ballReset();
	}
}