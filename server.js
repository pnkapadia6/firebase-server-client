var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.static('.'));

var data = {};
var subscribedKeys = [];

app.get('/data', function (req, res) {
  res.send(data);
});

var server = app.listen(8081, function () {
  console.log('Example app listening at 8081');
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('socket io server connected');

  app.post('/updateData', function (req, res) {
    const newData = req.body;
    Object.assign(data, newData);

    // Event for subscribed keys
    var updatedKeys = Object.keys(newData);
    updatedKeys.forEach(function(updatedKey) {
      if (subscribedKeys.indexOf(updatedKey) > -1) {
        socket.emit('key-update', { key: updatedKey, value: newData[updatedKey] });
      }
    });
    
    res.end(JSON.stringify(data));
  });
  
  app.post('/subscribe', function (req, res) {
    var { subscribeKey } = req.body;
    subscribedKeys.push(subscribeKey);
    res.end();
  });
});
