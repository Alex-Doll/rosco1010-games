// Theme Parameters
const THEME_DAY = 0;
const THEME_NIGHT = 1;
var currentTheme = THEME_NIGHT;

// Car Images
var carPics = [[],[]];

// Track Images
var trackPics = [[],[]];

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

function loadImageForCarPic(theme, carPicCode, filename) {
	carPics[theme][carPicCode] = document.createElement("img");
	beginLoadingImage(carPics[theme][carPicCode], filename);
}


function loadImageForTrackCode(theme, trackCode, filename) {
	trackPics[theme][trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[theme][trackCode], filename);
}


function loadImages() {
	var imageList = [
	{theme: THEME_DAY, carType: BLUE_CAR, theFile: "player1car_day.png"},
	{theme: THEME_DAY, carType: GREEN_CAR, theFile: "player2car_day.png"},

	{theme: THEME_NIGHT, carType: BLUE_CAR, theFile: "player1car_night.png"},
	{theme: THEME_NIGHT, carType: GREEN_CAR, theFile: "player2car_night.png"},

	{theme: THEME_DAY, trackType: TRACK_ROAD, theFile: "track_road_day.png"},
	{theme: THEME_DAY, trackType: TRACK_WALL, theFile: "track_wall_day.png"},
	{theme: THEME_DAY, trackType: TRACK_GOAL, theFile: "track_goal_day.png"},
	{theme: THEME_DAY, trackType: TRACK_TREE, theFile: "track_treeWall_day.png"},
	{theme: THEME_DAY, trackType: TRACK_FLAG, theFile: "track_flagWall_day.png"},
	{theme: THEME_DAY, trackType: TRACK_GRASS, theFile: "track_grass_day.png"},
	{theme: THEME_DAY, trackType: TRACK_OIL, theFile: "track_oil_day.png"},

	{theme: THEME_NIGHT, trackType: TRACK_ROAD, theFile: "track_road_night.png"},
	{theme: THEME_NIGHT, trackType: TRACK_WALL, theFile: "track_wall_night.png"},
	{theme: THEME_NIGHT, trackType: TRACK_GOAL, theFile: "track_goal_night.png"},
	{theme: THEME_NIGHT, trackType: TRACK_TREE, theFile: "track_treeWall_night.png"},
	{theme: THEME_NIGHT, trackType: TRACK_FLAG, theFile: "track_flagWall_night.png"},
	{theme: THEME_NIGHT, trackType: TRACK_GRASS, theFile: "track_grass_night.png"},
	{theme: THEME_NIGHT, trackType: TRACK_OIL, theFile: "track_oil_night.png"}
	];

	picsToLoad = imageList.length;

	for (var i = 0; i < imageList.length; i++) {
		if (imageList[i].carType != undefined) {
			loadImageForCarPic(imageList[i].theme, imageList[i].carType, imageList[i].theFile);
		} else {
			loadImageForTrackCode(imageList[i].theme, imageList[i].trackType, imageList[i].theFile);
		}
	}
}


function randomTrackTheme() {
	var randomTheme = Math.random();
	if (randomTheme < 0.5) {
		currentTheme = THEME_DAY;
	} else {
		currentTheme = THEME_NIGHT;
	}
}














