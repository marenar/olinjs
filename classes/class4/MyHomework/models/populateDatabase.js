var main = function() {
	var Ingredient = require('./ingredientModel');

	ingredients = [ {name: 'beef patty', price: '3.50'}, 
					{name: 'tomato', price: '0.75'},
					{name: 'lettuce', price: '0.50'}, 
					{name: 'chicken patty', price: '3.00'}, 
					{name: 'blue cheese', price: '2.30'}, 
					{name: 'cheddar cheese', price: '2.25'}, 
					{name: 'monterey jack cheese', price: '2.05'}, 
					{name: 'swiss cheese', price: '2.10'}, 
					{name: 'bacon', price: '1.50'}, 
					{name: 'fried egg', price: '1.25'}, 
					{name: 'classic bun', price: '1.50'}, 
					{name: 'sesame bun', price: '1.50'}, 
					{name: 'carmelized onions', price: '0.80'}, 
					{name: 'mushrooms', price: '0.85'}, 
					{name: 'yellow mustard', price: '0.25'}, 
					{name: 'dijon mustard', price: '0.25'}, 
					{name: 'ketchup', price: '0.25'},
					{name: 'pickles', price: '0.50'}];

	
	function populate() {
		for (var i = 0; i < ingredients.length; i++) {
			var createIngredient = new Ingredient(ingredients[i]);
			createIngredient.save(function(err) {
				if (err) {
					console.log("Problem populating database", err);
				}
			});
		}
	}

	Ingredient.find({name: 'beef patty'})
		.exec(function(err, item) {
			if (err) {
				console.log("Problem with db search", err);
			} else {
				if (item.length === 0) {
					populate();
				}
			}
		});

};

module.exports.main = main;