const getDataButton = document.getElementById('get-btn');

const keyInput = document.getElementById('key-input');
const valueInput = document.getElementById('value-input');
const updateDataButton = document.getElementById('update-btn');
const dataContainer = document.getElementById('data');

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
