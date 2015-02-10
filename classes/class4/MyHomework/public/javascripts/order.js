var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$(".orderBox").click(function(event) {
	var text = $(event.target).closest("form").children("span").text();
	var price = Number(text.split("$")[1]);

	var current = Number($("#total").text().split("$")[1]);
	var newTotal = price + current;
	$("#total").replaceWith("<h4 id='total'>Your current total is: $" + newTotal.toFixed(2) + "</h4");
	$("#success").hide();
})

$("#submitOrder").click(function(event) {
	event.preventDefault()
	var items = [];
	$(".orderBox:checked").each(function() {
		items.push(this.id);
	})
	console.log(items);
	$.post('/submitOrder', {
		items: items
	})
	.done(function(data, status) {
		$("#success").show();
		$(".orderBox:checked").prop('checked', false);
		$("#total").replaceWith("<h4 id='total'>Your current total is: $0.00</h4");
	})
	.onError;
})