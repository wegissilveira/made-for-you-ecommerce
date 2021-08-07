import React from 'react'

import classes from './Toastify.module.css'

const Toastify = props => {

    let translateX = -110

    if (props.open === true) {
        translateX = 0
    } else {
        translateX = -110
    }

    const header = props.toastifyDetails[0]
    const msg = props.toastifyDetails[1]


    return (
        <div 
            style={{
                transform: `translateX(${translateX}%)`
            }} 
            className={classes.Toastify_container}
        >
            <h3>{header}</h3>
            <p>{msg}</p>
        </div>
    )
}

export default Toastify