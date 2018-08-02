var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.static('.'));

var data = {
  name: 'a',
  value: 1,
};

app.get('/data', function (req, res) {
  console.log(data);
  res.send(data);
});

app.post('/updateData', function (req, res) {
    Object.assign(data, req.body);
    console.log(data);
    res.end(JSON.stringify(data));
});

app.listen(8081, function () {
  console.log('Example app listening at 8081');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
