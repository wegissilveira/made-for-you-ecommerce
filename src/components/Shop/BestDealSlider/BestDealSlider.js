import React from 'react'

import classes from './BestDealSlider.module.css'

import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar'

import { Link } from 'react-router-dom'

const BestDealSlider = props => {

    let [translateValue, setTranslateValue] = React.useState(0)

    const products = props.products.filter(product => product.deal)
    
    const translateSlider = {
        transform: `translateX(${translateValue}%)`
    }

    const bestDealRef = React.useRef()

    const screen_width = window.screen.width
    let circle_diameter 

    if (screen_width <= 360) {
        circle_diameter = 30
    } else if (screen_width <= 480) {
        circle_diameter = 40
    } else if (screen_width <= 768) {
        circle_diameter = 50
    } else if (screen_width <= 1200) {
        circle_diameter = 40
    } else if (screen_width > 1200) {
        circle_diameter = 30
    } 
    
    const changeSlide = arg => {

        const bestDealEl = bestDealRef.current
        let newTransValue = (bestDealEl.children[0].offsetWidth / bestDealEl.offsetWidth) * 100
        setTranslateValue(-newTransValue)

        setTimeout(() => {
            bestDealEl.appendChild(bestDealEl.firstElementChild)

            bestDealEl.style.transition = 'none'
            setTranslateValue(0)            
        }, 2000)
    }

    React.useEffect(() => {
        if (bestDealRef.current) {
            setTimeout(() => {
                bestDealRef.current.style.transition = '2s'
            },30)
        }
    }, [translateValue]);   



    return (
        <div className={classes.Session_container}>
            <h1>BEST DEAL</h1>
            <div 
                className={classes.Products_container} 
                ref={bestDealRef} 
                style={translateSlider}
            >
                {
                    products.map((product, i) => {
                        let bestDealElement
                        if (product.deal) {
                            bestDealElement = 
                                <div    
                                    key={i} 
                                    className={classes.Products_subContainer} 
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
                    timer={2500}
                    changeDot={changeSlide}
                    clickable={false}
                />
            </div>
        </div>
    )
}

export default BestDealSlider