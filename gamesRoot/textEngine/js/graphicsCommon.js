// graphicsCommon.js

// General functions to be used in the HTML <canvas> element for creating graphics in JavaScript


function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.rotate(withAng);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
}


function drawBitmapCenteredNoRotation(useBitmap, atX, atY) {
	canvasContext.save();
	canvasContext.translate(atX, atY);
	canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
	canvasContext.restore();
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


function colorText(textContent, textX, textY, fillColor, sizeFont) {
	canvasContext.fillStyle = fillColor;
	canvasContext.font = sizeFont;
	canvasContext.fillText(textContent, textX, textY);
}


function clearScreen(clearColor) {
	colorRect(0, 0, canvas.width, canvas.height, clearColor);
}