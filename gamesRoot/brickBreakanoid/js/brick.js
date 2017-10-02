// brick.js

// Brick Parameters
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const GUTTER_ROWS = 3;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft;
var initialBricks;


// Brick Functions
function drawBricks() {
	for (var row = 0; row < BRICK_ROWS; row++) {
		for (var col = 0; col < BRICK_COLS; col++) {

			var arrayIndex = rowColToArrayIndex(col, row);

			if (brickGrid[arrayIndex]) {
				//colorRect(BRICK_W * col, BRICK_H * row, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, "blue");
				drawBitmapCenteredNoRotation(brickPic, BRICK_W * col + BRICK_W/2, BRICK_H * row + BRICK_H/2);
			}
		}
	}
}


function rowColToArrayIndex(col, row) {
	return col + BRICK_COLS * row;
}


function isBrickAtColRow(col, row) {
	if (col >= 0 &&
		col < BRICK_COLS &&
		row >= 0 &&
		row < BRICK_ROWS) {
		var brickIndexUnderCoord = rowColToArrayIndex(col, row);
		return brickGrid[brickIndexUnderCoord];
	} else {
		return false;
	}
}


function brickReset() {
	bricksLeft = 0;
	var i = 0;
	for (i = 0; i < GUTTER_ROWS * BRICK_COLS; i++) {
		brickGrid[i] = false;
	}
	for (; i < BRICK_COLS * BRICK_ROWS; i++) {
		brickGrid[i] = true;
		bricksLeft++;
	} // End of For Brick
	initialBricks = bricksLeft;
	ballSpeedY = INIT_BALL_SPEED_Y;
} // End of brickReset()


function ballBrickCollision() {
	// Ball-Brick Collision
	var ballBrickCol = Math.floor(ballX / BRICK_W);
	var ballBrickRow = Math.floor(ballY / BRICK_H);
	var brickIndexUnderBall = Math.floor(rowColToArrayIndex(ballBrickCol, ballBrickRow));

	if (ballBrickCol >= 0 &&
		ballBrickCol < BRICK_COLS &&
		ballBrickRow >= 0 &&
		ballBrickRow < BRICK_ROWS) {

		if (isBrickAtColRow(ballBrickCol, ballBrickRow)) {
			brickGrid[brickIndexUnderBall] = false;
			bricksLeft--;
			playerScore += 100;
			wall_clip.play();
			ballSpeedIncrease();

			var prevBallX = ballX - ballSpeedX;
			var prevBallY = ballY - ballSpeedY;
			var prevBrickCol = Math.floor(prevBallX / BRICK_W);
			var prevBrickRow = Math.floor(prevBallY / BRICK_H);

			var bothTestsFailed = true;

			if (prevBrickCol != ballBrickCol) {
				if (isBrickAtColRow(prevBrickCol, ballBrickRow) == false) {
					ballSpeedX *= -1;
					bothTestsFailed = false;
				}
			}
			if (prevBrickRow != ballBrickRow) {
				if (isBrickAtColRow(ballBrickCol, prevBrickRow) == false) {
					ballSpeedY *= -1;
					bothTestsFailed = false;
				}
			}
			if (bothTestsFailed) {	// Armpit Case
				ballSpeedX *= -1;
				ballSpeedY *= -1;
			}
		}
	}
	//console.log(bricksLeft);
}