var $outform = $("#outOfStock");
var $editform = $("#edit");
var $addform = $("#add");

var onSuccess = function(data, status) {
	console.log(data),status
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$('.outButton').click(function(event) {
	event.preventDefault()
	$(event.target).closest("li").hide();
});

$('.editButton').click(function(event) {
	event.preventDefault()
	$(event.target).parent().children('.editIngredient').show();
});

$('.submitEdit').click(function(event) {
	event.preventDefault()
	formData = $(event.target).closest("form").serialize();
	console.log(formData);
});

$('.submitAdd').click(function(event) {
	event.preventDefault()
	formData = $(event.target).closest("form").serialize();
	console.log(formData);
});

$addform.submit(function(event) {
	event.preventDefault();
	console.log($addform.children('.newIngredient'))
	$addform.children('.newIngredient').show();
	formData = $addform.serialize();
  	console.log(formData);
});
