// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT || 8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/imagesearch/:search", function (request, response) {  
  var searchquery = request.params.search;
  client.search(searchquery)
	  .then(images => {
    response.send(images)
	});
});