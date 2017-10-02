const UFO_SPEED = 1.9;
const UFO_TIME_BETWEEN_CHANGE_DIR = 85;
const UFO_COLLISION_RADIUS = 13;


ufoClass.prototype = new movingWrapPositionClass();


// UFO Object
function ufoClass() {
	// UFO Parameters
	this.x = 0;
	this.y = 0;
	this.ang = 0;
	this.xv;
	this.yv;
	this.myUfoPic;	// Which picture to use
	this.cycleTilDirectionChange;


	this.init = function(whichGraphic) {
		this.myUfoPic = whichGraphic;
		this.reset();
	}


	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myUfoPic, this.x, this.y, this.ang);
	}


	this.superclassMove = this.move;
	this.move = function() {
		this.superclassMove();

		this.cycleTilDirectionChange--;
		if (this.cycleTilDirectionChange <= 0) {
			var randAng = Math.random() * 2 * Math.PI;
			this.xv = Math.cos(randAng) * UFO_SPEED;
			this.yv = Math.sin(randAng) * UFO_SPEED;
			this.cycleTilDirectionChange = UFO_TIME_BETWEEN_CHANGE_DIR;
		}
	}


	this.superclassReset = this.reset;
	this.reset = function() {
		this.superclassReset();
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.cycleTilDirectionChange = 0;
	} // end of shipClass.reset()


	this.isOverlappingPoint = function(testX, testY) {
		var deltaX = testX - this.x;
		var deltaY = testY - this.y;
		var dist = Math.sqrt(deltaX**2 + deltaY**2);

		return (dist <= UFO_COLLISION_RADIUS);
	}

} // END OF shipClass() OBJECT


















