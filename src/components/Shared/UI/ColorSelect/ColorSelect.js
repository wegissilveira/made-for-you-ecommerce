import React from 'react'

import classes from './ColorSelect.module.css'

const ColorSelect = props => {
    
    let opacityArr = Array(props.colors.length).fill('0.4')

    let borderArr = Array(props.colors.length).fill('1px solid black')

    let [opacity, setOpacity] = React.useState(opacityArr)
    let [border, setBorder] = React.useState(borderArr)

    const selectColorHandler = (color, i) => {
        let newBorder = [...border]
        let newOpacity = [...opacity]
        
        newBorder.forEach((color, k) => {
            k === i ? newBorder[k] = '2px solid black' : newBorder[k] = '1px solid black' 
        })

        newOpacity.forEach((color, k) => {
            k === i ? newOpacity[k] = '1.0' : newOpacity[k] = '0.4' 
        })

        setBorder(newBorder)
        setOpacity(newOpacity)
        
        props.selectColorHandlerCallback(color, i)
    }
 

                                
    return (
        <div className={classes.Color_select_container}>
            {
                props.colors.map((color, i) => {
                    return <div key={i} 
                                style={{border: border[i]}}

                                onClick={() => selectColorHandler(color, i)}
                            >
                                <span 
                                    style={{backgroundColor: color, opacity: opacity[i]}}
                                >
                                </span>
                            </div>
                })
            }
        </div>
    )
}

export default ColorSelect