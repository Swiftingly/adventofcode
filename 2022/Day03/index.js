const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lines = input.split('\n');
lines = lines.filter(e => e);

var sum1 = 0;
var sum2 = 0;

function both(s1, s2) {
	for (var c of s1) {
		if (s2.includes(c)) return c;
	}
}
function all(s1, s2, s3) {
	for (var c of s1) {
		if (s2.includes(c) && s3.includes(c)) return c;
	}
}

for (var line of lines) {
	var s1 = line.slice(0, line.length / 2);
	var s2 = line.slice(line.length / 2);
	
	var n = both(s1, s2).charCodeAt(0);
	if (n >= 97) sum1 += n - 96;
	else sum1 += n - 64 + 26;
}

for (var i = 0; i < lines.length; i += 3) {
	var s1 = lines[i];
	var s2 = lines[i + 1];
	var s3 = lines[i + 2];
	
	var n = all(s1, s2, s3).charCodeAt(0);
	if (n >= 97) sum2 += n - 96;
	else sum2 += n - 64 + 26;
}

console.log(sum1);
console.log(sum2);

//console.log('a'.charCodeAt(0)); // 97
//console.log('A'.charCodeAt(0)); // 65