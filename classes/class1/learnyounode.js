/* console.log('HELLO WORLD'); 

//console.log(process.argv);
total = 0;

for (var i = 2; i < process.argv.length; i++) {
	total += Number(process.argv[i])
};
console.log(total); 

var fs = require('fs');
var string = fs.readFileSync(process.argv[2]).toString();
var lines = string.split('\n').length - 1
console.log(lines);

var fs = require('fs');
fs.readFile(process.argv[2], 'utf8', function callback(err, data) {
	console.log(data.split('\n').length -1);
}); 

var fs = require('fs');
var path = require('path');
fs.readdir(process.argv[2], function callback(err,list) {
	for (var i = 0; i < list.length; i++) {
		if (path.extname(list[i]) === '.' + process.argv[3]) {
			console.log(list[i]);
		};
	};
}); 

var module = require('./modular.js');
module(process.argv[2],process.argv[3], function(err,data) {
	if (err) {
		console.log('an error has occured');
	} else {
		for (var i = 0; i < data.length; i++) {
			console.log(data[i]);
		}
	}
}); 

var http = require('http');
http.get(process.argv[2], function callback(response) {
	response.on('data', function(data) {
		console.log(String(data));
	})
}) 

var http = require('http');
var complete = ''
http.get(process.argv[2], function callback(response) {
	response.on('data', function(data) {
		complete += String(data);
	})
	response.on('end', function() {
		console.log(complete.length);
		console.log(complete);
	})
}) 

var http = require('http');
var foo = ''
var bar = ''
var bat = ''
var count = 0
http.get(process.argv[2], function callback(response) {
	response.on('data', function(data) {
		foo += String(data);
	})
	response.on('end', function() {
		count += 1
		if (count == 3) {
			console.log(foo);
			console.log(bar);
			console.log(bat);
		}
	})
})
http.get(process.argv[3], function callback(response) {
	response.on('data', function(data) {
		bar += String(data);
	})
	response.on('end', function() {
		count += 1
		if (count == 3) {
			console.log(foo);
			console.log(bar);
			console.log(bat);
		}
	})
})
http.get(process.argv[4], function callback(response) {
	response.on('data', function(data) {
		bat += String(data);
	})
	response.on('end', function() {
		count += 1
		if (count == 3) {
			console.log(foo);
			console.log(bar);
			console.log(bat);
		}
	})
}) 

var net = require('net');
var server = net.createServer(function callback(socket) {
	var d = new Date();
	function format(myInt) {
		if (String(myInt).length == 1) {
			return '0' + myInt; 
		} else {
			return myInt;
		}
	}
	var myDate = d.getFullYear() + '-' + format(d.getMonth()+1) + '-' + format(d.getDate()) + ' ' + format(d.getHours()) + ':' + format(d.getMinutes()) + '\n';
	socket.end(myDate);
}).listen(process.argv[2]); */

var http = require('http');
var server = http.createServer(function callback(request,response) {

}).listen(process.argv[2]); 








