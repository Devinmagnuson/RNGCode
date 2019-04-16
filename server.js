var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var pgp = require('pg-promise')();

//const dbConfig = {
//	host: 'localhost',
//	port: 5432,
//	database: 'cycxtixl',
//	user: 'cycxtixl',
//	password: 'tgq8Okya-25g3veNRT9wwKI2L84SjyVr'
//};
var db = pgp('postgres://cycxtixl:tgq8Okya-25g3veNRT9wwKI2L84SjyVr@otto.db.elephantsql.com:5432/cycxtixl');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));

app.get("/", function(req, res) {
	res.render("home");
});

app.get('/filter', function(req, res) {
    filter_query = "select * from restaurants order by restaurant_name;";
    db.any(filter_query)
	.then(rows => {
		res.render("filter", {
            results: rows
		})
	})
	.catch(err => {
		console.log(err);
		res.render("filter", {
            results: ""
		})
	})
});

app.get("/filter/filter_result", function(req, res) {
    var prices = req.query.price;
    var hour = req.query.hour;

    var price_query = "";
    var hour_query = "";

    if (prices && prices.length > 1) {
        for (i = 0; i < prices.length; i++) {
            prices[i] = " where restaurant_price='" + prices[i] + "'";
        }
        price_query = prices.join(" or ");
    }
    else if (prices) {
        price_query = " where restaurant_price='" + prices + "'";
    }

    if (hour != "") {
        hour_query = " where" + hour + "> int(restaurant_open_time) and" + hour + " < int(restaurant_close_time)"
    }
    
    var starter_query = "select * from restaurants";
    var filter_query = starter_query + price_query + hour_query;
    filter_query += " order by restaurant_name;";

    console.log(filter_query);
    db.any(filter_query)
	.then(rows => {
		res.render("filter", {
            results: rows
		})
	})
	.catch(err => {
		console.log(err);
		res.render("filter", {
            results: ''
		})
	})
});

app.listen(3000);
console.log('3000 is the magic port');