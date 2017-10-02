// graphicsCommon.js

// General functions to be used in the HTML <canvas> element for creating graphics in JavaScript

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}


function coloredOutlineRectCornerToCorner(corner1X, corner1Y, corner2X, corner2Y, lineColor) {
	canvasContext.strokeStyle = lineColor;
	canvasContext.beginPath();
	canvasContext.rect(corner1X, corner1Y, corner2X - corner1X, corner2Y - corner1Y);
	canvasContext.stroke();
}


function colorRect(topLeftX, topLeftY, rectWidth, rectHeight, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillRect(topLeftX, topLeftY, rectWidth, rectHeight);
}


function colorCircle(centerX, centerY, circleRadius, startAngle, endAngle, anticlockwise, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, circleRadius, startAngle, endAngle, anticlockwise);
	canvasContext.fill();
}


function colorText(textContent, textX, textY, fillColor) {
	canvasContext.fillStyle = fillColor;
	canvasContext.fillText(textContent, textX, textY);
}


function clearScreen() {
	colorRect(0, 0, canvas.width, canvas.height, "black");
}