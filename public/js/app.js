//fetch('https://puzzle.mead.io/puzzle')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationMessageContainer = document.getElementById('location-message');
const forecastMessageContainer = document.getElementById('forecast-message');
const errorMessageContainer = document.getElementById('error-message');

weatherForm.addEventListener('submit', (eve) => {
    eve.preventDefault();

    const location = search.value;
    locationMessageContainer.textContent = '... Getting weather for "' + location + '"...';
    forecastMessageContainer.textContent = '';
    errorMessageContainer.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationMessageContainer.textContent = '';
                errorMessageContainer.textContent = data.error;
            } else {
                locationMessageContainer.textContent = 'Location: ' + data.searchTerm;
                forecastMessageContainer.textContent = 'Forecast: ' + data.forecast;
            }
        });
    });
});