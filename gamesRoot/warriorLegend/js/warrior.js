const PLAYER_WALK_SPEED = 4.0;


// Warrior Object
function warriorClass() {
	// Warrior Parameters
	this.x = 0;
	this.y = 0;
	this.myWarriorPic;	// Which picture to use
	this.name = "Untitled Warrior";
	this.keysOwned = 0;

	this.keyHeld_North = false;
	this.keyHeld_South = false;
	this.keyHeld_West = false;
	this.keyHeld_East = false;

	this.controlKeyUp;
	this.controlKeyLeft;
	this.controlKeyDown;
	this.controlKeyRight;

	this.altKeyUp;
	this.altKeyLeft;
	this.altKeyDown;
	this.altKeyRight;


	this.setupInput = function(upKey, leftKey, downKey, rightKey, altUp, altLeft, altDown, altRight) {
		this.controlKeyUp = upKey;
		this.controlKeyLeft = leftKey;
		this.controlKeyDown = downKey;
		this.controlKeyRight = rightKey;

		this.altKeyUp = altUp;
		this.altKeyLeft = altLeft;
		this.altKeyDown = altDown;
		this.altKeyRight = altRight;
	}


	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myWarriorPic, this.x, this.y, 0);
	}


	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;
		
		if (this.keyHeld_North) {
			nextY -= PLAYER_WALK_SPEED;
		}
		if (this.keyHeld_South) {
			nextY += PLAYER_WALK_SPEED;
		}
		if (this.keyHeld_West) {
			nextX -= PLAYER_WALK_SPEED;
		}
		if (this.keyHeld_East) {
			nextX += PLAYER_WALK_SPEED;
		}

		var walkIntoTileType = getTileTypeAtPixelCoord(nextX, nextY);
		var walkIntoTileIndex = getTileIndexAtPixelCoord(nextX, nextY);

		switch (walkIntoTileType) {
			case WORLD_ROAD:
				this.x = nextX;
				this.y = nextY;
				break;
			case WORLD_GOAL:
				document.getElementById("debugText").innerHTML = this.name + " WINS!";
				this.x = nextX;
				this.y = nextY;
				worldGrid[walkIntoTileIndex] = WORLD_ROAD;	// Change goal to road
				loadLevel(levelOne);
				break;
			case WORLD_KEY:
				this.keysOwned++;
				document.getElementById("debugText").innerHTML = "Keys: " + this.keysOwned;
				this.x = nextX;
				this.y = nextY;
				worldGrid[walkIntoTileIndex] = WORLD_ROAD;	// Change key to road
				break;
			case WORLD_DOOR:
				if (this.keysOwned > 0) {
					this.keysOwned--;
					document.getElementById("debugText").innerHTML = "Keys: " + this.keysOwned;
					this.x = nextX;
					this.y = nextY;
					worldGrid[walkIntoTileIndex] = WORLD_ROAD;	// Change door to road
				}
				break;
		}
	}


	this.reset = function(whichImage, warriorName) {
		this.name = warriorName;
		this.myWarriorPic = whichImage;

		for (var row = 0; row < WORLD_ROWS; row++) {
			for (var col = 0; col < WORLD_COLS; col++) {

				var arrayIndex = rowColToArrayIndex(col, row);

				if (worldGrid[arrayIndex] == WORLD_PLAYERSTART) {
					worldGrid[arrayIndex] = WORLD_ROAD;
					this.x = col * WORLD_W + WORLD_W/2;
					this.y = row * WORLD_H + WORLD_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
	} // end of warriorReset()
} // END OF warriorClass() OBJECT