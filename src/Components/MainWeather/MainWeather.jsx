import React, { useContext } from 'react'
import WeatherContext from '../WeatherContext'
import WeatherHeader from './WeatherHeader'
import ListWeatherDays from './ListWeatherDays'
import WestherSlider from './WestherSlider'

const MainWeather = () => {

    const { weatherData, theme } = useContext(WeatherContext)

    return (
        <section className={`weather__main-section${theme === 'light' ? ' theme-light' : ''}`}>
            <div className="main-section__container">
                <WeatherHeader />
                {
                    weatherData.error ? 
                    <div className="main-section__error">
                        {`ERROR: ${weatherData?.cod !== undefined ? weatherData?.cod : ''} ${weatherData?.description !== undefined ? weatherData?.description : ''}`}
                    </div> :
                    <>
                        <ListWeatherDays />
                        <WestherSlider />
                    </>
                }
            </div>
        </section>
    )
}

export default MainWeather