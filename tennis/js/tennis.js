var canvas;
var canvasContext;
var frameRate; // Frames per second
var frameRateMil; // Milliseconds per frame
var ballX = 0;
var ballY = 0;
var ballSpeedX = 15;
var ballSpeedY = 15;
const PADDLE_WIDTH = 10;
const PADDLE_EDGE_DISTANCE = 50;
const PADDLE_HEIGHT = 100;
var playerPaddleY = 300 - PADDLE_HEIGHT/2;
var compPaddleY = 300 - PADDLE_HEIGHT/2;
var compDifficulty = 12;
var playerScore = 0;
var compScore = 0;
const WINNING_SCORE = 3;
var showingWinScreen = false;


window.onload = function() {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	frameRate = 30;
	frameRateMil = 1000/frameRate;

	ballX = canvas.width/2;
	ballY = canvas.height/2;

	setInterval(animate, frameRateMil);

	canvas.addEventListener("mousedown", handleMouseClick);

	canvas.addEventListener("mousemove", 
		function(evt) {
			var mousePos = getMousePos(evt);
			playerPaddleY = mousePos.y - PADDLE_HEIGHT/2;
		});
}


function draw() {

	// Draw Background
	canvasContext.fillStyle = "black";
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	if (showingWinScreen) {
		canvasContext.fillStyle = "white";
		if (playerScore >= WINNING_SCORE) {
			canvasContext.fillText("The Player Won!", canvas.width/2, canvas.height/4);
		}
		else if (compScore >= WINNING_SCORE) {
			canvasContext.fillText("The Computer Won...", canvas.width/2, canvas.height/4);
		}
		canvasContext.fillText("Click To Continue", 200, 200);
		return;
	}

	// Draw Net
	canvasContext.fillStyle = "white";
	drawNet();

	// Draw Left (Player) Paddle
	canvasContext.fillRect(PADDLE_EDGE_DISTANCE, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

	// Draw Right (Computer) Paddle
	canvasContext.fillRect(canvas.width - PADDLE_EDGE_DISTANCE - PADDLE_WIDTH, compPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

	// Draw Ball
	canvasContext.beginPath();
	canvasContext.arc(ballX, ballY, 10, 0, 2*Math.PI, true);
	canvasContext.fill();

	// Draw Score
	canvasContext.fillText(playerScore, 100, 100);
	canvasContext.fillText(compScore, canvas.width - 100, 100);
}


function move() {
	if (showingWinScreen) {
		return;
	}

	ballX += ballSpeedX;
	ballY += ballSpeedY;

	computerMove();

	// Left Side Paddle/Wall Collision
	if (ballX < PADDLE_EDGE_DISTANCE + PADDLE_WIDTH) {
		if ((ballY > playerPaddleY) && (ballY < playerPaddleY + PADDLE_HEIGHT) && (ballX > PADDLE_EDGE_DISTANCE)) {
			ballSpeedX = -1*ballSpeedX;

			var deltaY = ballY - (playerPaddleY+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}
		else if (ballX < 0) {
			compScore++;
			ballReset();
		}
	}

	// Right Side Paddle/Wall Collision
	if (ballX > canvas.width - PADDLE_EDGE_DISTANCE - PADDLE_WIDTH) {
		if ((ballY >compPaddleY) && (ballY < compPaddleY + PADDLE_HEIGHT) && (ballX < canvas.width - PADDLE_EDGE_DISTANCE)) {
			ballSpeedX = -1*ballSpeedX;

			var deltaY = ballY - (compPaddleY+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
		}
		else if (ballX > canvas.width) {
			playerScore++;
			ballReset();
		}
	}

	// Ball Collides with Top or Bottom Sides
	if (ballY > canvas.height || ballY < 0) {
		ballSpeedY = -1*ballSpeedY;
	}
}


function animate() {
	draw();
	move();
}


function drawNet() {
	var netThickness = 6;
	var netHeight = 20;
	var netGap = 30;

	netX = canvas.width/2 - netThickness/2;

	for(var netY=netGap/2; netY<canvas.height; netY += netHeight + netGap) {
		canvasContext.fillRect(netX, netY, netThickness, netHeight);
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


function ballReset() {
	if (playerScore >= WINNING_SCORE || compScore >= WINNING_SCORE) {
		showingWinScreen = true;
	}
	ballX = canvas.width/2;
	ballY = canvas.height/2;
	ballSpeedY = 0;
}


function computerMove() {
	if (compPaddleY + PADDLE_HEIGHT/2 < ballY - PADDLE_HEIGHT*0.25) {
		compPaddleY += compDifficulty;
	}
	else if (compPaddleY + PADDLE_HEIGHT/2 > ballY + PADDLE_HEIGHT*0.25) {
		compPaddleY -= compDifficulty;
	}
}


function handleMouseClick() {
	if (showingWinScreen) {
		playerScore = 0;
		compScore = 0;
		showingWinScreen = false;
	}
}





