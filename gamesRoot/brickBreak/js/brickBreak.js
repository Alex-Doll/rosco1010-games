var canvas, canvasContext;

// Ball Parameters
var ballX = 0;
var ballY = 0;
const INIT_BALL_SPEED_X = 5;
const INIT_BALL_SPEED_Y = 7;
var ballSpeedX = INIT_BALL_SPEED_X;
var ballSpeedY = INIT_BALL_SPEED_Y;
const BALL_RADIUS = 10;

// Paddle Parameters
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const PADDLE_EDGE_DISTANCE = 60;
var paddleX = 0;
var paddleY = 0;

// Brick Parameters
const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const GUTTER_ROWS = 3;
var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft;

// Mouse Position
var mouseX;
var mouseY;


// Initialize
window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	var framesPerSecond = 30;
	var millisecondsPerFrame = 1000/framesPerSecond;

	paddleY = canvas.height - PADDLE_EDGE_DISTANCE - PADDLE_HEIGHT;		// Puts Bottom Edge of Paddle At canvas.height - PADDLE_EDGE_DISTANCE
	ballReset();
	brickReset();

	setInterval(animateAll, millisecondsPerFrame);

	canvas.addEventListener("mousemove",
		function(evt) {
			var mousePos = getMousePos(evt);
			paddleX = mousePos.x - PADDLE_WIDTH/2;
		});
	
};

function animateAll() {
	moveAll();
	drawAll();
}


function moveAll() {
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	collisionCheck();
}


function drawAll() {
	colorRect(0, 0, canvas.width, canvas.height, "black");;
	colorCircle(ballX, ballY, BALL_RADIUS, 0, 2*Math.PI, true, "white");
	colorRect(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
	drawBricks();
}


function drawBricks() {
	for (var row = 0; row < BRICK_ROWS; row++) {
		for (var col = 0; col < BRICK_COLS; col++) {

			var arrayIndex = rowColToArrayIndex(col, row);

			if (brickGrid[arrayIndex]) {
				colorRect(BRICK_W * col, BRICK_H * row, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, "blue");
			}
		}
	}
}


function rowColToArrayIndex(col, row) {
	return col + BRICK_COLS * row;
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
} // End of brickReset()


function colorRect(topLeftX, topLeftY, rectWidth, rectHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, rectWidth, rectHeight);
}


function colorCircle(centerX, centerY, circleRadius, startAngle, endAngle, anticlockwise, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, circleRadius, startAngle, endAngle, anticlockwise);
	canvasContext.fill();
}


function colorText(textContent, textX, textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(textContent, textX, textY);
}


function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	/*// Cheat To Test Ball Positions
	ballX = mouseX;
	ballY = mouseY;
	ballSpeedX = 4;
	ballSpeedY = -4;*/

	return {
		x: mouseX,
		y: mouseY
	};
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


function ballWallCollision() {
	// Ball-Wall Collision
	if (ballX < 0 && ballSpeedX < 0.0) {				// Left Side
		ballSpeedX *= -1;
	}
	if (ballX > canvas.width && ballSpeedX > 0.0) {		// Right Side
		ballSpeedX *= -1;
	}
	if (ballY < 0 && ballSpeedY < 0.0) {				// Top Side
		ballSpeedY *= -1;
	}
	if (ballY > canvas.height) {						// Bottom Side
		ballSpeedY *= -1;
		ballReset();
		brickReset();
	}
}


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


function ballPaddleCollision() {
	// Ball-Paddle Collision
	var paddleTopY = paddleY;
	var paddleBottomY = paddleY + PADDLE_HEIGHT;
	var paddleLeftX = paddleX;
	var paddleRightX = paddleX + PADDLE_WIDTH;

	if (ballY > paddleTopY &&			// Ball Below Top Edge	
		ballY < paddleBottomY &&		// Ball Above Bottom Edge
		ballX > paddleLeftX &&			// Ball Right of Left Edge
		ballX < paddleRightX) {			// Ball Left of Right Edge
		//console.log("\nballX: " + ballX + "\nballY: " + ballY);
		ballSpeedY *= -1;

		var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
		var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenterX * 0.35;

		if (bricksLeft == 0) {
			brickReset();
		}
	}
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


function ballReset() {
	ballX = canvas.width/2;
	ballY = canvas.height/2;

	ballSpeedX = INIT_BALL_SPEED_X;
	ballSpeedY = INIT_BALL_SPEED_Y;
}












































