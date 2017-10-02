// unit.js

// Class CONSTANTS
const UNIT_PLACEHOLDER_RADIUS = 5;
const UNIT_SELECT_DIM_HALF = UNIT_PLACEHOLDER_RADIUS + 3;
const UNIT_PIXELS_MOVE_RATE = 2;
const UNIT_RANKS_SPACING = UNIT_PLACEHOLDER_RADIUS * 3
const UNIT_ATTACK_RANGE = 55;
const UNIT_AI_ATTACK_INITIATE = UNIT_ATTACK_RANGE + 10;
const UNIT_PLAYABLE_AREA_MARGIN = 20;


// Unit Class
function unitClass() {
	// Class variables
	this.x;
	this.y;
	this.goToX;
	this.goToY;
	this.isDead;
	this.playerControlled;
	this.unitColor;
	this.myTarget;


	// Class Functions
	this.resetAndSetPlayerTeam = function(playerTeam) {
		this.playerControlled = playerTeam;
		this.x = Math.random() * canvas.width/4;
		this.y = Math.random() * canvas.height/4;

		// Flip all non-player units to opposite corner
		if (this.playerControlled == false) {
			this.x = canvas.width - this.x;
			this.y = canvas.height - this.y;
			this.unitColor = "red";
		} else {
			this.unitColor = "white";
		}

		this.goToX = this.x;
		this.goToY = this.y;
		this.isDead = false;
		this.myTarget = null;
	} // End of reset() function


	this.drawSelectionBox = function() {
		coloredOutlineRectCornerToCorner(this.x - UNIT_SELECT_DIM_HALF,
										this.y - UNIT_SELECT_DIM_HALF,
										this.x + UNIT_SELECT_DIM_HALF,
										this.y + UNIT_SELECT_DIM_HALF, "green");
	} // End of drawSelectionBox() function


	this.draw = function() {
		if (!this.isDead) {
			colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, 0, 2*Math.PI, true, this.unitColor);
		}
	} // End of draw() function


	this.move = function() {
		if (this.myTarget != null) {
			if (this.myTarget.isDead) {
				this.myTarget = null;
				this.goToX = this.x;
				this.goToY = this.y;
			} else if (this.distFrom(this.myTarget.x, this.myTarget.y) > UNIT_ATTACK_RANGE) {
				this.goToX = this.myTarget.x;
				this.goToY = this.myTarget.y;
			} else {
				this.myTarget.isDead = true;
				soonCheckUnitsToClear();
				this.goToX = this.x;
				this.goToY = this.y;
			}
		} else if (this.playerControlled == false) {
			if (Math.random() < 0.02) {
				var nearestOpponentFound = findClosestUnitInRange(this.x, this.y, UNIT_AI_ATTACK_INITIATE, playerUnits);
				if (nearestOpponentFound != null) {
					this.myTarget = nearestOpponentFound;
				} else {
					this.goToX = this.x - Math.random()*70;
					this.goToY = this.y - Math.random()*70;
				} // End of else, no target found in attack radius
			} // End of randomized AI response lag check
		} // End of playerControlled == false

		this.keepInPlayableArea();

		var deltaX = this.goToX - this.x;
		var deltaY = this.goToY - this.y;
		var distToGo = Math.sqrt(deltaX**2 + deltaY**2);
		moveX = UNIT_PIXELS_MOVE_RATE * deltaX / distToGo;
		moveY = UNIT_PIXELS_MOVE_RATE * deltaY / distToGo;

		if (distToGo > UNIT_PIXELS_MOVE_RATE) {
			this.x += moveX;
			this.y += moveY;
		} else {
			this.x = this.goToX;
			this.y = this.goToY;
		}
	} // End of move() function


	this.goToNear = function(aroundX, aroundY, formationPos, formationDim) {
		var colNum = formationPos % formationDim;
		var rowNum = Math.floor(formationPos / formationDim);
		this.goToX = aroundX + colNum * UNIT_RANKS_SPACING;
		this.goToY = aroundY + rowNum * UNIT_RANKS_SPACING;
	}


	this.keepInPlayableArea = function() {
		if (this.goToX < UNIT_PLAYABLE_AREA_MARGIN) {
			this.goToX = UNIT_PLAYABLE_AREA_MARGIN;
		} else if (this.goToX > canvas.width - UNIT_PLAYABLE_AREA_MARGIN) {
			this.goToX = canvas.width - UNIT_PLAYABLE_AREA_MARGIN;
		}

		if (this.goToY < UNIT_PLAYABLE_AREA_MARGIN) {
			this.goToY = UNIT_PLAYABLE_AREA_MARGIN;
		} else if (this.goToY > canvas.height - UNIT_PLAYABLE_AREA_MARGIN) {
			this.goToY = canvas.height - UNIT_PLAYABLE_AREA_MARGIN;
		}
	}


	this.setTarget = function(newTarget) {
		this.myTarget = newTarget;
	} // End of setTarget() function


	this.isInBox = function(x1, y1, x2, y2) {
		var leftX;
		var rightX;
		if (x1 < x2) {
			leftX = x1;
			rightX = x2;
		} else {
			leftX = x2;
			rightX = x1;
		}

		var topY;
		var bottomY;
		if (y1 < y2) {
			topY = y1;
			bottomY = y2;
		} else {
			topY = y2;
			bottomY = y1;
		}

		if (this.x < leftX) {
			return false;
		}
		if (this.y < topY) {
			return false;
		}
		if (this.x > rightX) {
			return false;
		}
		if (this.y > bottomY) {
			return false;
		}
		return true;
	} // End of isInBox() function


	this.distFrom = function(otherX, otherY) {
		var deltaX = otherX - this.x;
		var deltaY = otherY - this.y;
		return Math.sqrt(deltaX**2 + deltaY**2);
	} // End of distFrom() function

} // End of unitClass() object



















