// Car Images
var blueCarPic = document.createElement("img");
var greenCarPic = document.createElement("img");

// Track Images
var trackPics = [];

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


function loadImageForTrackCode(trackCode, filename) {
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], filename);
}


function loadImages() {
	var imageList = [
	{varName: blueCarPic, theFile: "player1car.png"},
	{varName: greenCarPic, theFile: "player2car.png"},

	{trackType: TRACK_ROAD, theFile: "track_road.png"},
	{trackType: TRACK_WALL, theFile: "track_wall.png"},
	{trackType: TRACK_GOAL, theFile: "track_goal.png"},
	{trackType: TRACK_TREE, theFile: "track_tree.png"},
	{trackType: TRACK_FLAG, theFile: "track_flag.png"}
	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
	}
}