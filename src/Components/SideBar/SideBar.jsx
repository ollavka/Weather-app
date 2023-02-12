import React, { useContext, useEffect } from "react"
import CurrentTime from "./CurrentTime.jsx"
import WeatherContext from "../WeatherContext.js"
import Icon from "../Icon.jsx"

const SideBar = () => {   
    const handleChangeLocation = event => setWeatherLocation(event.target.value)
    
    const handleChangeURL = () => {
        if (weatherLocation) {
            setURL(`https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${weatherLocation}&appid=a304ea31da4c714e6dc59fcd19887814`)
            setWeatherLocation('')
        }
    }

    const { weatherData, activeDay, activeTimeDay, unitWeather, weatherLocation, setWeatherLocation, setURL, theme, keyPressed } = useContext(WeatherContext)
    
    useEffect(() => {
        if (keyPressed === 'Enter') {
            handleChangeURL()
        }
    }, [keyPressed])

    if (weatherData.error) {
        return (
            <section className={`weather__sidebar sidebar${theme === 'light' ? ' theme-light' : ''}`}>
                <div className="sidebar__container">
                    <div className="sidebar__search search">
                        <Icon type='symbol'>search</Icon>
                        <input onChange={handleChangeLocation} value={weatherLocation} className="search__input" type="text" placeholder='Search for place' />
                        <button onClick={handleChangeURL} className="search__button">
                            <Icon type='symbol'>location_on</Icon>
                        </button>
                    </div>
                    <div className="sidebar__error">
                        {weatherData.error}
                    </div>
                </div>
            </section>
        )
    }

    const { location, list } = weatherData
    const curentWeatherInfo = list[activeDay][activeTimeDay]

    return (
        <section className={`weather__sidebar sidebar${theme === 'light' ? ' theme-light' : ''}`}>
            <div className="sidebar__container">
                <div className="sidebar__search search">
                    <Icon type='symbol'>search</Icon>
                    <input onChange={handleChangeLocation} value={weatherLocation} className="search__input" type="text" placeholder='Search for place' />
                    <button onClick={handleChangeURL} className="search__button">
                        <Icon type='symbol'>location_on</Icon>
                    </button>
                </div>
                <div className="sidebar__current-weather current-weather">
                    <Icon type={curentWeatherInfo.weather.icon} className="current-weather__img" />
                    <div className={`current-weather__temperature temperature${unitWeather === 'F' ? ' fahrenheit' : ' celsius'}`}>
                        <div className="temperature__number temperature__number-celsius">
                            {curentWeatherInfo.weather.tempC}
                            <sup>
                                <span className="temperature__mark">°C</span>
                            </sup>
                        </div>
                        <div className="temperature__number temperature__number-fahrenheit">
                            {curentWeatherInfo.weather.tempF}
                            <sup>
                                <span className="temperature__mark">°F</span>
                            </sup>
                        </div>
                    </div>
                </div>
                <div className="sidebar__weather-info weather-info">
                    <div className="weather-info__place">
                        <div className="weather-info__location">{`${location.city}, ${location.country}`}</div>
                        <div className="weather-info__date">{`${curentWeatherInfo.date.dayWeek}, ${curentWeatherInfo.date.month}, ${curentWeatherInfo.date.dayMonth}`}</div>
                    </div>
                    <hr className="weather-info__line" />
                    <div className="weather-info__data">
                        <div className="weather-info__description weather-decription">
                            <Icon type='symbol'>cloud</Icon>
                            <span className="weather-description__text">{curentWeatherInfo.weather.description}</span>
                        </div>
                        <CurrentTime />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SideBar
