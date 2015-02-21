var models = require('../models/twoteModels');
var User = models.User;
var Twote = models.Twote;

var createUser = function (req, res) {
	console.log("createUser", req.session);
	var myUser = new User({name: req.body.username, password: req.body.password, twotes: []});
	User.find({name: req.body.username})
		.exec(function (err, user) {
			if (user.length === 0) {
				console.log("new");
				myUser.save(function(err) {
					if (err) {
						res.status(500).send(err);
					} else {
						req.session.userId = myUser._id
						res.redirect('/');
					}
				})
			} else {
				console.log("exists");
				req.session.userId = user[0]['_id'];
				res.redirect('/auth/signup');
			}
		});
};

var createFacebookUser = function (req, res) {
	console.log("createFacebookUser", req.session);
	var myUser = new User({name: req.user.name.givenName, twotes: []});
	User.find({name: req.user.name.givenName})
		.exec(function (err, user) {
			if (user.length === 0) {
				console.log("new");
				myUser.save(function(err) {
					if (err) {
						res.status(500).send(err);
					} else {
						req.session.userId = myUser._id
						res.redirect('/');
					}
				})
			} else {
				console.log("exists");
				req.session.userId = user[0]['_id'];
				res.redirect('/');
			}
		});
};

module.exports.createFacebookUser = createFacebookUser;
module.exports.createUser = createUser;