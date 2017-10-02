// soundOverlaps.js

var audioFormat;

function setFormat() {
	var audio = new Audio();
	if (audio.canPlayType("audio/mp3")) {
		audioFormat = ".mp3";
	} else {
		audioFormat = ".oog";
	}
}


// soundOverlaps Class
function soundOverlapsClass(filenameWithPath) {
	// Class Variables
	this.altSoundTurn;
	this.altSound;
	this.mainSound;


	// Class Construction
	setFormat();

	this.altSoundTurn = false;
	this.mainSound = new Audio(filenameWithPath + audioFormat);
	this.altSound = new Audio(filenameWithPath + audioFormat);

	// Class Functions
	this.play = function() {
		if (this.altSoundTurn) {
			this.altSound.currentTime = 0;
			this.altSound.play();
		} else {
			this.mainSound.currentTime = 0;
			this.mainSound.play();
		}

		this.altSoundTurn = !this.altSoundTurn;		// Toggle between true and false
	}
}


// backgroundMusic Class
function backgroundMusicClass() {
	// Class Variables
	var musicSound = null;


	// Class Construction
	setFormat();

	// Class Functions
	this.loopSong = function(filenameWithPath) {
		if (musicSound != null) {
			musicSound.pause();
			musicSound = null;
		}

		musicSound = new Audio(filenameWithPath + audioFormat);
		musicSound.loop = true;
		musicSound.play();
	}


	this.startOrStopMusic = function() {
		if (musicSound.paused) {
			musicSound.play()
		} else {
			musicSound.pause();
		}
	}

}


























