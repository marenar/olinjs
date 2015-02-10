var main = function() {
	var models = require('./ingredientModels');
	var Ingredient = models.Ingredient;

	ingredients = [ {name: 'beef patty', price: '3.50', out: false}, 
					{name: 'tomato', price: '0.75', out: false},
					{name: 'lettuce', price: '0.50', out: false}, 
					{name: 'chicken patty', price: '3.00', out: false}, 
					{name: 'blue cheese', price: '2.30', out: false}, 
					{name: 'cheddar cheese', price: '2.25', out: false}, 
					{name: 'monterey jack cheese', price: '2.05', out: false}, 
					{name: 'swiss cheese', price: '2.10', out: false}, 
					{name: 'bacon', price: '1.50', out: false}, 
					{name: 'fried egg', price: '1.25', out: false}, 
					{name: 'classic bun', price: '1.50', out: false}, 
					{name: 'sesame bun', price: '1.50', out: false}, 
					{name: 'carmelized onions', price: '0.80', out: false}, 
					{name: 'mushrooms', price: '0.85', out: false}, 
					{name: 'yellow mustard', price: '0.25', out: false}, 
					{name: 'dijon mustard', price: '0.25', out: false}, 
					{name: 'ketchup', price: '0.25', out: false},
					{name: 'pickles', price: '0.50', out: false}];

	
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
}

module.exports.main = main;