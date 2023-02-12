import { useState, useEffect } from 'react'

const useLocalStorage = (key, initalValue) => {
    const getValue = () => {
        const storage = localStorage.getItem(key)

        if (storage) {
            return JSON.parse(storage)
        }

        return initalValue
    }
    
    const [value, setValue] = useState(getValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

export { useLocalStorage }