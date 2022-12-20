const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

const oppMove = {
	'A': 0, 'B': 1, 'C': 2
}
const strat1 = {
	'X': 0, 'Y': 1, 'Z': 2
};
const strat2 = {
	'X': 2, 'Y': 0, 'Z': 1
};

var lines = input.split('\n');
lines = lines.filter(e => e);

var sum1 = 0;
var sum2 = 0;

function getScore(m1, m2) {
	var score = m2 + 1;
	if (m1 == m2) score += 3;
	else if ((m1 + 1) % 3 == m2) score += 6;
	return score;
}

for (var line of lines) {
	var set = line.split(' ');
	var move1 = oppMove[set[0]];
	var move2 = strat1[set[1]];
	var move3 = (move1 + strat2[set[1]]) % 3;
	
	sum1 += getScore(move1, move2);
	sum2 += getScore(move1, move3);
}
console.log(sum1);
console.log(sum2);