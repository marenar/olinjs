/* function repeat(func, num) {
	for (var i = 0; i < num; i++) {
		func();
	}
}
module.exports = repeat 

function repeat(func,num) {
	if (num == 0) {
		return;
	} else {
		func();
		repeat(func, num-1);
	}
}
module.exports = repeat */

function doubleAll(arrayNumbers) {
	var doubles = arrayNumbers.map(function(num) {
		return 2*num;
	})
	return doubles;
}
module.exports = doubleAll