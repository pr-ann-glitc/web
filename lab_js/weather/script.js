let currentDay = 0;
let dataDay = null;
let hourlyData = null;
const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
];

function getPosition() {
    const isConfirm = confirm("Использовать текущее местоположение?");
    if (isConfirm && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                loadWeather(position.coords.latitude, position.coords.longitude, false);
            },
            function(error) {
                console.log(`Ошибка геолокации: ${error.message}`);
                loadWeather(null, null, true);
            }
        );
    } else {
        console.log('Используются данные по умолчанию');
        loadWeather(null, null, true);
    }
}

function loadWeather(latitude, longitude, isDefault) {
    const start_date = new Date();
    const string_start_date = formatDate(start_date);
    
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 7);
    const string_end_date = formatDate(end_date);
    
    if (!isDefault) {
        fetchWeatherApi(latitude, longitude, string_start_date, string_end_date);
        getCityFromNominatim(latitude, longitude).then(cityName => {
            document.getElementById('response').textContent = `🏴 ${cityName}`;
        });
    } else {
        fetchWeatherApi(55.7558, 37.6173, string_start_date, string_end_date);
        getCityFromNominatim(55.7558, 37.6173).then(cityName => {
            document.getElementById('response').textContent = `🏴 ${cityName}`;
        });
    }
}

function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

document.getElementById('prev-button').addEventListener('click', function() {
    if (dataDay && currentDay > 0) {
        currentDay--;
        updateCarousel();
    }
});

document.getElementById('next-button').addEventListener('click', function() {
    if (dataDay && currentDay < dataDay.time.length - 1) {
        currentDay++;
        updateCarousel();
    }
});

function getWeatherByCode(code) {
    const weatherMap = {
        0:  { text: 'Ясно', icon: '☀️', image: './images/free-icon-sunny-6393507.png' },
        1:  { text: 'Преимущественно ясно', icon: '🌤️', image: './images/free-icon-cloudy-day-6393344.png' },
        2:  { text: 'Переменная облачность', icon: '⛅', image: './images/free-icon-cloudy-day-6393344.png' },
        3:  { text: 'Пасмурно', icon: '☁️', image: './images/free-icon-cloud-6393324.png' },
        45: { text: 'Туман', icon: '🌫️', image: './images/free-icon-fog-6393369.png' },
        48: { text: 'Изморозь', icon: '🌫️', image: './images/free-icon-fog-6393369.png' },
        51: { text: 'Легкая морось', icon: '🌦️', image: './images/free-icon-rain-6393516.png' },
        53: { text: 'Морось', icon: '🌦️', image: './images/free-icon-rain-6393516.png' },
        55: { text: 'Сильная морось', icon: '🌧️', image: './images/free-icon-rain-6393440.png' },
        61: { text: 'Небольшой дождь', icon: '🌦️', image: './images/free-icon-rain-6393440.png' },
        63: { text: 'Дождь', icon: '🌧️', image: './images/free-icon-rain-6393440.png' },
        65: { text: 'Сильный дождь', icon: '🌧️', image: './images/free-icon-rain-6393385.png' },
        71: { text: 'Небольшой снег', icon: '🌨️', image: './images/free-icon-snowfall-6393465.png' },
        73: { text: 'Снег', icon: '❄️', image: './images/free-icon-snowflake-6393478.png' },
        75: { text: 'Сильный снег', icon: '❄️', image: './images/free-icon-snowfall-6393465.png' },
        77: { text: 'Снежные зерна', icon: '❄️', image: './images/free-icon-snowflake-6393478.png' },
        80: { text: 'Ливень', icon: '🌧️', image: './images/free-icon-rain-6393385.png' },
        81: { text: 'Сильный ливень', icon: '⛈️', image: './images/free-icon-rain-6393385.png' },
        82: { text: 'Очень сильный ливень', icon: '⛈️', image: './images/free-icon-rain-6393385.png' },
        85: { text: 'Снегопад', icon: '🌨️', image: './images/free-icon-snowfall-6393465.png' },
        86: { text: 'Сильный снегопад', icon: '🌨️', image: './images/free-icon-snowfall-6393465.png' },
        95: { text: 'Гроза', icon: '⛈️', image: './images/free-icon-storm-6393497.png' },
        96: { text: 'Гроза с градом', icon: '⛈️', image: './images/free-icon-thunderstorm-6393525.png' },
        99: { text: 'Сильная гроза с градом', icon: '⛈️', image: './images/free-icon-thunderstorm-6393525.png' }
    };
    
    return weatherMap[code] || { text: 'Неизвестно', icon: '❓', image: '' };
}

function getWeatherForDay(dayIndex) {
    if (!dataDay || !dataDay.weather_code) {
        return { text: 'Нет данных', icon: '❓', image: '' };
    }
    const code = dataDay.weather_code[dayIndex];
    return getWeatherByCode(code);
}

function createCarousel() {
    if (!dataDay) return;
    
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = '';
    dataDay.time.forEach((_, index) => {
        const slide = createDaySlide(index);
        carousel.appendChild(slide);
    });
    const radioDiv = document.createElement('div');
    
    dataDay.time.forEach((_, index) => {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'select';
        radio.value = index;
        radio.disabled = true;
        radioDiv.appendChild(radio);
    });
    
    carousel.appendChild(radioDiv);
    updateCarousel();
}

function createDaySlide(dayIndex) {
    const slide = document.createElement('div');
    slide.className = 'carousel-element';
    slide.id = `slide-${dayIndex}`;
    slide.style.display = 'none';
    
    const date = new Date(dataDay.time[dayIndex]);
    const temp = Math.round(dataDay.temperature_2m_max[dayIndex]);
    const feelTemp = Math.round(dataDay.apparent_temperature_max[dayIndex]);
    const displayTemp = temp > 0 ? `+${temp}` : temp;
    const displayFeelTemp = feelTemp > 0 ? `+${feelTemp}` : feelTemp;
    const weather = getWeatherForDay(dayIndex);
    
    const dateForSunrise = new Date(dataDay.sunrise[dayIndex]);
    const dateForSunset = new Date(dataDay.sunset[dayIndex]);
    const timeSunrise = `${String(dateForSunrise.getHours()).padStart(2, '0')}:${String(dateForSunrise.getMinutes()).padStart(2, '0')}`;
    const timeSunset = `${String(dateForSunset.getHours()).padStart(2, '0')}:${String(dateForSunset.getMinutes()).padStart(2, '0')}`;
    slide.innerHTML = `
        <span id="date">${date.getDate()} ${months[date.getMonth()]}, ${date.toLocaleString('ru-RU', { weekday: 'long' })}</span>
        <div class="container">
            <div class="temperature">
                <span>${displayTemp}°C</span>
                <span id="temp-feel-like" class="other-text">Ощущается как ${displayFeelTemp}°C</span>
                <span class="description-text">${weather.text}</span>
                <span class="wind-text">Ветер: ${Math.round(dataDay.wind_speed_10m_max[dayIndex] / 3.6)} м/с</span>
            </div>
            <div class="other">
                <div>
                    <img src="${weather.image}" alt="${weather.text}" width="200" height="200">
                </div>
            </div>
        </div>
        <div class="container-x">
            <span class="sunrise-sunset">Восход / закат: ${timeSunrise} — ${timeSunset}</span>
            <span class="other-text">Вероятность осадков: ${dataDay.precipitation_probability_max[dayIndex]}%</span>
        </div>`;
    return slide;
}

function updateCarousel() {
    if (!dataDay) return;
    document.querySelectorAll('.carousel-element').forEach((slide, index) => {
        slide.style.display = index === currentDay ? 'flex' : 'none';
    });
    const radios = document.getElementsByName('select');
    if (radios[currentDay]) {
        radios[currentDay].checked = true;
    }
}

function fetchWeatherApi(latitude, longitude, start_date, end_date) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,apparent_temperature_max,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max&hourly=cloud_cover,precipitation&timezone=auto&start_date=${start_date}&end_date=${end_date}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            dataDay = data.daily;
            hourlyData = data.hourly;
            currentDay = 0;
            createCarousel();
        })
        .catch(error => {
            console.log('API недоступно:', error.message);
        });
}

function getCityFromNominatim(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=ru`;
    let city;
    
    return fetch(url, {
        headers: {
            'User-Agent': 'WeatherApp/1.0 (student project)'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data.address.city_district) {
            city = data.address.city;
        } else {
            city = data.address.city + ', ' + data.address.city_district;
        }
        return city || 'Неизвестное местоположение';
    })
    .catch(error => {
        console.log('Nominatim ошибка:', error.message);
        return 'Неизвестное местоположение';
    });
}

getPosition();