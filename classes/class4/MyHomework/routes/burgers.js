var models = require('../models/ingredientModels');
var Ingredient = models.Ingredient;
var Order = models.Order;

var list = function (req,res) {
	Ingredient.find({})
		.exec(function(err,ingredients) {
			if (err) {
				res.status(500).send("An Error has occured: " + err);
			} else {
				if (req.path === "/ingredients") {
					res.render('ingredients', {"ingredients": ingredients});
				} else if (req.path === "/order") {
					res.render('order', {"ingredients": ingredients});
				}
			}
		});
};

var listOrders = function(req, res) {
	Order.find({})
		.exec(function(err, orders) {
			if (err) {
				res.status(500).send("An Error has occured: " + err);
			} else {
				var allDone = orders.every(function(value, index, array) {
					return value.done === true;
				});
				res.render('kitchen', {"orders": orders, "allDone": allDone});
			}
		});
};

var remove = function (req,res) {
	var myId = req.body.myId.substring(3);
	Ingredient.findByIdAndUpdate(myId, {out: true}, function(err, myIngredient) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(myIngredient);
		}
	});
};

var edit = function (req,res) {
	var myData = JSON.parse(req.body.data);
	var myId = req.body.myId.substring(4);
	Ingredient.findByIdAndUpdate(myId, {name: myData[0].value, price: myData[1].value}, function(err, myIngredient) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(myIngredient);
		}
	});
};

var add = function (req, res) {
	var myData = JSON.parse(req.body.data);
	var myIngredient = new Ingredient({name: myData[0].value, price: myData[1].value, out: false});
	myIngredient.save(function(err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(myIngredient);
		}
	})
};

var restock = function (req, res) {
	var myId = req.body.myId.substring(7);
	Ingredient.findByIdAndUpdate(myId, {out: false}, function(err, myIngredient) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(myIngredient);
		}
	});
};

var submit = function (req, res) {
	var items = req.body["items[]"];
	Ingredient.find({'_id': { $in: items}}, function(err, orderIngredients) {
		if (err) {
			res.status(500).send(err);
		} else {
			var myOrder = new Order({items: orderIngredients, done: false})
			console.log(myOrder);
			myOrder.save(function(err) {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send();
				}
			})
		}
	})
};

var done = function (req, res) {
	var myId = req.body.myId.substring(4);
	Order.findByIdAndUpdate(myId, {done: true}, function(err) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send();
		}
	});
};


module.exports.remove = remove;
module.exports.edit = edit; 
module.exports.list = list;
module.exports.add = add;
module.exports.restock = restock;
module.exports.submit = submit;
module.exports.listOrders = listOrders;
module.exports.done = done;