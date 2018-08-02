const getDataButton = document.getElementById('get-btn');

const keyInput = document.getElementById('key-input');
const valueInput = document.getElementById('value-input');
const updateDataButton = document.getElementById('update-btn');
const dataContainer = document.getElementById('data');

const subscribeButton = document.getElementById('subscribe-btn');
const subscribedContainer = document.getElementById('update');

var socket = io.connect('http://127.0.0.1:8081/');
socket.on('key-update', function (data) {
  console.log('client socket io rec---', data);
  subscribedContainer.innerHTML = `Key updated ${data.key} with value ${data.value}`;
});

getDataButton.addEventListener('click', function(e) {
  fetch('/data', {
    method: 'GET'
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      dataContainer.innerHTML = JSON.stringify(data);
    });
});

updateDataButton.addEventListener('click', function(e) {
  var userKey = keyInput.value;
  var userValue = valueInput.value || 0;

  userKey && fetch('/updateData', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [userKey]: userValue })
  })
});

subscribeButton.addEventListener('click', function(e) {
  fetch('/subscribe', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscribeKey: 'hello' })
  })
});
