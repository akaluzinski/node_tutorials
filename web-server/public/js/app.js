const weatherForm = document.querySelector('.weather-form');
const locationInput = document.querySelector('#location-input');
const weatherMessage = document.querySelector('.weather-message');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    weatherMessage.innerText = 'Loading...';

    if (locationInput.value.length > 0) {
        fetch(`/weather?location=${locationInput.value}`).then(response => {
            response.json().then((data, error) => {
                let message;
                if (error) {
                    message = error;
                } else if (data.error) {
                    message = data.error;
                } else {
                    message = data.message;
                }
                weatherMessage.innerText = message;
            });
        });
    }
});
