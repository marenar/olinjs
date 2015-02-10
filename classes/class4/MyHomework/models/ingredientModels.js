var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({
	name: String,
	price: String,
	out: Boolean
});

var orderSchema = mongoose.Schema({
	items: [Ingredient],
	done: Boolean
});

var Ingredient = mongoose.model('Ingredient', ingredientSchema);
var Order = mongoose.model('Order', orderSchema);

module.exports.Ingredient = Ingredient;
module.exports.Order = Order;