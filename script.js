const container = document.querySelector('.container');
const searchBtn = document.querySelector(".search-box button");
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const weatherForecast = document.querySelector('.weather-forecast');
const notFound = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const cityInput = document.querySelector('.search-box input');
const KLUTCH = '2abb4416717d1e1b37ce607e0476dab1';

const getWeather = () => {
    const cityName = cityInput.value.trim();

    if (!cityName) {
        return;
    }
    const WEATHER_CALL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${KLUTCH}&units=metric`;

    fetch(WEATHER_CALL).then(response => response.json()).then(json => {
        if (json.cod == '404') {
            cityHide.textContent = cityName;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            weatherForecast.classList.remove('active');
            notFound.classList.add('active');
            return;
        }
        
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const temperatureFeels = document.querySelector('.weather-box .temperatureFeels');
        const temperatureMinMax = document.querySelector('.weather-box .temperatureMinMax');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        const imageTomorrow = document.querySelector('.weather-forecast img');
        const weatherTomorrow = document.querySelector('.weather-forecast .weather-tomorrow');

        if (cityHide.textContent == cityName) {
            return;
        }
        else {
            cityHide.textContent = cityName;

            container.style.height = '655px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            weatherForecast.classList.add('active');
            notFound.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            console.log(json);
            switch (json.list[0].weather[0].icon) {
                case '01d':
                    image.src = 'assets/clear.png';
                    image.classList.add('active');
                    break;
                case '02d':
                    image.src = 'assets/cloud.png';
                    image.classList.add('active');
                    break;
                default:
                    image.classList.remove('active');
                    image.src = `https://openweathermap.org/img/wn/${json.list[0].weather[0].icon}@4x.png`;
            }

            temperature.innerHTML = `${Math. round(parseFloat(json.list[0].main.temp))}<span>°C</span>`;
            temperatureFeels.innerHTML = `Feels like ${Math.round(parseFloat(json.list[0].main.feels_like))}<span>°C</span>`;
            temperatureMinMax.innerHTML = `Min ${Math.round(parseFloat(json.list[0].main.temp_min))}<span>°C</span> / Max ${Math.round(parseFloat(json.list[0].main.temp_max))}<span>°C</span>`;
            description.innerHTML = `${json.list[0].weather[0].description}`;
            humidity.innerHTML = `${json.list[0].main.humidity}%`;
            wind.innerHTML = `${Math.round(parseFloat(json.list[0].wind.speed))}km/h`;
            imageTomorrow.src = `https://openweathermap.org/img/wn/${json.list[8].weather[0].icon}@2x.png`;
            weatherTomorrow.innerHTML = `Tomorrow: Temp. ${Math.round(parseFloat(json.list[8].main.temp))}°C / Feels ${Math.round(parseFloat(json.list[8].main.feels_like))}°C`;
            
            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const oneCloneInfoWeather = infoWeather.cloneNode(true);
            const oneCloneInfoHumidity = infoHumidity.cloneNode(true);
            const oneCloneInfoWind = infoWind.cloneNode(true);

            oneCloneInfoWeather.id = 'clone-info-weather';
            oneCloneInfoWeather.classList.add('active-clone');
            oneCloneInfoHumidity.id = 'clone-info-humidity';
            oneCloneInfoHumidity.classList.add('active-clone');
            oneCloneInfoWind.id = 'clone-info-wind';
            oneCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", oneCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", oneCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", oneCloneInfoWind);
            }, 2200);

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }
        }
    });
}


searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getWeather());

