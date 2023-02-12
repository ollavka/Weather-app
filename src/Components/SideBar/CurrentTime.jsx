import React, { useState, useEffect } from 'react'
import Icon from "../Icon.jsx"

const CurrentTime = () => {
    const [currentTime, setCurrentTime] = useState({
        hours: new Date().getHours() <= 9 ? `0${new Date().getHours()}` : new Date().getHours(),
        minutes: new Date().getMinutes() <= 9 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
    })

    useEffect(() => {
        const interval = setInterval(() => {
            const time = {
                hours: new Date().getHours() <= 9 ? `0${new Date().getHours()}` : new Date().getHours(),
                minutes: new Date().getMinutes() <= 9 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
            }

            setCurrentTime(prevTime => prevTime.minutes !== time.minutes ? time : prevTime)
        }, 1000)    

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="weather-info__time info-time">
            <Icon type='symbol'>schedule</Icon>
            <span className="info-time__current-time">{`${currentTime.hours}:${currentTime.minutes}`}</span>
        </div>
    )
}

export default CurrentTime