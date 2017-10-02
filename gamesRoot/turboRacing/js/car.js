
const INIT_CAR_SPEED = 0;
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.06;
const MIN_SPEED_TO_TURN = 0.5;
const NITRO_BOOST_MULT = 1.2;
const NITRO_BOOST_TURN_DECAY_MULT = 0.25;

const BLUE_CAR = 0;
const GREEN_CAR = 1;
var isBlueCarPlayerControlled = true;

const CAR_COLLISION_DISTANCE = 25;	// Cars are 20px wide, 30px long, collisions detected from car center
										// Front to front collision is 30px
										// Side to side collision is 20px
										// Front to side collision is 25px


// Car Object
function carClass() {
	// Car Parameters
	this.x = 0;
	this.y = 0;
	this.ang = 0;
	this.speed = INIT_CAR_SPEED;
	this.myCarPic;	// Which picture to use
	this.name = "Untitled Car";
	this.canTurn = true;
	this.isPlayerControlled = true;
	this.hasNitroBoost = true;
	this.usingNitroBoost = false;
	this.nitroBoostStartTime;
	this.nitroLengthSeconds = 1;

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.controlKeyUp;
	this.controlKeyLeft;
	this.controlKeyDown;
	this.controlKeyRight;
	this.controlNitroKey;


	this.setupInput = function(upKey, leftKey, downKey, rightKey, nitroKey) {
		this.controlKeyUp = upKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyDown = downKey;
		this.controlKeyRight = rightKey;
		this.controlNitroKey = nitroKey;
	}


	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
	}


	this.move = function() {
		this.speed *= GROUNDSPEED_DECAY_MULT;

		// Wonky Computer AI
		if (!this.isPlayerControlled) {
			var randomSteer = Math.random();
			if (randomSteer < 0.25) {
				this.keyHeld_Gas = !this.keyHeld_Gas;
			} else if (randomSteer >= 0.25 && randomSteer < 0.5) {
				this.keyHeld_Reverse = !this.keyHeld_Reverse;
			} else if (randomSteer >= 0.5 && randomSteer < 0.75) {
				this.keyHeld_TurnLeft = !this.keyHeld_TurnLeft;
				this.keyHeld_Reverse = !this.keyHeld_Reverse;
			} else {
				this.keyHeld_TurnRight = !this.keyHeld_TurnRight;
				this.keyHeld_Gas = !this.keyHeld_Gas;
			}
		}

		if (this.keyHeld_Gas) {
			this.speed += DRIVE_POWER;
		}
		if (this.keyHeld_Reverse) {
			this.speed -= REVERSE_POWER;
		}
		if (Math.abs(this.speed) > MIN_SPEED_TO_TURN && this.canTurn) {
			if (this.keyHeld_TurnLeft) {
				this.ang -= TURN_RATE;
			}
			if (this.keyHeld_TurnRight) {
				this.ang += TURN_RATE;
			}
		}

		if (this.usingNitroBoost) {
			if (this.keyHeld_Gas) {
				this.speed += DRIVE_POWER * NITRO_BOOST_MULT;
			}
			if (this.keyHeld_Reverse) {
				this.speed -= REVERSE_POWER * NITRO_BOOST_MULT;
			}
			if (Math.abs(this.speed) > MIN_SPEED_TO_TURN && this.canTurn) {
				if (this.keyHeld_TurnLeft) {
					this.ang -= TURN_RATE * NITRO_BOOST_TURN_DECAY_MULT;
				}
				if (this.keyHeld_TurnRight) {
					this.ang += TURN_RATE * NITRO_BOOST_TURN_DECAY_MULT;
				}
			}
			
			updateNitroTime(this);
		}
		
		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;

		carTrackCollision(this);
	}


	this.reset = function(whichImage, carName, playerControlled) {
		this.name = carName;
		this.myCarPic = whichImage;
		this.speed = 0;
		this.isPlayerControlled = playerControlled;
		this.hasNitroBoost = true;

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


// Random Car Functions
function carToCarCollisionCheck(firstCar, secondCar) {
	var distBetweenCars = Math.sqrt((secondCar.x - firstCar.x)**2 + (secondCar.y - firstCar.y)**2);
	//console.log(distBetweenCars);

	if (distBetweenCars < CAR_COLLISION_DISTANCE) {
		firstCar.x -= Math.cos(firstCar.ang) * firstCar.speed;
		firstCar.y -= Math.sin(firstCar.ang) * firstCar.speed;

		firstCar.speed *= -0.5;

		secondCar.x -= Math.cos(secondCar.ang) * secondCar.speed;
		secondCar.y -= Math.sin(secondCar.ang) * secondCar.speed;

		secondCar.speed *= -0.5;
	}
}










