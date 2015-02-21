var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var PORT = process.env.PORT || 3000;
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var app = express();
var routes = require('./routes/index');
var passport_routes = require('./routes/passport');
var models = require('./models/twoteModels');
var User = models.User;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

passport.use(new FacebookStrategy({
	clientID: process.env.FACEBOOK_APP_ID,
	clientSecret: process.env.FACEBOOK_APP_SECRET,
	callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		return done(null, profile);
	});
}
));

passport.use('local', new LocalStrategy(
	function(username, password, done) {
		process.nextTick(function () {
			User.find({name: username})
	      		.exec(function(err, user) {
	      			console.log(err, user);
			        if (err) { return done(err); }
			        if (user.length === 0) { return done(null, false, { message: 'Unknown user ' + username }); }
			        if (user[0].password != password) { return done(null, false, { message: 'Invalid password' }); }
			        return done(null, user);
				})
			});
		}
));


app.get('/', routes.main);

app.get('/login', routes.login);

app.post('/logout', routes.logout);

app.post('/createTwote', routes.createTwote);

app.post('/createUser', passport_routes.createUser);

app.get('/createFacebookUser', passport_routes.createFacebookUser);

app.post('/deleteTwote', routes.deleteTwote);

app.get('/auth/facebook', 
passport.authenticate('facebook'),
function(req, res){
});

app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
 	res.redirect('/createFacebookUser');
});

app.post('/auth/user', passport.authenticate('local', {
    successRedirect : '/', 
    failureRedirect : '/login'
}));

app.post('/auth/signup', passport.authenticate('local', {
    successRedirect : '/', 
    failureRedirect : '/login?signup=true'
}));


app.listen(PORT);