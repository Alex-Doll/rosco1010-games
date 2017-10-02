// Track Parameters
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

var levelsArray = [levelOne, levelTwo, levelThree];
var levelCounter = 0;
var currentLevel;
var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;
const TRACK_GRASS = 6;
const TRACK_OIL = 7;

// Special Tile Parameters
const GRASS_SPEED = 2;


function drawTracks() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	for (var row = 0; row < TRACK_ROWS; row++) {
		for (var col = 0; col < TRACK_COLS; col++) {

			var tileKindHere = trackGrid[arrayIndex];
			var useImage = trackPics[currentTheme][tileKindHere];

			canvasContext.drawImage(useImage, drawTileX, drawTileY);

			drawTileX += TRACK_W;
			arrayIndex++;
		}
		drawTileX = 0;
		drawTileY += TRACK_H;
	}
}


function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}


function returnTyleTypeAtColRow(col, row) {
	if (col >= 0 &&
		col < TRACK_COLS &&
		row >= 0 &&
		row < TRACK_ROWS) {
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		return trackGrid[trackIndexUnderCoord];
	} else {
		return TRACK_WALL;
	}
}


function carTrackCollision(whichCar) {
	// Car-Track Collision
	var carTrackCol = Math.floor(whichCar.x / TRACK_W);
	var carTrackRow = Math.floor(whichCar.y / TRACK_H);
	var trackIndexUnderCar = Math.floor(rowColToArrayIndex(carTrackCol, carTrackRow));

	if (carTrackCol >= 0 &&
		carTrackCol < TRACK_COLS &&
		carTrackRow >= 0 &&
		carTrackRow < TRACK_ROWS) {

		var tileHere = returnTyleTypeAtColRow(carTrackCol, carTrackRow);

		if (tileHere == TRACK_GOAL) {
			console.log(whichCar.name + " WINS!\n");
			setWinnerTime(whichCar.name);
			changeTrack();
		} else if (tileHere == TRACK_ROAD) {
			whichCar.canTurn = true;
		} else if (tileHere == TRACK_GRASS) {
			whichCar.speed = GRASS_SPEED;
		} else if (tileHere == TRACK_OIL) {
			whichCar.canTurn = false;
		} else if (tileHere != TRACK_ROAD) {
			whichCar.x -= Math.cos(whichCar.ang) * whichCar.speed;
			whichCar.y -= Math.sin(whichCar.ang) * whichCar.speed;

			whichCar.speed *= -0.5;
		} // End of Track Found
	} // End of Valid Col and Row
} // End of carTrackCollision()


function changeTrack() {
	if (levelCounter < levelsArray.length - 1) {
		levelCounter++;
	} else {
		levelCounter = 0;
	}
	
	randomTrackTheme();
	currentLevel = levelsArray[levelCounter];
	loadLevel(currentLevel);
}



















