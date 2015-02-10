var fs = require('fs');
var path = require('path');

module.exports = function (dir, ext, callback) {
	var filtered = [];
	fs.readdir(dir, function callback2(err,list) {
		if (err) {
			return callback(err);
		}
		for (var i = 0; i < list.length; i++) {
			if (path.extname(list[i]) === '.' + ext) {
				filtered.push(list[i]);
			}
		}
		callback(null, filtered);
	})
}