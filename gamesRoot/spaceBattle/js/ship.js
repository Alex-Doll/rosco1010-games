const SPACESPEED_DECAY_MULT = 0.99;
const THRUST_POWER = 0.15;
const TURN_RATE = 0.03;


shipClass.prototype = new movingWrapPositionClass();


// Ship Object
function shipClass() {
	// Ship Parameters
	this.x = 0;
	this.y = 0;
	this.ang = 0;
	this.xv;
	this.yv;
	this.myShipPic;	// Which picture to use

	this.keyHeld_Gas = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.controlKeyUp;
	this.controlKeyLeft;
	this.controlKeyRight;
	this.controlKeyForShotFire;


	this.setupInput = function(upKey, leftKey, downKey, rightKey, shotKey) {
		this.controlKeyUp = upKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyDown = downKey;
		this.controlKeyRight = rightKey;
		this.controlKeyForShotFire = shotKey;
	}


	this.init = function(whichGraphic) {
		this.myShot = new shotClass();
		this.myShipPic = whichGraphic;
		this.reset();
	}


	this.draw = function() {
		this.myShot.draw();
		drawBitmapCenteredWithRotation(this.myShipPic, this.x, this.y, this.ang);
	}


	this.superclassMove = this.move;
	this.move = function() {

		if (this.keyHeld_Gas) {
			this.xv += Math.cos(this.ang) * THRUST_POWER;
			this.yv += Math.sin(this.ang) * THRUST_POWER;
		}
		if (this.keyHeld_TurnLeft) {
			this.ang -= TURN_RATE * Math.PI;
		}
		if (this.keyHeld_TurnRight) {
			this.ang += TURN_RATE * Math.PI;
		}

		this.superclassMove();

		this.xv *= SPACESPEED_DECAY_MULT;
		this.yv *= SPACESPEED_DECAY_MULT;

		this.myShot.move();
	}


	this.superclassReset = this.reset;
	this.reset = function() {
		this.superclassReset();
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.ang = -0.5 * Math.PI;
		this.myShot.reset();
	} // end of shipClass.reset()


	this.cannonFire = function() {
		if (this.myShot.isShotReadyToFire()) {
			this.myShot.shootFrom(this);
		}
	}


	this.checkMyShipAndShotCollisionAgainst = function(thisEnemy) {
		if (thisEnemy.isOverlappingPoint(this.x, this.y)) {
			this.reset();
			document.getElementById("debugText").innerHTML = "Mission Status: Player Crashed!";
		}
		if (this.myShot.hitTest(thisEnemy)) {
			thisEnemy.reset();
			this.myShot.reset();
			document.getElementById("debugText").innerHTML = "Mission Status: Enemy Blasted!";
		}
	}

} // END OF shipClass() OBJECT


















