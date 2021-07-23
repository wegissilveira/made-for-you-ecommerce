import React from 'react'

import classes from './BestDeal.module.css'

import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar'

import { Link } from 'react-router-dom'

const BestDeal = props => {

    let [translateValue, setTranslateValue] = React.useState(0)

    const products = props.products.filter(product => product.deal)
    
    const translateSlider = {
        transform: `translateX(${translateValue}%)`
    }

    const changeSlide = arg => {
        if (typeof arg === 'number') {
    
            if (arg === 0) {
                setTranslateValue(0)
            } else if (arg > (translateValue / -100)) {
                setTranslateValue(-arg * 100)
            } else {
                let newTransValue = ((translateValue / -100) - arg) * 100
                setTranslateValue(translateValue + newTransValue)
            }

        } else {
            translateValue / -100 === products.length - 1 ? setTranslateValue(0) : setTranslateValue(translateValue - 100)
        }
    }
    
    const screen_width = window.screen.width
    let circle_diameter 

    if (screen_width >= 1200) {
        circle_diameter = 30
    } else if (screen_width < 1200 && screen_width >= 768) {
        circle_diameter = 40
    } else if (screen_width < 768) {
        circle_diameter = 50
    }

    return (
        <div className={classes.Session_container}>
            <h1>BEST DEAL</h1>
            <div className={classes.Products_container}>
                {
                    products.map((product, i) => {
                            let bestDealElement
                            if (product.deal) {
                                bestDealElement = 
                                    <div    
                                        key={i} 
                                        className={classes.Products_subContainer} 
                                        style={translateSlider}
                                    >
                                        <div>
                                            <Link to={"/shop/product/" + product._id}>
                                                <div className={classes.Deal_image} >
                                                    <img src={product.img} alt="img-deal" />
                                                </div>
                                            </Link>
                                            <div className={classes.Products_description}>
                                                <p>{product.name}</p>
                                                <p>{product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                            }

                            return bestDealElement
                    })
                }
                
            </div>
            <div>
                <ProgressBar 
                    bars={products.length}
                    diameter={circle_diameter}
                    auto={true}
                    timer={5000}
                    changeDot={changeSlide}
                />
            </div>
        </div>
    )
}

export default BestDeal