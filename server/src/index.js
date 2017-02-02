var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/getdata', function (req, res) {
  res.send({someString: 'Success'})
});

app.listen(8000)
