import React, { useContext, useEffect } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import WeatherContext from '../WeatherContext'
import Icon from '../Icon'

const WeatherHeader = () => {
    const [themeIsChecked, setThemeIsChecked] = useLocalStorage('theme-checked', false)
    const { unitWeather, setUnitWeather, theme, setTheme } = useContext(WeatherContext)

    const handleChangeTheme = event => {
        setThemeIsChecked(event.target.checked)
    }

    useEffect(() => {
        setTheme(() => themeIsChecked ? 'light' : 'dark')
    }, [themeIsChecked])

    return (
        <header className="main-section__header">
            <h3 className="main-section__title">Weather</h3>
            <ul className="main-section__options">
                <li onClick={() => setUnitWeather('C')} className={`main-section__option${unitWeather === 'C' ? ' active' : ''}`}>
                    <span>°C</span>
                </li>
                <li onClick={() => setUnitWeather('F')} className={`main-section__option${unitWeather === 'F' ? ' active' : ''}`}>
                    <span>°F</span>
                </li>
                <li className="main-section__option">
                    <input onChange={handleChangeTheme} checked={themeIsChecked} type="checkbox" id="switch-theme"/>
                    <label htmlFor="switch-theme">
                        <Icon className='main-section__theme' type='symbol'>{`${theme === 'dark' ? 'light_mode' : 'dark_mode'}`}</Icon>
                    </label>
                </li>
            </ul>
        </header>
    )
}

export default WeatherHeader