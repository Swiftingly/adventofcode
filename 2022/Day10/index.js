const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lines = input.split('\n');
lines = lines.filter(e => e);

var x = 1;
var cycle = 0;

var sum = 0;

var output = '';

function checkAdd() {
	if (cycle % 40 == 0) output += '\n';
	var v = x - (cycle % 40);
	if (-1 <= v && v <= 1) output += '#';
	else output += '.';
	
	cycle++;
	if (cycle % 40 == 20 && cycle <= 220) sum += x * cycle;
}

for (var line of lines) {
	if (line == 'noop') checkAdd();
	else {
		checkAdd();
		checkAdd();
		x += Number(line.substring(5));
	}
}
console.log(sum);
console.log(output);