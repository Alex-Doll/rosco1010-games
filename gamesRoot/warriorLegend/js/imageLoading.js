// Warrior Images
var blueWarriorPic = document.createElement("img");

// World Images
var worldPics = [];

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


function loadImageForWorldCode(worldCode, filename) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], filename);
}


function loadImages() {
	var imageList = [
	{varName: blueWarriorPic, theFile: "player1warrior.png"},

	{worldType: WORLD_ROAD, theFile: "world_road.png"},
	{worldType: WORLD_WALL, theFile: "world_wall.png"},
	{worldType: WORLD_GOAL, theFile: "world_goal.png"},
	{worldType: WORLD_KEY, theFile: "world_key.png"},
	{worldType: WORLD_DOOR, theFile: "world_door.png"}
	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode(imageList[i].worldType, imageList[i].theFile);
		}
	}
}