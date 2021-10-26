let weatherData;
let searchedCity = document.getElementById("searched_city").value
let searchCity = document.getElementById("search_city")

searchCity.addEventListener("click", function(){
    searchedCity = document.getElementById("searched_city").value
    updateContent();
})

async function getWeatherData(){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=metric&appid=ef520a6e42caf9f323b895d135747dc6`
    weatherData = await fetch(url).then(response => response.json())
}

async function updateContent(){
    await getWeatherData();

    //icon
    const icon = document.createElement("img");
        icon.setAttribute("src", `img/${weatherData.weather[0].icon}.png`);
        const iconContainer = document.getElementById("icon");
        iconContainer.innerHTML = "" //Clean old data
        iconContainer.appendChild(icon); //Add new data

    //Real temp
    document.getElementById("real_temp").innerHTML = ""; //Clean old data
    document.getElementById("real_temp").append(Math.floor(weatherData.main.temp));

    //Feels Like
    document.getElementById("feels_like").innerHTML = ""; //Clean old data
    document.getElementById("feels_like").append(`${Math.floor(weatherData.main.feels_like)} °C`); //Add new data

    //Sky condition
    document.getElementById("sky").innerHTML = ""; //Clean old data
    document.getElementById("sky").append(weatherData.weather[0].main); //Add new data

    //City name
    document.getElementById("city_name").innerHTML = ""; //Clean old data
    document.getElementById("city_name").append(weatherData.name); //Add new data

    //Country
    document.getElementById("country").innerHTML = ""; //Clean old data
    document.getElementById("country").append(weatherData.sys.country); //Add new data

    //Wind Direction
    document.getElementById("wind_deg").innerHTML = ""; //Clean old data
    document.getElementById("wind_deg").append(`${weatherData.wind.deg}°`); //Add new data

    //Wind Speed
    document.getElementById("wind_speed").innerHTML = ""; //Clean old data
    document.getElementById("wind_speed").append(`${weatherData.wind.speed} Km/h`); //Add new data

    //Humidity
    document.getElementById("humidity").innerHTML = ""; //Clean old data
    document.getElementById("humidity").append(`${weatherData.main.humidity}%`); //Add new data

    //Pressure
    document.getElementById("pressure").innerHTML = ""; //Clean old data
    document.getElementById("pressure").append(`${weatherData.main.pressure} Pa`); //Add new data


    const sunriseUnix = weatherData.sys.sunrise;
        sunrise = new Date(sunriseUnix * 1000);

        sunriseHours = sunrise.getHours();
        sunriseHours = `0${sunriseHours}`;

        sunriseMinutes = sunrise.getMinutes();
        sunriseMinutes = sunriseMinutes.toString();
        if(sunriseMinutes.length == 1){
            sunriseMinutes = `0${sunriseMinutes}`;
        }
        sunriseTime = `${sunriseHours}:${sunriseMinutes}`;

        document.getElementById("sunrise").innerHTML = "" //Clean old data
        document.getElementById("sunrise").append(sunriseTime); //Add new data

        
    const sunsetUnix = weatherData.sys.sunset;
        sunset = new Date(sunsetUnix * 1000);

        sunsetHours = sunset.getHours();

        sunsetMinutes = sunset.getMinutes();
        sunsetMinutes = sunsetMinutes.toString();
        if(sunsetMinutes.length == 1){
            sunsetMinutes = `0${sunsetMinutes}`;
        }
        sunsetTime = `${sunsetHours}:${sunsetMinutes}`;

        document.getElementById("sunset").innerHTML = ""; //Clean old data
        document.getElementById("sunset").append(sunsetTime); //Add new data
}

updateContent();