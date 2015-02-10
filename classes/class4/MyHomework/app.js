var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
mongoose.connect(mongoURI);

var app = express(); 
var populateDatabase = require('./models/populateDatabase');
var routes = require('./routes/burgers');
populateDatabase.main();

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', function(req,res) {
	res.send("Welcome to Jessica's Burgers");
})

app.get('/ingredients', routes.list);

app.post('/remove', routes.remove);

app.post('/restock', routes.restock);

app.post('/edit', routes.edit); 

app.post('/add', routes.add);

app.get('/order', routes.list);

app.post('/submitOrder', routes.submit);

app.get('/kitchen', routes.listOrders);

app.post('/done', routes.done);

app.listen(PORT);

