// Ship Object
function movingWrapPositionClass() {
	// Ship Parameters
	this.x = 0;
	this.y = 0;


	this.move = function() {

		this.x += this.xv;
		this.y += this.yv;

		this.handleScreenWrap();
	}


	this.handleScreenWrap = function() {
		if (this.x < 0) {						// Moves off left side
			this.x += canvas.width;				// Wrap to right side
		} else if (this.x > canvas.width) {		// Moves off right side
			this.x -= canvas.width;				// Wrap to left side
		} else if (this.y < 0) {				// Moves off top side
			this.y += canvas.height;			// Wrap to bottom side
		} else if (this.y > canvas.height) {	// Moves off bottom side
			this.y -= canvas.height;			// Wrap to top side
		}
	}



	this.reset = function() {
		this.xv = 0;
		this.yv = 0;
		this.x = canvas.width/2;
		this.y = canvas.height/2;
	}
} // END OF movingWrapPositionClass() OBJECT
















