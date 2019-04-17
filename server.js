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
    price_1 = req.query.price1;
    price_2 = req.query.price2;
    price_3 = req.query.price3;
    filter_query = "select * from restaurants";
    if (price_1 || price_2 || price_3) {
        filter_query += " where";
        if (price_1) {
            filter_query += " restaurant_price='$'";
        }
        if (price_2) {
            if (price_1) {
                filter_query += " or";
            }
            filter_query += " restaurant_price='$$'";
        }
        if (price_3) {
            if (price_1 || price_2) {
                filter_query += ' or';
            }
            filter_query += " restaurant_price='$$$'";
        }
    }
    filter_query += " order by restaurant_name;";
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

app.listen(process.env.PORT || 3000);
console.log('3000 is the magic port');
