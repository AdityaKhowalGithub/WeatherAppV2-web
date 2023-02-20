const container = document.querySelector(".container");
const search = document.querySelector(".search-button button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");

container.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      search.click();
    }
  });

search.addEventListener("click", () => {
    const APIkey = "5b2165dbd3b45843a63251f57082b91e";
    const city = document.querySelector(".search-button input").value;

    if (city === "") 
        return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`
    )
        .then((response) => response.json())
        .then((json) => {
            
            if (json.cod === "404") {
                container.style.height = "400px";
                weatherBox.style.display = "none";
                weatherDetails.style.display = "none";
                notFound.style.display = "block";
                notFound.style.scale = "20%";
                notFound.classList.add("fadein");
                return;
            }

            notFound.style.display = "none";
            notFound.classList.remove("fadein");

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const windSpeed = document.querySelector(".weather-details .wind span");

            switch (json.weather[0].main) {
                case "Clouds":
                    image.src = "https://img.icons8.com/color/96/000000/clouds.png";
                    break;
                case "Clear":
                    image.src = "https://img.icons8.com/color/96/000000/sun.png";
                    break;
                case "Rain":
                    image.src = "https://img.icons8.com/color/96/000000/rain.png";
                    break;
                case "Snow":
                    image.src = "https://img.icons8.com/color/96/000000/snow.png";
                    break;
                case "Thunderstorm":
                    image.src = "https://img.icons8.com/color/96/000000/thunderstorm.png";
                    break;
                case "Drizzle":
                    image.src = "https://img.icons8.com/color/96/000000/drizzle.png";
                    break;
                case "Mist":
                    image.src = "https://img.icons8.com/color/96/000000/fog-day.png";
                    break;
                case "Smoke":
                    image.src = "https://img.icons8.com/color/96/000000/fog-day.png";
                    break;
                case "Haze":
                    image.src = "https://img.icons8.com/color/96/000000/fog-day.png";
                    break;
                case "Dust":
                    image.src = "https://img.icons8.com/color/96/000000/fog-day.png";
                    break;
                case "Fog":
                    image.src = "https://img.icons8.com/color/96/000000/fog-day.png";
                    break;
                default:
                    image.src = "no location found.png";
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            windSpeed.innerHTML = `${json.wind.speed} km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add("fadein");
            weatherDetails.classList.add("fadein");
            container.style.height = "590px";
        });
});
