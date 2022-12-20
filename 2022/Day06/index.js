const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

function repeat(set) {
	var arr = [];
	for (var c of set) {
		if (arr.includes(c)) return true;
		arr.push(c);
	}
	return false;
}

for (var i = 4; i < input.length; i++) {
	var set = input.substring(i - 4, i).split('');
	if (!repeat(set)) {
		console.log(i);
		break;
	}
}
for (var i = 14; i < input.length; i++) {
	var set = input.substring(i - 14, i).split('');
	if (!repeat(set)) {
		console.log(i);
		break;
	}
}