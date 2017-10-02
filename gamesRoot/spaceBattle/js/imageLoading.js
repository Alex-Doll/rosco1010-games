// Images
var player1ShipPic = document.createElement("img");
var ufoPic = document.createElement("img");

var picsToLoad = 0;	// Set automatically based on imageList in loadImages()


function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
		if (picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
		}
}


function beginLoadingImage(imgVar, filename) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady();
	imgVar.src = "img/" + filename;
}


function loadImages() {
	var imageList = [
	{varName: player1ShipPic, theFile: "player1ship.png"},
	{varName: ufoPic, theFile: "ufo.png"}];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
	}
}