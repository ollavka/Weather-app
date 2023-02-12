import React from 'react'

const Icon = ({ children, type, className = '' }) => {

    const MyIcon = () => {
        if (type === 'symbol') {
            return (
                <span className={`${className} material-symbols-outlined`}>
                    {children}
                </span>
            )
        } else {
            let imgSrc = ''

            if (type === '01d') {
                imgSrc = "./icons/sun-img/sun.png"
            } else if (type === '02d') {
                imgSrc = "./icons/sun-img/less-clouds.png"
            } else if (type === '03d' || type === '04d') {
                imgSrc = "./icons/sun-img/more-clouds.png"
            } else if (type === '09d' || type === '10d') {
                imgSrc = "./icons/sun-img/rain.png"
            } else if (type === '11d') {
                imgSrc = "./icons/sun-img/storm.png"
            } else if (type === '13d') {
                imgSrc = "./icons/sun-img/snow.png"
            } else if (type === '50d') {
                imgSrc = "./icons/sun-img/foggy.png"
            } else if (type === '01n') {
                imgSrc = "./icons/moon-img/moon.png"
            } else if (type === '02n') {
                imgSrc = "./icons/moon-img/less-clouds.png"
            } else if (type === '03n' || type === '04n') {
                imgSrc = "./icons/moon-img/more-clouds.png"
            } else if (type === '09n' || type === '10n') {
                imgSrc = "./icons/moon-img/rain.png"
            } else if (type === '11n') {
                imgSrc = "./icons/moon-img/storm.png"
            } else if (type === '13n') {
                imgSrc = "./icons/moon-img/snow.png"
            } else if (type === '50n') {
                imgSrc = "./icons/moon-img/foggy.png"
            } 

            return (
                <div className={className}>
                    <img src={imgSrc} alt="weather" />
                </div>
            )
        }
    }

    return (
        <MyIcon />
    )
}


export default Icon