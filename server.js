// require dependencies
const express = require('express');

// initialize the epress app
const app = express();

// configure settings
require('dotenv').config();

const port = process.env.PORT;

// configure database
const fruits = ['apple', 'banana', 'pear'];

// mount middleware

// mount routes

// INDUCES - way to remember prperr ordering of our routes

//index - GET /fruits
app.get('/fruits', function(req, res){
    res.send(fruits);
});

//show - GET /fruits/:someUniqueIdentifier
app.get('/fruits/indexOfFruitssArray', function(req, res){
    const fruit = fruits[req.params.indexOfFruitsArray];
    res.send(fruit);

});

// tell the app to listen ona dedicated port for requests
app.listen(port, function() {
    console.log(`Express is listening on port ${port}`);
});