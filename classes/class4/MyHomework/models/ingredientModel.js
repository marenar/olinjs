var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: String,
	price: String
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;