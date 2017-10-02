// input.js

// Input variables
var selectedUnits = [];

var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;
var isMouseDragging = false;

const MIN_DIST_TO_COUNT_DRAG = 30;
const MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE = 12;



function mousemoveHandler(evt) {
	var mousePos = getMousePos(evt);

	if (isMouseDragging) {
		lassoX2 = mousePos.x;
		lassoY2 = mousePos.y;
	}
}


function mousedownHandler(evt) {
	var mousePos = getMousePos(evt);
	lassoX1 = mousePos.x;
	lassoY1 = mousePos.y;
	lassoX2 = lassoX1;
	lassoY2 = lassoY1;
	isMouseDragging = true;
}


function mouseupHandler(evt) {
	var mousePos = getMousePos(evt);
	isMouseDragging = false;

	if (mouseMovedEnoughtToTreatAsDrag()) {
		selectedUnits = [];		// Clear the selection array

		for (var i = 0; i < playerUnits.length; i++) {
			if (playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)) {
				selectedUnits.push(playerUnits[i]);
			}
		}

		document.getElementById("debugText").innerHTML = "\nSelected " + selectedUnits.length + " units.";
	} else {
		var clickedUnit = getUnitUnderMouse(mousePos);

		if (clickedUnit != null && clickedUnit.playerControlled == false) { // Enemy?
			// Command Units to attack it!
			for (var i = 0; i < selectedUnits.length; i++) {
				selectedUnits[i].setTarget(clickedUnit);
			}
			document.getElementById("debugText").innerHTML = "Player commands " + selectedUnits.length + " units to attack!";
		} else {	// Didn't click enemy unit, direct any currently selected units to move
			var unitsAlongSide = Math.floor(Math.sqrt(selectedUnits.length+2));
			for (var i = 0; i < selectedUnits.length; i++) {
				selectedUnits[i].goToNear(mousePos.x, mousePos.y, i, unitsAlongSide);
			}
			document.getElementById("debugText").innerHTML = "\nMoving to: (" + mousePos.x + "," + mousePos.y + ")";
		}
	}
}


function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;

	return {
		x: mouseX,
		y: mouseY
	};
}


function mouseMovedEnoughtToTreatAsDrag() {
	var deltaX = lassoX2 - lassoX1;
	var deltaY = lassoY2 - lassoY1;
	var dragDist = Math.sqrt(deltaX**2 + deltaY**2);

	return (dragDist > MIN_DIST_TO_COUNT_DRAG);
}


function getUnitUnderMouse(currentMousePos) {
	return findClosestUnitInRange(currentMousePos.x, currentMousePos.y, MIN_DIST_FOR_MOUSE_CLICK_SELECTABLE, allUnits);
}





















































