// imageLoading.js

// Images
var playerPaddlePic = document.createElement("img");
var ballPic = document.createElement("img");
var backgroundPic = document.createElement("img");
var brickPic = document.createElement("img");
var lifePic = document.createElement("img");
var titlescreenPic = document.createElement("img");

var picsToLoad = 0;	// Set automatically based on imageList in loadImages()


function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
		if (picsToLoad == 0) {
			imageLoadingDoneSoStartGame();
		}
}


function beginLoadingImage(imgVar, filename) {
	imgVar.src = "img/" + filename;
	imgVar.onload = countLoadedImagesAndLaunchIfReady();
}


function loadImages() {
	var imageList = [
	{varName: playerPaddlePic, theFile: "paddle.png"},
	{varName: ballPic, theFile: "ball.png"},
	{varName: backgroundPic, theFile: "bg.jpg"},
	{varName: brickPic, theFile: "brick.png"},
	{varName: lifePic, theFile: "life.png"},
	{varName: titlescreenPic, theFile: "titlescreen.jpg"}];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
}