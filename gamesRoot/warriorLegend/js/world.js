// World Parameters
const WORLD_W = 50;
const WORLD_H = 50;
const WORLD_GAP = 2;
const WORLD_COLS = 16;
const WORLD_ROWS = 12;
var levelOne = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
				1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
				1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
				1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
				1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
				1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
				1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
				1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
				1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
				1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var worldGrid = [];

const WORLD_ROAD = 0;
const WORLD_WALL = 1;
const WORLD_PLAYERSTART = 2;
const WORLD_GOAL = 3;
const WORLD_KEY = 4;
const WORLD_DOOR = 5;


function drawWorlds() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;

	for (var row = 0; row < WORLD_ROWS; row++) {
		for (var col = 0; col < WORLD_COLS; col++) {

			var tileKindHere = worldGrid[arrayIndex];
			var useImage = worldPics[tileKindHere];

			if (isTileTransparent(tileKindHere)) {
				canvasContext.drawImage(worldPics[WORLD_ROAD], drawTileX, drawTileY);
				canvasContext.drawImage(useImage, drawTileX, drawTileY);
			} else {
				canvasContext.drawImage(useImage, drawTileX, drawTileY);
			}

			drawTileX += WORLD_W;
			arrayIndex++;
		}
		drawTileX = 0;
		drawTileY += WORLD_H;
	}
}


function isTileTransparent(tileType) {
	return (tileType == WORLD_GOAL ||
			 tileType == WORLD_KEY ||
			  tileType == WORLD_DOOR)
}

function rowColToArrayIndex(col, row) {
	return col + WORLD_COLS * row;
}


function returnTileTypeAtColRow(col, row) {
	if (col >= 0 &&
		col < WORLD_COLS &&
		row >= 0 &&
		row < WORLD_ROWS) {
		var worldIndexUnderCoord = rowColToArrayIndex(col, row);
		return worldGrid[worldIndexUnderCoord];
	} else {
		return WORLD_WALL;
	}
}


function getTileTypeAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	
	if (warriorWorldCol >= 0 &&
		warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >=0 &&
		warriorWorldRow < WORLD_ROWS) {
		var tileHere = returnTileTypeAtColRow(warriorWorldCol, warriorWorldRow);

		return tileHere;
	} else {
		return WORLD_WALL;
	}
}


function getTileIndexAtPixelCoord(atX, atY) {
	var warriorWorldCol = Math.floor(atX / WORLD_W);
	var warriorWorldRow = Math.floor(atY / WORLD_H);
	
	if (warriorWorldCol >= 0 &&
		warriorWorldCol < WORLD_COLS &&
		warriorWorldRow >=0 &&
		warriorWorldRow < WORLD_ROWS) {
		var indexHere = rowColToArrayIndex(warriorWorldCol, warriorWorldRow);

		return indexHere;
	}
}












