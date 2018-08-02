const getButton = document.getElementById('get-btn');
const updateButton = document.getElementById('update-btn');
const dataContainer = document.getElementById('data');

getButton.addEventListener('click', function(e) {
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

updateButton.addEventListener('click', function(e) {
  fetch('/updateData', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: 4 })
  })
});
