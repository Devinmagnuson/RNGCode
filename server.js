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

const dbConfig = process.env.DATABASE_URL;

var db = pgp(dbConfig);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/"));




app.get('/register', function(req, res) {
    res.render("register",{
    });
});

app.post('/register/submit', function (req, res){
    var name = req.body.name;
    var userName = req.body.userName;
    var email = req.body.emailAddress;
    var password = req.body.passwordFirst;


    var insert_query = "INSERT INTO users(name,user_name,email,password) VALUES('"
                        +name+"','"+userName+"','"+email+"','"+password+"');";


    db.any(insert_query)
        .then(function (rows){
            res.render('login',{
            })
        })
    .catch(err => {
        console.log(err);
        res.render("register")

    })
    });


app.get('/home', function(req, res){
    res.render('home',{
    });
});


app.get('/', function(req,res){
    res.render('login',{
    });
});

app.post('/login', function(req,res){
    var userName = request.body.uname;
    var userPass = request.body.psw;

    if(userPass && userName){
        connection.query('select * from users where username = ? and password = ?', [userName,userPass], function(error, results, fields){
            if(results.length > 0){
                request.sesion.loggedin = true;
                request.session.username = username;
                response.direct('filter');
            }else{
                response.send('Incorrect Username and/or Password');
                response.direct('login',{
                });
            }
            response.end();
        });
    }else{
        response.send('Please enter Username and Password');
        response.end();
    }
});



app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});



app.get('/location', function(req, res){
    location_query = "select * from restaurants order by restaurant_name;";
    db.any(location_query)
    .then(rows => {
        res.render("location", {
            results: rows
        })
    })
    .catch(err => {
        console.log(err);
        res.render("location", {
            results: ""
        })
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

app.listen(process.env.PORT);
console.log('This is a magic Heroku port');
