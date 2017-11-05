var express = require('express');
var app = express();
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.CSE_ID, process.env.API_KEY);
var mongodb = require('mongodb').MongoClient
var dburl = process.env.url

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.send('not found');
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 8000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/imagesearch/:search", function (request, response) {  
  var searchquery = request.params.search;
  var pagination = request.query.offset || 1;
  client.search(searchquery, {page: pagination})
	  .then(images => {
      var imageres = [];
      var date = new Date;
      var dbdata = {
        'term' : searchquery,
        'when' : date.toISOString()
      };
      images.forEach(ar=>{
        var obj={};
        obj['url'] = ar.url;
        obj['description'] = ar.description;
        obj['thumbnail'] = ar.thumbnail.url;
        obj['context'] = ar.parentPage;
        imageres.push(obj);
      })
      mongodb.connect(dburl,function(err,db){
        if(err) throw err
        var collection = db.collection('search')
        collection.insert(dbdata,function(err){
          if(err) throw err;
        })
        db.close();
      })
      response.send(imageres)
	});
});
app.get("/api/latest/imagesearch/", function (request, response) {
  mongodb.connect(dburl,function(err,db){
    if(err) throw err
    var collection = db.collection('search')
    collection.find().sort({ when: -1 }).limit(10).toArray(function(err,doc){
      if(err) throw err;
      response.send(doc)
    })
  })
});
