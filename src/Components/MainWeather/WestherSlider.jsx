import React, { useContext } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import WeatherContext from "../WeatherContext"
import Icon from "../Icon"

import "swiper/css"
import "swiper/css/navigation"

const WestherSlider = () => {
    const { weatherData, activeDay, setActiveTimeDay, setWeatherSwiper } = useContext(WeatherContext)

    const { list } = weatherData
    const currentWeatherInfo = list[activeDay]

    return (
        <div className="main-section__highlights highlights">
            <h3 className="highlights__title">Today's Highlights</h3>
            <div className="highlights__container">
                <Swiper
                    className="highlights__swiper"
                    modules={[Navigation]}
                    navigation
                    spaceBetween={70}
                    slidesPerView={1}
                    speed={750}
                    onSwiper={(swiper) => setWeatherSwiper(swiper)}
                    onSlideChange={(swiper) => setActiveTimeDay(swiper.activeIndex)}
                >
                    { currentWeatherInfo.map((weatherSlide) => {
                        return (
                            <SwiperSlide key={weatherSlide.id}>
                                <div className="highlights__time">
                                    {weatherSlide.date.time}
                                </div>
                                <div className="highlights__list highlights-list">
                                    <div className="highlights-list__item">
                                        <span className="highlights-list__title">
                                            Humidity
                                        </span>
                                        <span className="highlights-list__data">
                                            {weatherSlide.weather.humidity}<sup>%</sup>
                                        </span>
                                        <div className="highlights-list__icon highlights-list__icon-humidity">
                                            <Icon type="symbol">
                                                humidity_percentage
                                            </Icon>
                                        </div>
                                    </div>
                                    <div className="highlights-list__item">
                                        <span className="highlights-list__title">
                                            Wind speed
                                        </span>
                                        <span className="highlights-list__data">
                                            {weatherSlide.weather.windSpeed}<sup>m/s</sup>
                                        </span>
                                        <div className="highlights-list__icon highlights-list__icon-wind">
                                            <Icon type="symbol">air</Icon>
                                        </div>
                                    </div>
                                    <div className="highlights-list__item highlights-list__item-sun">
                                        <span className="highlights-list__title">
                                            Surise & Sunset
                                        </span>
                                        <div className="highlights-list__data highlights-list__data-sunrise">
                                            <Icon
                                                type="symbol"
                                                className="highlights-list__icon"
                                            >
                                                sunny
                                            </Icon>
                                            <span className="highlights-list__time">
                                                {`${weatherSlide.weather.sunrise.hours}:${weatherSlide.weather.sunrise.minutes}`}
                                            </span>
                                        </div>
                                        <div className="highlights-list__data highlights-list__data-sunset">
                                            <Icon
                                                type="symbol"
                                                className="highlights-list__icon"
                                            >
                                                sleep
                                            </Icon>
                                            <span className="highlights-list__time">
                                            {`${weatherSlide.weather.sunset.hours}:${weatherSlide.weather.sunset.minutes}`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="highlights-list__item">
                                        <span className="highlights-list__title">
                                            Pressure
                                        </span>
                                        <span className="highlights-list__data">
                                            {weatherSlide.weather.pressure}<sup>hPa</sup>
                                        </span>
                                        <div className="highlights-list__icon highlights-list__icon-pressure">
                                            <Icon type="symbol">compress</Icon>
                                        </div>
                                    </div>
                                    <div className="highlights-list__item">
                                        <span className="highlights-list__title">
                                            Сloudiness
                                        </span>
                                        <span className="highlights-list__data">
                                            {weatherSlide.weather.cloudiness}<sup>%</sup>
                                        </span>
                                        <div className="highlights-list__icon highlights-list__icon-cloudiness">
                                            <Icon type="symbol">
                                                filter_drama
                                            </Icon>
                                        </div>
                                    </div>
                                    <div className="highlights-list__item">
                                        <span className="highlights-list__title">
                                            Probability of precipitation
                                        </span>
                                        <span className="highlights-list__data">
                                            {weatherSlide.weather.pop}<sup>%</sup>
                                        </span>
                                        <div className="highlights-list__icon highlights-list__icon-pop">
                                            <Icon type="symbol">water_do</Icon>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}

export default WestherSlider
