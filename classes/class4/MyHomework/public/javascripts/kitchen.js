var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$(".completeButton").click(function(event) {
	event.preventDefault();
	$.post('/done', {
		myId: $(event.target).closest("form").attr("id")
	})
	.done(function(data, status) {
		$(event.target).closest(".order").detach();
		if ($(event.target).closest("ul").length == 0) {
			$("#title").replaceWith("<h2 id='title'>No Orders Pending</h2>");
		}
	})
	.onError;
})