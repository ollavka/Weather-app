import React, { lazy, Suspense, useState, useEffect } from 'react'
import { usePosition } from '../hooks/usePosition.jsx'
import { useLocalStorage } from '../hooks/useLocalStorage.jsx'
import WeatherContext from './WeatherContext.js'
import Loader from './Loader'

const MainWeather = lazy(() => import('./MainWeather/MainWeather.jsx'))
const SideBar = lazy(() => import('./SideBar/SideBar.jsx'))


const Weather = () => {
    const [URL, setURL, urlError] = usePosition()
    const [isLoaded, setIsLoaded] = useState(false)
    const [weatherData, setWeatherData] = useState({})
    const [weatherLocation, setWeatherLocation] = useState('')
    const [weatherSwiper, setWeatherSwiper] = useState()
    const [activeDay, setActiveDay] = useState(0)
    const [activeTimeDay, setActiveTimeDay] = useState(0)
    
    const [theme, setTheme] = useLocalStorage('current-theme', 'dark')
    const [unitWeather, setUnitWeather] = useLocalStorage('unit-weather', 'C')

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesdey", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "Jule", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const getWeather = async () => {
            const response = await fetch(URL)
            const data = await response.json()

            if (+data.cod === 200) {
                const { city: currentLocation, list: weatherList } = data
            
                const resultData = Object.values(weatherList.reduce((arrDays, day, index) => {
                        (arrDays[new Date(day.dt_txt).getDate()] = arrDays[new Date(day.dt_txt).getDate()] || []).push({...day, id: index})
    
                        return arrDays
                    }, [])
                )   
    
                setWeatherData({
                    location: {
                        city: currentLocation.name,
                        country: currentLocation.country
                        
                    },
                    list: resultData.map(day => day.map(currTimeDay => {
                        return {
                            id: currTimeDay.id,
                            date: {
                                month: months[new Date(currTimeDay.dt_txt).getMonth()],
                                dayMonth: new Date(currTimeDay.dt_txt).getDate(),
                                dayWeek: weekDays[new Date(currTimeDay.dt_txt).getDay()],
                                time: `${new Date(currTimeDay.dt_txt).getHours() <= 9 ? `0${new Date(currTimeDay.dt_txt).getHours()}` : new Date(currTimeDay.dt_txt).getHours()}:00`
                            },
                            weather: {
                                tempC: Math.round(currTimeDay.main.temp),
                                tempF: Math.round((currTimeDay.main.temp * 1.8) + 32),
                                humidity: currTimeDay.main.humidity,
                                windSpeed: currTimeDay.wind.speed,
                                cloudiness: currTimeDay.clouds.all,
                                pop: Math.round(currTimeDay.pop * 100),
                                pressure: currTimeDay.main.grnd_level,
                                description: currTimeDay.weather[0].description.charAt(0).toUpperCase() + currTimeDay.weather[0].description.slice(1),
                                sunrise: {
                                    hours: new Date(currentLocation.sunrise * 1000).getHours() <= 9 ? `0${new Date(currentLocation.sunrise * 1000).getHours()}` : new Date(currentLocation.sunrise * 1000).getHours(),
                                    minutes: new Date(currentLocation.sunrise * 1000).getMinutes() <= 9 ? `0${new Date(currentLocation.sunrise * 1000).getMinutes()}` : new Date(currentLocation.sunrise * 1000).getMinutes()
                                },
                                sunset: {
                                    hours: new Date(currentLocation.sunset * 1000).getHours() <= 9 ? `0${new Date(currentLocation.sunset * 1000).getHours()}` : new Date(currentLocation.sunset * 1000).getHours(),
                                    minutes: new Date(currentLocation.sunset * 1000).getMinutes() <= 9 ? `0${new Date(currentLocation.sunset * 1000).getMinutes()}` : new Date(currentLocation.sunset * 1000).getMinutes()
                                }, 
                                icon: currTimeDay.weather[0].icon
                            }
                        }
                    }))
                })

                await setIsLoaded(true)
            } else {
                setWeatherData({ error: data.message, cod: data.cod })
            }
        }
        
        if (urlError) {
            setWeatherData({ error: urlError, description: 'please, enter location to search for the forecast yourself' })
        }    

        if (URL) {
            getWeather()
        }
        
    }, [URL, urlError])

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('theme-light')
        } else {
            document.body.classList.remove('theme-light')
        }
    }, [theme])

    const contextValue = {
        weatherData,
        activeDay, setActiveDay,
        unitWeather, setUnitWeather,
        activeTimeDay, setActiveTimeDay,
        weatherSwiper, setWeatherSwiper,
        weatherLocation, setWeatherLocation,
        setURL, urlError,
        theme, setTheme
    }

    return (
        <div className={`weather${theme === 'light' ? ' theme-light' : ''}`}>
            <div className="weather__container _container">
                {  
                    isLoaded && (
                        <Suspense fallback={<Loader className={`${theme === 'light' ? ' theme-light' : ''}`} />}>
                            <WeatherContext.Provider value={contextValue}>
                                <SideBar />
                                <MainWeather />
                            </WeatherContext.Provider>
                        </Suspense>
                    )
                }
            </div>
        </div>
    )
}

export default Weather