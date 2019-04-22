var express = require('express');
var app = express();
const path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pgp = require('pg-promise')();

//const dbConfig = {
//  host: 'localhost',
//  port: 5432,
//  database: 'cycxtixl',
//  user: 'cycxtixl',
//  password: 'tgq8Okya-25g3veNRT9wwKI2L84SjyVr'
//};

//trying to play with db to connect to heroku 

var db = pgp('postgres://cycxtixl:tgq8Okya-25g3veNRT9wwKI2L84SjyVr@otto.db.elephantsql.com:5432/cycxtixl');

//const dbConfig = process.env.DATABASE_URL;

//var db = pgp(dbConfig);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));




app.get('/register', function(req, res) {
    res.render("register",{
    });
});

app.post('/register/submit', function (req, res){
    var userName = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    //ar age = req.body.age;
    var name = req.body.name;

    var insert_query = "INSERT INTO users(name, username, email, password) VALUES('" 
                         +name+"', '"+userName+"','"+email+"' , '"+password+"');"; 

    db.any(insert_query)
        .then(function(rows){
            res.render('/login',{
                data: rows
            })
        })
    .catch(error => {
        console.log(error);
        res.send({
            data: ''
        })
    })
    });

app.get('/home', function(req, res){
    res.render('home',{
    });
});


app.get('/login', function(req, res){
    res.render('login',{
    });
});

// app.post('/login', function(req, res){
//     var email = req.body.email;
//     var password = req.body.password;

//     var val_query = "select exists(select 1 from user_profiles where email='"+email+"' AND password='"+password+"');";
//     var user_id_query = "select id from user_profiles where email='"+email+"' AND password='"+password+"';";

//     db.task('get-everything', task => {
//         return task.batch([
//             task.any(val_query),
//             task.any(user_id_query)
//             ]);
//     }) 
//     .then(info => {
//         res.send({
//             id: info[0]
//         })
//     })
//     .catch(error => {
//         console.log(error);
//         res.send({

//             id : ''
//         })
//     })
//     });


app.get('/location', function(req, res){
    res.render('location',{
    });
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
    });
});

app.get("/filter/filter_result", function(req, res) {
    //retrieve various parameters
    var search = req.query.search_term;
    var prices = req.query.price;
    var hour = req.query.hour;
    var food = req.query.food_type;
    var drink = req.query.drink_type;

    //initialize empty strings to hold queries
    var search_query = "";
    var price_query = "";
    var hour_query = "";
    var food_query = "";
    var drink_query = "";

    //if search term defined, query for any restaurant whose name, food type, or alcohol type contains search term as a substring
    if (search != "") {
        search_query = "(lower(restaurant_name) like lower('%" + search + "%')) or (lower(restaurant_food) like lower('%" + search + "%')) or (lower(restaurant_alcohol) like lower('%" + search + "%'))";
    }

    if (prices && typeof(prices) == "object") { //if more than one price selected, will be an object, will query by all prices connected with an 'or'
        for (i = 0; i < prices.length; i++) {
            prices[i] = "restaurant_price='" + prices[i] + "'";
        }
        price_query = prices.join(" or ");
    }
    else if (prices) { //if not an object, but still defined, only one price to query by
        price_query = "restaurant_price='" + prices + "'";
    }

    //if hour parameter defined, query by times for which the hour given is between the opening and closing time of restaurant (after the first 'or' handles cases where the restaurant closes past midnight)
    if (hour != "") {
        hour_query = "(" + hour + " > cast (restaurant_open_time as int) and " + hour + " <= cast (restaurant_close_time as int)) or (cast (restaurant_open_time as int) >= cast (restaurant_close_time as int) and (" + hour + " >= cast (restaurant_open_time as int) or " + hour + " <= cast (restaurant_close_time as int)))";
    }

    if (food != "") {
        food_query = "lower(restaurant_food) like lower('%" + food + "%')";
    }

    if (drink != "") {
        drink_query = "lower(restaurant_alcohol) like lower('%" + drink + "%')";
    }

    //construct the final query where clause
    queries_unchecked = [search_query, price_query, hour_query, food_query, drink_query];
    queries = [];
    queries_unchecked.forEach(function(query) {
        if (query != "") {
            queries.push(query);
        }
    })
    queries = queries.join(") and (");
    if (queries != "") {
        queries = " where (" + queries + ")";
    }

    //construct final query
    var starter_query = "select * from restaurants";
    var filter_query = starter_query + queries;
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