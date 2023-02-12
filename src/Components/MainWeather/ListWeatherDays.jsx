import React, { useContext } from "react"
import Icon from "../Icon.jsx"
import WeatherContext from '../WeatherContext.js'

const ListWeatherDays = () => {

    const { weatherData, activeDay, setActiveDay, unitWeather, weatherSwiper } = useContext(WeatherContext)

    const { list } = weatherData

    const listDays = list.map((day, index) => ({
        id: index,
        weekDay: String(day[index === 0 ? index : Math.round((day.length - 1) / 2)].date.dayWeek).slice(0, 3),
        tempC: day[index === 0 ? index : Math.round((day.length - 1) / 2)].weather.tempC,
        tempF: day[index === 0 ? index : Math.round((day.length - 1) / 2)].weather.tempF,
        icon: day[index === 0 ? index : Math.round((day.length - 1) / 2)].weather.icon
    }))

    const handleChangeActiveDay = (id) => {
        setActiveDay(id)
        weatherSwiper.slideTo(0, 0)
    }

    return (
        <div className="main-section__list-days list-days">
        {
            listDays.map(dayItem => {
                return (
                    <div onClick={() => handleChangeActiveDay(dayItem.id)} key={dayItem.id} className={`list-days__item${dayItem.id === activeDay ? ' active-day' : ''}`}>
                        <span className="list-days__weekday">{dayItem.weekDay}</span>
                        <Icon type={dayItem.icon} className="list-days__img" />
                        <div className={`list-days__temperature list-temperature${unitWeather === 'F' ? ' fahrenheit' : ' celsius'}`}>
                            <div className="list-temperature__celsius">{`${dayItem.tempC}°`}</div>
                            <div className="list-temperature__fahrenheit">{`${dayItem.tempF}°`}</div>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}

export default ListWeatherDays
