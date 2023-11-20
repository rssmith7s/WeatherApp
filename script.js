function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;

    if (cityName.trim() === '') {
        alert('Please enter a city name');
        return;
    }

    // Assuming you have an API key for OpenWeatherMap
    const apiKey = '159c8f7ca8ecc97827924dee36369cfc';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');

            // Check if the expected properties exist in the response
            if (data.name && data.sys && data.sys.country && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].description) {
                weatherInfo.innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp} K</p>
                    <p>Description: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            } else {
                // Handle incomplete or unexpected response
                console.error('Incomplete or unexpected response:', data);
                alert('Error fetching weather data. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}