const container = document.querySelector(".container");
const search = document.querySelector(".search-button button");
const Searchinput = document.querySelector(".search-button input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".not-found");
const wrapper = document.querySelector(".wrapper");
const results = document.querySelector(".results");

//searchable stores all locations from openweather api
let searchable = [
    "Abidjan",
    "Accra",
    "Addis Ababa",
    "Algiers",
    "Seattle",
    "Germany",
];





wrapper.addEventListener("keypress", function (event) {
    results.style.display = "block";
    results.classList.add("fadein");
    results.style.scale = "1";
    results.style.opacity = "1";
    Searchinput.addEventListener("keyup", () => {
        let completion = [];
        
        let input = Searchinput.value;
        if (input.length > 0) {
            completion = searchable.filter((location) => {
                return location.toLowerCase().includes(input.toLowerCase());

            });
        }

        renderResults(completion);
        let size = completion.length * 50;
        if(size > 200) {
            size = 200;
        }
        if(size < 100) {
            size = 105;
        }
        if( results.innerHTML === ``) {
            results.style.opacity = "0";
            results.style.scale = "0";
            results.style.display = "none";
            results.classList.remove("fadein");
        }
        container.style.height = size + "px";
        
        
    });
    


    function renderResults(completion) {
        if(!completion.length) {
            results.innerHTML = ``;
            return;
        }

        let content = completion.map((location) => {
            return `<li>${location}</li>`;
        }).join("");

        results.innerHTML = `<ul>${content}</ul>`

    }
    if (event.key === "Enter") {
        search.click();
        results.style.display = "none";
        results.classList.remove("fadein");
        results.style.scale = "0";
        results.style.opacity = "0";
    }
    if (event.keyCode === 9 || event.which === 9 || event.key === "Tab") {
        console.log("tab");
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
