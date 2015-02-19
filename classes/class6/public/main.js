$('button').click(function(event) {
	$.post('/hello', {
		test:'data'
	})
	.done(function(data) {
		$('body').append(data);
	})
	.error(console.error);
});