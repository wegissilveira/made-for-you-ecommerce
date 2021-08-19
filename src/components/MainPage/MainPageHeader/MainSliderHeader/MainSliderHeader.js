import React from 'react'

import classes from './MainSliderHeader.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'


let mainSlides = [
    {
        img: require('../../../../assets/images/Header/MainSlider/imgSlider1-mainpage.jpg'),
        alt: 'Produto 1',
        linkText: ['LIVING ROOM DECOR COLLECTION', 'Start from $ 199.99'],
        cat: 'living-room/'
    },
    {
        img: require('../../../../assets/images/Header/MainSlider/imgSlider2-mainpage.jpg'),
        alt: 'Produto 2',
        linkText: ['KITCHEN DECORATION', 'Start from $ 50.00'],
        cat: 'kitchen'
    },
    {
        img: require('../../../../assets/images/Header/MainSlider/imgSlider3-mainpage.jpg'),
        alt: 'Produto 3',
        linkText: ['BATHROOM UTILITIES', 'Max price $ 200.99'],
        cat: 'bathroom'
    },
    {
        img: require('../../../../assets/images/Header/MainSlider/imgSlider4-mainpage.jpg'),
        alt: 'Produto 4',
        linkText: ['BEDROOM PIECES', 'Start from $ 40.99'],
        cat: 'bedroom'
    },
]


const MainSliderHeader = props => {

    let [translateValue, setTranslateValue] =  React.useState(0)
    let [clickEnabled, setClickEnabled] = React.useState(true)

    const sliderRef = React.useRef()

    const translateSlider = {
        transform: `translate(${translateValue}%)`
    }
    
    const mainSliderHandler = arg => {
        setClickEnabled(false)

        const sliderEl = sliderRef.current
        
        const flexStyle = window.getComputedStyle(sliderEl)
        const justifyContent = flexStyle.getPropertyValue('justify-content')

        if (arg === 'next') {
            setTranslateValue(-100)

            if (justifyContent === 'flex-end' ) {
                sliderEl.prepend(sliderEl.lastElementChild)
                sliderEl.style.justifyContent = 'flex-start'
            }  
            
        } else {
            
            if (justifyContent === 'flex-start' ) {
                sliderEl.appendChild(sliderEl.firstElementChild)
                sliderEl.style.justifyContent = 'flex-end'
            }

            setTranslateValue(100)
        }

        setTimeout(() => {
            arg === 'next' ? 
                sliderEl.appendChild(sliderEl.firstElementChild)
            : 
                sliderEl.prepend(sliderEl.lastElementChild)

            sliderEl.style.transition = 'none'
            setTranslateValue(0)
            
            if (sliderRef.current) {
                setTimeout(() => {
                    sliderRef.current.style.transition = '0.8s'
                    setClickEnabled(true)
                },30)
            }
            

        }, 800)        
    }
    
    React.useEffect(() => {
        const interval = setTimeout(() => {
            mainSliderHandler('next')
        }, 5000);
        return () => clearTimeout(interval);
    });   
   


    return (
        <div className={classes.MainSlider_container}>                
            <div 
                className={classes.MainSlider_subContainer} 
                style={translateSlider}
                ref={sliderRef}
            >
            
                {mainSlides.map( (img, i) =>
                    <div key={i} className={'image-'+i}>
                        <img 
                            src={img.img} 
                            alt={img.alt} 
                        />
                        <div className={classes.MainSlider_link_container}>
                            <Link to={'/shop/' + img.cat}>
                                <p>{img.linkText[0]}</p>
                                <p>{img.linkText[1]}</p>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div className={classes.Change_slide_arrows}>
                <FontAwesomeIcon 
                    onClick={clickEnabled ? () => mainSliderHandler('previous') : null} 
                    icon="arrow-left" 
                    color={clickEnabled ? '#000' : "#ccc"}
                />
                <FontAwesomeIcon 
                    onClick={clickEnabled ? () => mainSliderHandler('next') : null} 
                    icon="arrow-right" 
                    color={clickEnabled ? '#000' : "#ccc"}
                />
            </div>
        </div>
    )
}

export default MainSliderHeader