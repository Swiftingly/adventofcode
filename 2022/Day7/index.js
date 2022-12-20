const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var lines = input.split('\n');
lines = lines.filter(e => e);

var files = {};

var curr = [];

function create(dir) {
	var arr = files;
	for (var path of curr) {
		arr = arr[path];
	}
	if (!(dir in arr))
		arr[dir] = {};
}
function set(file, value) {
	var arr = files;
	for (var path of curr) {
		arr = arr[path];
	}
	arr[file] = value;
}

var totalAll = 0;
var min = 0;
var currentMin = 70000000;

function search(obj) {
	var sum = 0;
	for (var prop in obj) {
		var value = obj[prop];
		if (typeof value == 'object') {
			sum += search(value);
		}
		else sum += value;
	}
	if (sum <= 100000) totalAll += sum;
	return sum;
}
function search2(obj) {
	var sum = 0;
	for (var prop in obj) {
		var value = obj[prop];
		if (typeof value == 'object') sum += search2(value);
		else sum += value;
	}
	if (sum >= min) currentMin = Math.min(currentMin, sum);
	return sum;
}

for (var line of lines) {
	if (line.startsWith('$ ')) {
		var args = line.substring(2).split(' ');
		if (args[0] == 'cd') {
			if (args[1] == '/') curr = [];
			else if (args[1] == '..') curr.splice(-1,1);
			else curr.push(args[1]);
		}
	}
	else {
		var args = line.split(' ');
		if (args[0] == 'dir') {
			create(args[1]);
		}
		else {
			set(args[1], Number(args[0]));
		}
	}
}

var used = search(files);
console.log(totalAll);

min = 30000000 - (70000000 - used);

search2(files);
console.log(currentMin);