const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lines = input.split('\n');
lines = lines.filter(e => e);

function within(x, y) {
	return x >= 0 && y >= 0 && x < lines[0].length && y < lines.length;
}

function lineClear(x, y, dx, dy) {
	var h = lines[y][x];
	x += dx;
	y += dy;
	while (within(x,y)) {
		if (lines[y][x] >= h) return false;
		x += dx;
		y += dy;
	}
	return true;
}
function lineCount(x, y, dx, dy) {
	var h = lines[y][x];
	var count = 0;
	x += dx;
	y += dy;
	while (within(x,y)) {
		count++;
		if (lines[y][x] >= h) break;
		x += dx;
		y += dy;
	}
	return count;
}

function isVisible(x, y) {
	return lineClear(x,y,1,0) || lineClear(x,y,-1,0) || lineClear(x,y,0,1) || lineClear(x,y,0,-1);
}
function getScore(x, y) {
	return lineCount(x,y,1,0) * lineCount(x,y,-1,0) * lineCount(x,y,0,1) * lineCount(x,y,0,-1);
}

var sum = 0;
var score = 0;
for (var y = 0; y < lines.length; y++) {
	for (var x = 0; x < lines[y].length; x++) {
		sum += isVisible(x, y);
		score = Math.max(score, getScore(x, y));
	}
}

console.log(sum);
console.log(score);