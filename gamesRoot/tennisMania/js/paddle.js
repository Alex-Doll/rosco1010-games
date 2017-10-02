// paddle.js


// Paddle Parameters
const PADDLE_WIDTH = 18;
const PADDLE_EDGE_DISTANCE = 80;
const PADDLE_HEIGHT = 100;
var playerPaddleY = 300 - PADDLE_HEIGHT/2;
var playerPaddleX = PADDLE_EDGE_DISTANCE;
var compPaddleY = 300 - PADDLE_HEIGHT/2;
var compPaddleX = 800 - PADDLE_EDGE_DISTANCE - PADDLE_WIDTH;		// 800 is canvas.width
var compDifficulty = 14;

const KEY_PADDLE_MOVE_SPEED = 10;


// Paddle Functions
function drawPaddles() {
	// Draw Left (Player) Paddle
	drawBitmapCenteredNoRotation(playerPaddlePic, playerPaddleX + PADDLE_WIDTH/2, playerPaddleY + PADDLE_HEIGHT/2);

	// Draw Right (Computer) Paddle
	drawBitmapCenteredNoRotation(compPaddlePic, compPaddleX + PADDLE_WIDTH/2, compPaddleY + PADDLE_HEIGHT/2);
}


function playerMove(evt) {
	var mousePos = getMousePos(evt);
	playerPaddleY = mousePos.y - PADDLE_HEIGHT/2;
}


function computerMove() {
	if (compPaddleY + PADDLE_HEIGHT/2 < ballY - PADDLE_HEIGHT*0.25) {
		compPaddleY += compDifficulty;
	}
	else if (compPaddleY + PADDLE_HEIGHT/2 > ballY + PADDLE_HEIGHT*0.25) {
		compPaddleY -= compDifficulty;
	}
}


function playerLeftMove() {
	if (pLKeyHeld_Up && playerPaddleY > 0) {
		playerPaddleY -= KEY_PADDLE_MOVE_SPEED;
	}
	if (pLKeyHeld_Down && playerPaddleY + PADDLE_HEIGHT < canvas.height) {
		playerPaddleY += KEY_PADDLE_MOVE_SPEED;
	}
}


function playerRightMove() {
	if (pRKeyHeld_Up && compPaddleY > 0) {
		compPaddleY -= KEY_PADDLE_MOVE_SPEED;
	}
	if (pRKeyHeld_Down && compPaddleY + PADDLE_HEIGHT < canvas.height) {
		compPaddleY += KEY_PADDLE_MOVE_SPEED;
	}
}


function ballPaddleCollision(whosePaddleX, whosePaddleY) {
	var paddleTopY = whosePaddleY;
	var paddleBottomY = whosePaddleY + PADDLE_HEIGHT;
	var paddleLeftX = whosePaddleX;
	var paddleRightX = whosePaddleX + PADDLE_WIDTH;

	if (ballY > paddleTopY &&			// Ball Below Top Edge	
		ballY < paddleBottomY &&		// Ball Above Bottom Edge
		ballX > paddleLeftX &&			// Ball Right of Left Edge
		ballX < paddleRightX) {			// Ball Left of Right Edge

		updateBallSpeedX();
		ballSpeedX *= -1;

		var centerOfPaddleY = whosePaddleY + PADDLE_HEIGHT/2;
		var ballDistFromPaddleCenterY = ballY - centerOfPaddleY;
		ballSpeedY = ballDistFromPaddleCenterY * 0.35;
		hit_audio.play();	
	}
}







