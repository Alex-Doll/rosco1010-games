// unitTeam.js
const PLAYER_START_UNITS = 20;
var playerUnits = [];

const ENEMY_START_UNITS = 15;
var enemyUnits = [];

var allUnits = [];

var anyNewUnitsToClear = false;


function soonCheckUnitsToClear() {
	anyNewUnitsToClear = true;
}


function findClosestUnitInRange(fromX, fromY, maxRange, inUnitList) {
	var nearestOpponentDist = maxRange;
	var nearestOpponentFound = null;
	for (var i = 0; i < inUnitList.length; i++) {
		var distTo = inUnitList[i].distFrom(fromX, fromY);
		if (distTo < nearestOpponentDist) {
			nearestOpponentDist = distTo;
			nearestOpponentFound = inUnitList[i];
		}
	}

	return nearestOpponentFound;
}


function checkAndHandleVictory() {
	if (playerUnits.length == 0 && enemyUnits.length == 0) {
		document.getElementById("debugText").innerHTML = "IT'S A...DRAW?!?";
	} else if (playerUnits.length == 0) {
		document.getElementById("debugText").innerHTML = "ENEMY TEAM WINS...";
	} else if (enemyUnits.length == 0) {
		document.getElementById("debugText").innerHTML = "PLAYER TEAM WINS!";
	}
}


function addNewUnitToTeam(spawnedUnit, fightsForTeam) {
	fightsForTeam.push(spawnedUnit);
	allUnits.push(spawnedUnit);
}


function populateTeam(whichTeam, howMany, isPlayerControlled) {
	for (var i = 0; i < howMany; i++) {
		var spawnUnit = new unitClass();
		spawnUnit.resetAndSetPlayerTeam(isPlayerControlled);
		addNewUnitToTeam(spawnUnit, whichTeam);
	}
}


function removeDeadUnitsFromList(fromArray) {
	for (var i = fromArray.length - 1; i >= 0; i--) {
		if (fromArray[i].isDead) {
			fromArray.splice(i, 1);
		}
	}
}


function removeDeadUnits() {
	if (anyNewUnitsToClear) {
		removeDeadUnitsFromList(allUnits);
		removeDeadUnitsFromList(playerUnits);
		removeDeadUnitsFromList(enemyUnits);
		removeDeadUnitsFromList(selectedUnits);

		anyNewUnitsToClear = false;
	}
}

















