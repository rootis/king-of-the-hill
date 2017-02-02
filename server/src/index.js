var MongoClient = require('mongodb').MongoClient;
var express = require('express')
var app = express()

var collection = null;
connectAndInsertData();


app.use(express.static('src/client'));

app.get('/getdata', function (req, res) {
  res.send({someString: 'Success'})
});

app.get('/personal', function (req, res) {
  var cursor = collection.find({"name" : "Petras"});
  cursor.each(function(err, doc) {
    if(err)
        throw err;
    if(doc==null)
        res.send({personal: []});
 
    res.send({personal: [doc]});
  });
});

function connectAndInsertData() {
  var db = MongoClient.connect('mongodb://db:27017/test', function(err, db) {
    if(err) {
      throw err;
    }
    insertData(db);
  });
}

function insertData(db) {
  collection = db.collection('records');

  collection.insert([
    {name: "Antanas", age: 54, salary: 650},
    {name: "Petras", age: 48, salary: 1130},
    {name: "Zigmantas", age: 55, salary: 2300},
    {name: "Aloyzas", age: 23, salary: 150},
    {name: "Benediktas", age: 33, salary: 350},
  ], function(err, result) {
    if(err) {
      throw err;
    }
  });
}

app.listen(8000)
