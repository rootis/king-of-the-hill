const path = require('path');
const express = require('express');
const app = express();
const publicClientDir = '../public';

app.use(express.static(publicClientDir));

app.get('/getdata', function (req, res) {
    res.send({someString: 'Success'})
});

app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicClientDir, 'index.html'));
});

app.listen(8000);
