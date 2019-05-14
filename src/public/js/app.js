const weatherForm = document.querySelector('form');
const currentLocationButton = document.querySelector('#current-location');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch('/weather?address=' + location).then(response => {
    response.json().then(data => {
      console.log(response);
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});

currentLocationButton.addEventListener('click', e => {
  e.preventDefault();

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
    var currentLatitude = position.coords.latitude.toString();
    var currentLongitude = position.coords.longitude.toString();

    fetch(`/currentweather?coords=${currentLatitude},${currentLongitude}`).then(
      response => {
        response
          .json()
          .then(data => {
            console.log(response);
            if (data.error) {
              messageOne.textContent = data.error;
            } else {
              messageOne.textContent = 'At your current location it is:';
              messageTwo.textContent = data.forecast;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  });
});
