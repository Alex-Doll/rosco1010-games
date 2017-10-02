
const INIT_CAR_SPEED = 0;
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;


// Car Object
function carClass() {
	// Car Parameters
	this.x = 0;
	this.y = 0;
	this.ang = 0;
	this.speed = INIT_CAR_SPEED;
	this.myCarPic;	// Which picture to use
	this.name = "Untitled Car";

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.controlKeyUp;
	this.controlKeyLeft;
	this.controlKeyDown;
	this.controlKeyRight;


	this.setupInput = function(upKey, leftKey, downKey, rightKey) {
		this.controlKeyUp = upKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyDown = downKey;
		this.controlKeyRight = rightKey;
	}


	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
	}


	this.move = function() {
		this.speed *= GROUNDSPEED_DECAY_MULT;

		if (this.keyHeld_Gas) {
			this.speed += DRIVE_POWER;
		}
		if (this.keyHeld_Reverse) {
			this.speed -= REVERSE_POWER;
		}
		if (Math.abs(this.speed) > MIN_SPEED_TO_TURN) {
			if (this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE;
			}
			if (this.keyHeld_TurnRight) {
				this.ang += TURN_RATE;
			}
		}
		
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;

		carTrackCollision(this);
	}


	this.reset = function(whichImage, carName) {
		this.name = carName;
		this.myCarPic = whichImage;
		this.speed = 0;

		for (var row = 0; row < TRACK_ROWS; row++) {
			for (var col = 0; col < TRACK_COLS; col++) {

				var arrayIndex = rowColToArrayIndex(col, row);

				if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.ang = -Math.PI/2;
					this.x = col * TRACK_W + TRACK_W/2;
					this.y = row * TRACK_H + TRACK_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
	} // end of carReset()
} // END OF carClass() OBJECT