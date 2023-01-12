// require dependencies
const express = require('express');

// initialize the express app
const app = express();

// configure settings
require('dotenv').config(); // require and call .config() before accessing .env variables

const port = process.env.PORT;

// configure database
const fruits = require('./models/fruits');

// mount middleware - special functions that perform a service on a request
/*
    1) reading information from a request
    2) modifying information from a request
    3) process data from a form submission
*/

app.use(express.urlencoded({extended: false})) // .use() is used to plug in middleware functions

// gives us access to a special object called req.body
// req.body is used to gather form input


// mount routes

// INDUCES - a way to remember the proper ordering of our routes
app.get('/', function (req, res) {
    res.redirect('/fruits');
});
// index - GET /fruits 
app.get('/fruits', function(req, res) {
    const readyToEat = req.query.readyToEat
    if(readyToEat) {
        const filteredFruits = fruits.filter(function(f) {
            return f.readyToEat === (readyToEat === 'true'); 
        });
        res.render('index.ejs', { fruits: filteredFruits });
    } else {
        res.render('index.ejs', { fruits: fruits });
    }
});

// new - GET /fruits/new - send the user to a page with a form where they can add a new fruit
app.get('/fruits/new', function(req, res) {
    res.render('new.ejs');
});

// delete - DELETE /fruits/:indexOfFruitsArray
app.delete('/fruits/:indexOfFruitsArray', function(req, res) {
    fruits.splice(req.params.indexOfFruitsArray, 1);

});

// create - POST /fruits - take form data and create a new fruit with it
app.post('/fruits', function(req, res) {
    console.log(req.body);
    
    // if(req.body.readyToEat === 'on') {
    //     req.body.readyToEat = true;
    // } else {
    //     req.body.readyToEat = false
    // }

    req.body.readyToEat = !!req.body.readyToEat;

    fruits.push(req.body);
    res.redirect('/fruits'); // tells the browser to make a GET request to /fruits
});

// show - GET /fruits/:someUniqueIdentifier 
app.get('/fruits/:indexOfFruitsArray', function(req, res) {
    const fruit = fruits[req.params.indexOfFruitsArray];
    res.render('show.ejs', { fruit: fruit });
});


// tell the app to listen on a dedicated port for requests
app.listen(port, function() {
    console.log(`Express is listening on port:${port}`);
});