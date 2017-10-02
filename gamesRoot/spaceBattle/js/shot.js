
const SHOT_SPEED = 6.0;
const SHOT_LIFE = 30;
const SHOT_DISPLAY_RADIUS = 2.0;


shotClass.prototype = new movingWrapPositionClass();


// Ship Object
function shotClass() {
	// Ship Parameters
	this.x = 0;
	this.y = 0;
	this.shotLife;
	this.color = "white";


	this.draw = function() {
		if (this.shotLife > 0) {
			colorCircle(this.x, this.y, SHOT_DISPLAY_RADIUS, 0, 2*Math.PI, true, this.color);
		}
	}

	this.superclassMove = this.move;
	this.move = function() {
		if (this.shotLife > 0) {
			this.shotLife--;
			this.superclassMove();
		}
	}


	this.isShotReadyToFire = function() {
		return (this.shotLife <= 0);
	}


	this.shootFrom = function(shipFiring) {
			this.x = shipFiring.x;
			this.y = shipFiring.y;

			this.xv = Math.cos(shipFiring.ang) * SHOT_SPEED + shipFiring.xv;
			this.yv = Math.sin(shipFiring.ang) * SHOT_SPEED + shipFiring.yv;

			this.shotLife = SHOT_LIFE;
	}


	this.superclassReset = this.reset;
	this.reset = function() {
		this.superclassReset();
		this.shotLife = 0;
	} // end of shipClass.reset()


	this.hitTest = function(thisEnemy) {
		if (this.shotLife <= 0) {
			return false;
		}

		return thisEnemy.isOverlappingPoint(this.x, this.y);
	}

} // END OF shipClass() OBJECT
















