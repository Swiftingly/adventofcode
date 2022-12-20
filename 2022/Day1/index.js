const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lines = input.split(/(?:\r?\n){2}/);

var largest = 0;
var list = [];

for (var line of lines) {
	var sum = 0;
	for (var num of line.split('\n')) {
		sum += Number(num);
	}
	if (sum > largest) largest = sum;
	list.push(sum);
}
console.log(largest);
list.sort((a,b) => b - a);
console.log(list[0] + list[1] + list[2]);