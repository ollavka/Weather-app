/*---------TIME-----------------*/
const currentDate = document.querySelector('.header__date');
const weekArr = ["Sunday", "Monday", "Tuesday", "Wednesdey", "Thursday", "Friday", "Saturday"];
const monthArr = ["January", "February", "March", "April", "May", "June", "Jule", "August", "September", "October", "November", "December"];

const myDate = new Date();
let year = myDate.getFullYear();
let dayWeek = weekArr[myDate.getDay()];
let month = monthArr[myDate.getMonth()];
let dayMonth = myDate.getDate();
let hours = myDate.getHours();
let minutes = myDate.getMinutes();
let timeFormat;

dayMonth = dayMonth < 10 ? `0${dayMonth}` : dayMonth;
timeFormat = hours >= 0 && hours < 12 ? timeFormat = 'AM' : timeFormat = 'PM';
hours = hours > 12 ? hours - 12 : hours;

hours = hours < 10 ? `0${hours}` : hours;
minutes = minutes < 10 ? `0${minutes}` : minutes;

let currentDateTemplate = `
    <div class="date__time">${hours}:${minutes} ${timeFormat}</div>
    <div class="date__full-date">${dayWeek}, ${dayMonth} ${month}, ${year}</div>`;

currentDate.innerHTML = currentDateTemplate;



/*---------THEME----------------*/
const container = document.querySelectorAll('._container');
const weatherList = document.querySelectorAll('.weather-list__item');
const todayDate = document.querySelector('.date__full-date');
const switchbox = document.getElementById("check");

switchbox.addEventListener('click', () => {
    if (switchbox.checked) {
        for (let i = 0; i < container.length; i++) {
            container[i].classList.add('change-theme');
        }

        for (let i = 0; i < weatherList.length; i++) {
            weatherList[i].classList.add('change-theme');
        }
        
        todayDate.classList.add('change-theme');
    } 
    else {
        for (let i = 0; i < container.length; i++) {
            container[i].classList.remove('change-theme');
        }  
        
        for (let i = 0; i < weatherList.length; i++) {
            weatherList[i].classList.remove('change-theme');
        }
        
        todayDate.classList.remove('change-theme');
    }
});



/*------WEATHER-----------------*/
const currentWeather = document.querySelector('.main__current-weather');
const searchLocation = document.querySelector('.location__search');
const searchButton = document.querySelector('.location__button');

let myLocation;
let urlWeather;
const apiKey = 'a304ea31da4c714e6dc59fcd19887814';

searchButton.addEventListener('click', () => {
    searchMyLocation();

});

document.addEventListener('keydown', (event) => {
    if (event.keyCode == 13) {
        searchMyLocation();
    }
});

if (myLocation == undefined) {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        
        urlWeather = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
        
        weatherList[0].classList.add('disable');

        loadWeather(urlWeather);
    });   
}

function searchMyLocation() {
    myLocation = searchLocation.value;
    searchLocation.value = '';
    urlWeather = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${myLocation}&appid=${apiKey}`;
    currentWeather.innerHTML = '';

    for (let i = 0; i < weatherList.length; i++) {
        weatherList[i].classList.remove('active');
        weatherList[i].classList.remove('disable');
    }
    
    weatherList[0].classList.add('disable');

    loadWeather(urlWeather);
}

async function loadWeather(urlWeather) {
    const response = await fetch(urlWeather, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((response) => {
        for (let i = 1; i < weatherList.length; i++) {
            weatherList[i].classList.remove('disable');
        }
        getWeather(response);   
    }).catch(error => {
        for (let i = 1; i < weatherList.length; i++) {
            weatherList[i].classList.add('disable');
        }
        console.log(error);
        currentWeather.innerHTML = 'City not found!';  
    });
}

function getWeather(data) {
    
    let j = 0;
    let cntCurrentDay = (24 - new Date(data.list[0].dt_txt).getHours()) / 3;
    let cntLastDay = (data.cnt - 32) - cntCurrentDay;
    let cntOtherDay = 8;
    
    
    firstLoop: 
    for (let i = 0; i < weatherList.length; i++) {
        
        while (j < data.cnt) {
            let dayWeek = String(new Date(data.list[j].dt_txt)).slice(0, 3);
            let weatherIcon = setWeatherIcon(data, j);
            let temp = Math.round(data.list[j].main.temp)
            let weatherItemTamplate = `
            <div class="list-item__img">
            <img src=${weatherIcon} alt="weather">
            </div>
            <div class="list-item__text">
            <div class="list-item__day">${dayWeek}</div>
            <div class="list-item__temp">${temp}°C</div>
            </div>`;
            
            weatherList[i].innerHTML = weatherItemTamplate;
            
            j += 8;
            
            j === 40 ? j-- : j;
            
            continue firstLoop;
        }
    }
    
    weatherList[0].classList.add('active');
        
    for (let i = 0; i < cntCurrentDay; i++) {
        setWeather(data, i);
    }
        

    for (let i = 0; i < weatherList.length; i++) {
        weatherList[i].addEventListener('click', () => {
            for (let i = 0; i < weatherList.length; i++) {
                weatherList[i].classList.remove('active');
            }
            
            weatherList[i].classList.add('active');
            
            
            weatherList[i].classList.add('disable');
            
            for (let j = 0; j < weatherList.length; j++) {
                if (j != i) {
                    weatherList[j].classList.remove('disable');
                }
            }
            
            currentWeather.innerHTML = '';

            if (i == 0) {
                for (let cnt = 0; cnt < cntCurrentDay; cnt++) {
                    setWeather(data, cnt);
                }
            }
            else if (i == 1) {
                for (let cnt = cntCurrentDay; cnt < cntOtherDay + cntCurrentDay; cnt++) {
                    setWeather(data, cnt);
                }
            }
            else if (i == weatherList.length - 1) {
                for (let cnt = (data.cnt - cntLastDay); cnt < data.cnt; cnt++) {
                    setWeather(data, cnt);
                }
            } 
            else {
                let startCnt = cntOtherDay * (i - 1) + cntCurrentDay;
                for (let cnt = startCnt; cnt < startCnt + cntOtherDay; cnt++) {
                    setWeather(data, cnt);
                }
            }
        });
    }
}

function setWeather(data, index) {

    const weatherDate = new Date(data.list[index].dt_txt);

    let dayWeek = weekArr[weatherDate.getDay()];
    let month = monthArr[weatherDate.getMonth()];
    let dayMonth = weatherDate.getDate();
    let hours = weatherDate.getHours();
    let timeFormat;

    timeFormat = hours >= 0 && hours <= 12 ? timeFormat = 'AM' : timeFormat = 'PM';
    hours = hours > 12 ? hours - 12 : hours;
    hours = hours < 10 ? `0${hours}` : hours;

    const sunriseTime = new Date(data.city.sunrise * 1000);
    let sunriseHours = sunriseTime.getHours();
    let sunriseMinutes = sunriseTime.getMinutes();
    sunriseHours = sunriseHours > 12 ? sunriseHours - 12 : sunriseHours;
    sunriseHours = sunriseHours < 10 ? `0${sunriseHours}` : sunriseHours; 
    sunriseMinutes = sunriseMinutes < 10 ? `0${sunriseMinutes}` : sunriseMinutes;   

    const sunsetTime = new Date(data.city.sunset * 1000);
    let sunsetHours = sunsetTime.getHours();
    let sunsetMinutes = sunsetTime.getMinutes();
    sunsetHours = sunsetHours > 12 ? sunsetHours - 12 : sunsetHours;
    sunsetHours = sunsetHours < 10 ? `0${sunsetHours}` : sunsetHours; 
    sunsetMinutes = sunsetMinutes < 10 ? `0${sunsetMinutes}` : sunsetMinutes;   

    let weatherIcon = setWeatherIcon(data, index);

    currentWeather.insertAdjacentHTML(
        'beforeend',
        `<div class="current-weather__item weather-item">
            <div class="weather-item__header">
                <div class="weather-item__location">${data.city.name}</div>
                <div class="weather-item__time">${hours}:00 ${timeFormat}</div>
            </div>
            <div class="weather-item__img">
                <img src=${weatherIcon} alt="weather">
            </div>
            <div class="weather-item__date">${dayWeek}, ${dayMonth} ${month}</div>
            <div class="weather-item__temp">${Math.round(data.list[index].main.temp)}°</div>
            <div class="weather-item__description">${data.list[index].weather[0].main}</div>
            <div class="weather-item__info-weather info-weather">
                <div class="info-weather__column1">
                    <div class="info-weather__wind-text">Wind</div>
                        <div class="info-weather__hum-text">Hum</div>
                    </div>
                <div class="info-weather__column2">
                    <div class="info-weather__line"></div>
                    <div class="info-weather__line"></div>
                </div>
                <div class="info-weather__column3">
                    <div class="info-weather__wind-speed">${data.list[index].wind.speed} m/s</div>
                    <div class="info-weather__hum-percent">${data.list[index].main.humidity}%</div>
                </div>
            </div>
            <div class="weather-item__info-sun info-sun">
                <div class="info-sun__sunrise">
                    <div class="info-sun__text">Sunrise</div>
                    <div class="info-sun__time">${sunriseHours}:${sunriseMinutes} AM</div>
                </div>
                <div class="info-sun__sunset">
                    <div class="info-sun__text">Sunset</div>
                    <div class="info-sun__time">${sunsetHours}:${sunsetMinutes} PM</div>
                </div>
            </div>
        </div>`
    )
}

function setWeatherIcon(data, index) {
    if (data.list[index].weather[0].icon == '01d') {
       return "./img/sun-img/sun.png";
    } else if (data.list[index].weather[0].icon == '02d') {
        return "./img/sun-img/less-clouds.png";
    } else if (data.list[index].weather[0].icon == '03d' || data.list[index].weather[0].icon == '04d') {
        return "./img/sun-img/more-clouds.png";
    } else if (data.list[index].weather[0].icon == '09d' || data.list[index].weather[0].icon == '10d') {
        return "./img/sun-img/rain.png";
    } else if (data.list[index].weather[0].icon == '11d') {
        return "./img/sun-img/storm.png";
    } else if (data.list[index].weather[0].icon == '13d') {
        return "./img/sun-img/snow.png";
    } else if (data.list[index].weather[0].icon == '50d') {
        return "./img/sun-img/foggy.png";
    } else if (data.list[index].weather[0].icon == '01n') {
        return "./img/moon-img/moon.png";
    } else if (data.list[index].weather[0].icon == '02n') {
        return "./img/moon-img/less-clouds.png";
    } else if (data.list[index].weather[0].icon == '03n' || data.list[index].weather[0].icon == '04n') {
        return "./img/moon-img/more-clouds.png";
    } else if (data.list[index].weather[0].icon == '09n' || data.list[index].weather[0].icon == '10n') {
        return "./img/moon-img/rain.png";
    } else if (data.list[index].weather[0].icon == '11n') {
        return "./img/moon-img/storm.png";
    } else if (data.list[index].weather[0].icon == '13n') {
        return "./img/moon-img/snow.png";
    } else if (data.list[index].weather[0].icon == '50n') {
        return "./img/moon-img/foggy.png";
    } 
}
