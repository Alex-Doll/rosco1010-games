// ball.js

// Ball Parameters
var ballX = 0;
var ballY = 0;
var ballTrail = []
const INIT_BALLSPEED_X = 12;
const minSpeedY = 1;
const maxSpeedY = 5;
const rangeSpeedY = maxSpeedY - minSpeedY + 1;
var ballSpeedX;
var ballSpeedY;
var variableSpeedCounter = 0;


// Ball Functions
function drawBall() {
	if (Math.abs(ballSpeedX) == PADDLE_WIDTH) {
		for (var i = ballTrail.length - 1; i > 0; i--) {
			colorCircle(ballTrail[i][0], ballTrail[i][1], i*0.75, 0, 2*Math.PI, true, "yellow");
		}
	}

	drawBitmapCenteredNoRotation(ballPic, ballX, ballY);
}


function ballReset() {
	if (playerScore >= WINNING_SCORE || compScore >= WINNING_SCORE) {
		showingTitleScreen = true;
	}
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	
	variableSpeedCounter = 0;
	ballSpeedX = INIT_BALLSPEED_X;
	ballSpeedY = initializeBallSpeedY();
}


function ballMove() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (Math.abs(ballSpeedX) == PADDLE_WIDTH) {
		updateBallTrail(ballX, ballY);
	}

	ballCollisionChecks();
}


function ballWallCollision() {
	if (ballX < 0 && ballSpeedX < 0.0) {				// Left Side
		miss_audio.play();
		compScore++;
		ballReset();				// Makes ballSpeedX in +x direction
	}
	if (ballX > canvas.width && ballSpeedX > 0.0) {		// Right Side
		miss_audio.play();
		playerScore++;
		ballReset();				// Makes ballSpeedX in +x direction
		ballSpeedX *= -1;			// Initial ballSpeedX always in +x direction, this flips it to -x
	}
	if (ballY < 0 && ballSpeedY < 0.0) {				// Top Side
		ballSpeedY *= -1;
		wall_audio.play();
	}
	if (ballY > canvas.height && ballSpeedY > 0.0) {	// Bottom Side
		ballSpeedY *= -1;
		wall_audio.play();
	}
}


function ballCollisionChecks() {
	ballWallCollision();

	if (ballSpeedX < 0.0) {
		ballPaddleCollision(playerPaddleX, playerPaddleY);
	} else if (ballSpeedX > 0.0) {
		ballPaddleCollision(compPaddleX, compPaddleY);
	}
}


function initializeBallSpeedY () {
	var randSpeedY = Math.floor(Math.random() * rangeSpeedY) + minSpeedY;

	if (Math.random() < 0.5) {
		return randSpeedY;
	} else {
		return (-1 * randSpeedY);
	}
}


function updateBallSpeedX() {
	variableSpeedCounter++;
	if (ballSpeedX < 0) {
		if (variableSpeedCounter == 3) {
			ballSpeedX -= 3;
		} else if (variableSpeedCounter == 8) {
			ballSpeedX -= 3;
		}
	} else {
		if (variableSpeedCounter == 3) {
			ballSpeedX += 3;
		} else if (variableSpeedCounter == 8) {
			ballSpeedX += 3;
		}
	}
	
	//console.log(ballSpeedX);
}


function updateBallTrail(currentX, currentY) {
	ballTrail.push([currentX, currentY]);
	if (ballTrail.length > Math.abs(ballSpeedX) / 2) {
		ballTrail.shift();
	}
}























