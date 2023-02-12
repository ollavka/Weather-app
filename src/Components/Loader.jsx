import React from 'react'

const Loader = ({ className }) => {
    return (
        <div className="weather__loader">
            <span className={`loader${className}`}></span>
        </div>
    )
}

export default Loader