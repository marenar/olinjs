var Ingredient = require('../models/ingredientModel');

var list = function (req,res) {
	Ingredient.find({})
		.exec(function(err,ingredients) {
			if (err) {
				res.send("An error has occured").status(500);
				console.log(err);
			} else {
				res.render('list', {"ingredients": ingredients});
			}
		});
}

var remove = function (req,res) {

};

var edit = function (req,res) {

};

module.exports.list = list;
module.exports.remove = remove;
module.exports.edit = edit;