import { useState, useEffect } from "react"

const usePosition = () => {
    const [URL, setURL] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { coords: { latitude, longitude } } = position
                setURL(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid=a304ea31da4c714e6dc59fcd19887814`)
            },  
            (error) => {
                setError(error.message)
            }
        )
    }, [])  

    return [ URL, setURL, error ]
}

export { usePosition }
