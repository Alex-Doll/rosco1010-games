// paddle.js

// Paddle Parameters
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 15;
const PADDLE_EDGE_DISTANCE = 60;
var paddleX = 0;
var paddleY = 0;


// Paddle Functions
function drawPaddle() {
	//colorRect(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");
	drawBitmapCenteredNoRotation(playerPaddlePic, paddleX + PADDLE_WIDTH/2, paddleY + PADDLE_HEIGHT/2);
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
		hit_clip.play();

		var centerOfPaddleX = paddleX + PADDLE_WIDTH/2;
		var ballDistFromPaddleCenterX = ballX - centerOfPaddleX;
		ballSpeedX = ballDistFromPaddleCenterX * 0.35;

		if (bricksLeft == 0) {
			brickReset();
		}
	}
}