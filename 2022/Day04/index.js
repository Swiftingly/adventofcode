const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lines = input.split('\n');
lines = lines.filter(e => e);

function contains(p1, p2) {
	if (p1[0] >= p2[0] && p1[1] <= p2[1]) return true;
	return false;
}

function overlap(p1, p2) {
	if (p1[0] <= p2[1] && p2[0] <= p1[1]) return true;
	return false;
}

var sum1 = 0;
var sum2 = 0;
for (var line of lines) {
	var pair = line.split(',');
	var p1 = pair[0].split('-').map(n => Number(n));
	var p2 = pair[1].split('-').map(n => Number(n));
	
	if (contains(p1, p2) || contains(p2, p1)) sum1++;
	if (overlap(p1, p2)) sum2++;
}
console.log(sum1);
console.log(sum2);