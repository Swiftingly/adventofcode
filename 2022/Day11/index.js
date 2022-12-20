const fs = require('fs');

var input = fs.readFileSync('./input.txt', 'utf8');

var areas = input.split('\n\n');
areas = areas.filter(e => e);

var monkeys = [];

function fix(a, b) {
	if (a[b] == 'old') a[b] = '$';
	else a[b] = Number(a[b]);
}

for (var area of areas) {
	var lines = area.split('\n');
	var items = lines[1].split(': ').pop().split(', ').map(n => Number(n));
	var operation = lines[2].split('= ').pop().split(' ');
	fix(operation, 0);
	fix(operation, 2);
	var test = Number(lines[3].split('by ').pop());
	var ifTrue = Number(lines[4].split('monkey ').pop());
	var ifFalse = Number(lines[5].split('monkey ').pop());
	
	monkeys.push({i:items,o:operation,t:test,ift:ifTrue,iff:ifFalse,c:0});
	
}

var total = 1;
for (var i = 0; i < monkeys.length; i++) {
	total *= monkeys[i].t;
}

for (var i = 0; i < 10000; i++) {
	for (var j = 0; j < monkeys.length; j++) {
		var m = monkeys[j];
		var o = m.o;
		
		while (m.i.length > 0) {
			m.c++;
			var item = m.i.shift();
			
			var n1 = o[0], n2 = o[2];
			if (n1 == '$') n1 = item;
			if (n2 == '$') n2 = item;
			if (o[1] == '+') item = n1 + n2;
			if (o[1] == '*') item = n1 * n2;
			
			
			//item = Math.floor(item / 3); // 1
			item %= total; // 2
			
			if (item % m.t == 0) monkeys[m.ift].i.push(item);
			else monkeys[m.iff].i.push(item);
		}
	}
}
monkeys.sort((a,b) => b.c - a.c);
console.log(monkeys[0].c * monkeys[1].c);