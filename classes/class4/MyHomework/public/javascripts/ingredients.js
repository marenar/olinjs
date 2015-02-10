var $addform = $("#add");

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$(document).on('click','.outButton', function(event) {
	event.preventDefault()
	$.post('/remove', {
		myId: $(event.target).closest("form").attr("id")
	})
	.done(function(data, status) {
		$(event.target).closest(".ingredient").children("li").replaceWith("<li class='ingredient'>" + "Out of stock: " + data.name + ", $" + data.price + "" );
		$(event.target).closest(".ingredient").children("form").hide();
		$(event.target).closest(".ingredient").children(".restock").show();
	})
	.onError;
});

$(document).on('click', '.restockButton', function(event) {
	event.preventDefault()
	$.post('/restock', {
		myId: $(event.target).closest("form").attr("id")
	})
	.done(function(data, status) {
		$(event.target).closest(".ingredient").children("li").replaceWith("<li class='ingredient'>" + data.name + ", $" + data.price);
		$(event.target).closest(".ingredient").children("form").show();
		$(event.target).closest(".ingredient").children(".restock").hide();
	})
})

$(document).on('click', '.editButton', function(event) {
	event.preventDefault()
	$(event.target).parent().children('.editIngredient').show();
});

$(document).on('click', '.submitEdit', function(event) {
	event.preventDefault()
	var formData = JSON.stringify($(event.target).closest("form").serializeArray());
	$.post('/edit', {
		myId: $(event.target).closest("form").attr("id"),
		data: formData
	})
	.done(function(data, status) {
		$(event.target).closest(".ingredient").children("li").replaceWith("<li class='ingredient'>" + data.name + ", $" + data.price);
		$(event.target).closest(".editIngredient").hide();
	})
	.onError;
});

$('.submitAdd').click(function(event) {
	event.preventDefault()
	var formData = JSON.stringify($(event.target).closest("form").serializeArray());
	$.post('/add', {
		data: formData
	})
	.done(function(data, status) {
		$("ul").append("<div class='ingredient'><li class='item'>" + data.name +", $" + data.price + "</li><form class='restock' id='restock" + data._id + "' style='display:none' action='restock' method='POST'><input class='restockButton' type='submit' value='Restock'></form><form id='out" + data._id + "' action='remove' method='POST'><input class='outButton' type='submit' value='Out of Stock'></form><form id='edit" + data._id + "' action='edit' method='POST'><input class='editButton' type='submit' value='Edit'><div class='editIngredient' style='display:none'><form id='ingredientData'>Name: <input class='editText' type='text' name='name'>Price: <input class-'editText' type='text' name='price'><input class='submitEdit' type='submit' value='Submit'></form></div></form></div>");
		$addform.children('.newIngredient').hide();
	})
	.onError;
});

$addform.submit(function(event) {
	event.preventDefault();
	$addform.children('.newIngredient').show();
});
                                                       