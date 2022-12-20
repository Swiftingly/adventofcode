const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lineSets = input.split('\n\n');
var crateArray = lineSets[0].split('\n');
crateArray.pop();
var orderArray = lineSets[1].split('\n').filter(e => e);

var crates = [];
for (var i = 0; i < crateArray.length; i++) {
	var crateLine = crateArray[i];
	
	for (var j = 0; j < crateLine.length / 4; j++) {
		if (!crates[j]) crates[j] = [];
		
		var letter = crateLine[j * 4 + 1];
		if (letter != ' ') {
			crates[j].unshift(letter);
		}
	}
}

var crates1 = JSON.parse(JSON.stringify(crates));
var crates2 = JSON.parse(JSON.stringify(crates));

var str1 = '';
var str2 = '';

for (var line of orderArray) {
	var match = line.match(/move ([0-9]+) from ([0-9]+) to ([0-9]+)/);
	var amount = Number(match[1]);
	var get = Number(match[2]) - 1;
	var set = Number(match[3]) - 1;
	
	// 1
	for (var i = 0; i < amount; i++) {
		crates1[set].push(crates1[get].pop());
	}
	
	// 2
	var held = [];
	for (var i = 0; i < amount; i++) {
		held.unshift(crates2[get].pop());
	}
	for (var c of held) crates2[set].push(c);
}
for (var i = 0; i < crates1.length; i++) str1 += crates1[i].pop();
for (var i = 0; i < crates2.length; i++) str2 += crates2[i].pop();
console.log(str1);
console.log(str2);