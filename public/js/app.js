const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

const locationMessage = document.querySelector('#locationMessage');
const weatherMessage  = document.querySelector('#weatherMessage');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    locationMessage.textContent = 'Loading..';
    weatherMessage.textContent = '';
    
    fetch('http://localhost:3000/weather?address=' + searchInput.value).then((response) => {
    
        response.json().then((data) => {
            if (data.error) {
                return locationMessage.textContent = data.error;
            }
            locationMessage.textContent = data.location + ':';
            weatherMessage.textContent = data.forecast;
        });
    });
});