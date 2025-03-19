const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeather API key

// Function to get weather data
async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const weatherInfo = document.getElementById('weatherInfo');
    
    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        weatherInfo.style.display = "none";
        return;
    }

    errorMessage.textContent = ""; // Clear any previous error message

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod !== 200) {
            errorMessage.textContent = "City not found. Please try again.";
            weatherInfo.style.display = "none";
            return;
        }

        // Extracting weather data
        const cityName = data.name;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;

        // Displaying weather data
        document.getElementById('cityName').textContent = cityName;
        document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
        document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
        document.getElementById('weatherDescription').textContent = weatherDescription;
        document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${weatherIcon}.png`;

        weatherInfo.style.display = "block"; // Show weather info
    } catch (error) {
        errorMessage.textContent = "An error occurred. Please try again later.";
        weatherInfo.style.display = "none";
    }
}
