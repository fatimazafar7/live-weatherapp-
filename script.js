
const weather_body = document.querySelector('.weather-body');
document.addEventListener('DOMContentLoaded', function () {
    var searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', function () {
        var cityInput = document.getElementById('cityinput').value;
        if (cityInput.trim() !== '') {
            getWeather(cityInput);
            // console.log("Hassan")
        }
    });
});

function getWeather(city) {
    var apiKey = '9920008360e6212a01a59fd9eb579f46'; 
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey + '&units=metric';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function () {
        weather_body.style.display = "flex";
        if (xhr.status === 200) {
            
            var data = JSON.parse(xhr.responseText); // Corrected the typo here
            // console.log(xhr.responseText);
             displayWeather(data);
        } else {
            alert('Error: ' + xhr.statusText);
        }
    };
    
    xhr.onerror = function () {
        alert('Request failed');
    };
    xhr.send();
}

function displayWeather(data){
    var temperature = data.main.temp;
    var description = data.weather[0].description;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;

    // Updating the HTML elements with the retrieved data
    document.getElementById('temperature').innerHTML = temperature + '°C';
    document.getElementById('description').innerHTML = capitalizeFirstLetter(description);
    document.getElementById('humidity').innerHTML = humidity + '%';
    document.getElementById('wind-speed').innerHTML = windSpeed + ' m/s';

    // Switch statement to set weather icon based on weather description
    var weather_img = document.getElementById('classimage');
    switch(description.toLowerCase()){
        case 'few clouds':
            weather_img.src = "cloud.png";
            break;
        case 'clear sky':
            weather_img.src = "clear.png";
            break;
        case 'rain':
            weather_img.src = "rain.png";
            break;
        case 'overcast clouds':
            weather_img.src = "mist.png";
            break;
        case 'snow':
            weather_img.src = "snow.png";
            break;
        default:
            weather_img.src = "default.png"; // Default image if description doesn't match any case
            break;
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


