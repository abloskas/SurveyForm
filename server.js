// Load the express module and store it in the variable express (Where do you think this comes from?)
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app
var app = express();
app.use(session({
    secret: 'fjlasdkjlqfalkdjflakjflakdjf',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
console.log("Let's find out what app is", app);

// use app's get method and pass it the base route '/' and a callback
// app.get('/', function(request, response) {
//     // just for fun, take a look at the request and response objects
//    console.log("The request object", request);
//    console.log("The response object", response);
//    // use the response object's .send() method to respond with an h1
//    response.send("<h1>Hello Express</h1>");
// })

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 

app.use(bodyParser.urlencoded({extended: true}));
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render("index");
})
app.post('/new', function (req, res){
    // set the name property of session.  
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.comment = req.body.comment;
    console.log(req.session.name);
    //code to add user to db goes here!
    // redirect the user back to the root route. 
    res.redirect('/result');
});

app.get('/result', function (req, res){
    var data = {
        data: req.session
    }
    return res.render('result', data)
});

// app.get("/users/:id", function (req, res){
//     console.log("The user id requested is:", req.params.id);
//     // just to illustrate that req.params is usable here:
//     res.send("You requested the user with id: " + req.params.id);
//     // code to get user from db goes here, etc...
// });

app.get("style.css", function(req, res){
	console.log("Do we get into this route?");
	res.render("/static/style.css");
})

PORT = 8000;
app.listen(8000, function(){
	console.log("Listening on port " + PORT);
})
