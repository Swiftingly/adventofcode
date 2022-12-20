const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lines = input.split('\n');
lines = lines.filter(e => e);

var list1 = [];
var list2 = [];

function checkAdd(list, x, y) {
	var val = x + '.' + y;
	if (!list.includes(val)) list.push(val);
}

var knots1 = [], knots2 = [];
for (var i = 0; i < 2; i++) knots1[i] = [0,0];
for (var i = 0; i < 10; i++) knots2[i] = [0,0];

function knotRun(knots, list) {
	knots[0][0] += dx;
	knots[0][1] += dy;
	
	for (var j = 1; j < knots.length; j++) {
		var k1 = knots[j - 1];
		var k2 = knots[j];
		if (Math.abs(k1[0]-k2[0]) > 1 || Math.abs(k1[1]-k2[1]) > 1) {
			k2[0] += Math.sign(k1[0]-k2[0]);
			k2[1] += Math.sign(k1[1]-k2[1]);
			
		}
	}
	var knot = knots[knots.length - 1];
	checkAdd(list, knot[0], knot[1]);
}

for (var line of lines) {
	var dir = line.substring(0,1);
	var amount = Number(line.substring(2));
	
	var dx, dy;
	switch (dir) {
		case 'R': dx = 1; dy = 0; break;
		case 'L': dx = -1; dy = 0; break;
		case 'U': dx = 0; dy = 1; break;
		case 'D': dx = 0; dy = -1; break;
	}
	
	for (var i = 0; i < amount; i++) {
		knotRun(knots1, list1);
		knotRun(knots2, list2);
	}
}

console.log(list1.length);
console.log(list2.length);