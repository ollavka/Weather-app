import { useState, useEffect } from "react"

const usePosition = () => {
    const [URL, setURL] = useState(null)
    const [error, setError] = useState(null)

    const onChange = ({ coords }) => {
        if (!error) {  
            setURL(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coords.latitude}&lon=${coords.longitude}&appid=a304ea31da4c714e6dc59fcd19887814`)
        }
    }

    const onError = (error) => {
        setError(error.message)
    }

    useEffect(() => {
        const geo = navigator.geolocation
        
        if (!geo) {
            setError("Geolocation is not supported by the browser")
            return
        }

        const watcher = geo.watchPosition(onChange, onError)
        return () => geo.clearWatch(watcher)
    }, [])

    return [ URL, setURL, error ]
}

export { usePosition }
