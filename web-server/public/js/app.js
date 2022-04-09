const weatherForm = document.querySelector('.weather-form');
const locationInput = document.querySelector('#location-input');
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (locationInput.value.length > 0) {
        fetch(`/weather?location=${locationInput.value}`).then(response => {
            response.json().then((data, error) => {
                if (error) {
                    console.error(error);
                } else if (data.error) {
                    console.error(data.error);
                } else {
                    document.getElementById('weather-message').innerText = data.message;
                    console.log(data.message);
                }
            });
        });
    }
});
