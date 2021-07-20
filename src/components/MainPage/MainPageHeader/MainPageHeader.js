import React from 'react'
import { Fragment } from 'react'

import classes from './MainPageHeader.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'

import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar'

const MainPageHeader = props => {

    let [slideImg, setSlideImg] = React.useState(0)
    let [minorSlideImg, setMinorSlideImg] = React.useState(0)

    let [translateValue, setTranslateValue] =  React.useState(0)

    let mainSlides = [
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider1-mainpage.jpg'),
            alt: 'Produto 1',
            linkText: ['LIVING ROOM DECOR COLLECTION', 'Start from $ 199.99'],
            cat: 'living-room/'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider2-mainpage.jpg'),
            alt: 'Produto 2',
            linkText: ['KITCHEN DECORATION', 'Start from $ 50.00'],
            cat: 'kitchen'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider3-mainpage.jpg'),
            alt: 'Produto 3',
            linkText: ['BATHROOM UTILITIES', 'Max price $ 200.99'],
            cat: 'bathroom'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider4-mainpage.jpg'),
            alt: 'Produto 4',
            linkText: ['BEDROOM PIECES', 'Start from $ 40.99'],
            cat: 'bedroom'
        },
    ]

    let minorSlides = [
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo1-mainpage.png'),
            alt: 'Produto 1',
            linkText: ['PRODUTO 5', '$ 19.99'],
            productId: 5,
            bg: 'rgb(151, 105, 105)'
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo2-mainpage.png'),
            alt: 'Produto 2',
            linkText: ['PRODUTO 13', '$ 199.99'],
            productId: 13,
            bg: '#fad3e0'
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo3-mainpage.png'),
            alt: 'Produto 3',
            linkText: ['PRODUTO 10', '$ 499.99'],
            productId: 10,
            bg: '#ccc'
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo4-mainpage.png'),
            alt: 'Produto 4',
            linkText: ['PRODUTO 11', '$ 999.99'],
            productId: 11,
            bg: 'rgb(238, 225, 183)'
        },
    ]
    

    const translateSlider = {
        transform: `translateX(${translateValue}%)`
    }

    const changeSlideHandler = (arg, obj, img, fn, slide) => {
        if (arg === 'next') {
            
            if (img < obj.length - 1) {
                fn(img + 1)
                if (slide === 'main') setTranslateValue(translateValue - 100)
            } else {
                fn(0)
                if (slide === 'main') setTranslateValue(0)
            }
            
        } else if (arg === 'previous') {

            if (img > 0) {
                fn(img - 1)
                if (slide === 'main') setTranslateValue(translateValue + 100)
            } else {
                fn(obj.length - 1)
                if (slide === 'main') setTranslateValue((obj.length - 1) * -100)
            }
            
        } else if (typeof arg !== isNaN) {
            fn(arg)
        }
    }   
    
    React.useEffect(() => {
        const interval = setTimeout(() => {
            changeSlideHandler('next', mainSlides, slideImg, setSlideImg, 'main')
        }, 5000);
        return () => clearTimeout(interval);
    });

    const changeSlideCallbackHandler = arg => {
        changeSlideHandler(arg, minorSlides, minorSlideImg, setMinorSlideImg)
    }
    


    return (
        <Fragment>
            <div className={classes.Header_container}>
                <div className={classes.MinorSlider_container}>
                    <div></div>
                    <div 
                        className={classes.MinorSlider_subContainer} 
                        style={{backgroundColor: minorSlides[minorSlideImg].bg}}
                    >
                        <img 
                            src={minorSlides[minorSlideImg].img}
                            alt={"img-1"} 
                        />
                        <div>
                            <Link to={'/shop/product/' + minorSlides[minorSlideImg].productId} >
                                <p>{minorSlides[minorSlideImg].linkText[0]}</p>
                                <p>{minorSlides[minorSlideImg].linkText[1]}</p>
                            </Link>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div  className={classes.MainSlider_container}>                
                    <div className={classes.MainSlider_subContainer} style={translateSlider}>
                    
                        {mainSlides.map( (img, i) =>
                            <div key={i}>
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
                            onClick={() => changeSlideHandler('previous', mainSlides, slideImg, setSlideImg, 'main')} 
                            icon="arrow-left" 
                        />
                        <FontAwesomeIcon 
                            onClick={() => changeSlideHandler('next', mainSlides, slideImg, setSlideImg, 'main')} 
                            icon="arrow-right" 
                        />
                    </div>
                </div>
            </div>
            <div className={classes.Header_text}>
                <ProgressBar 
                    bars={minorSlides.length} // => Qtde de barras
                    timer={5000} // => Tempo do loop
                    change={changeSlideCallbackHandler} // => Função que controla a passagem automática de slides
                    auto={true} // => Determina se a passagem de slides e barras será automática
                    direction={'column'} // => Orientação dos pontos, horizontal ou vertical
                    height={150} // => Altura que o bloco de pontos ocupará
                />
                <div className={classes.Header_title}>
                    <p>MADE</p>
                    <p>FOR YOU</p>
                </div>
                <div className={classes.Icons_container}>
                    <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                    <FontAwesomeIcon icon={['fab', 'vk']} />
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                </div>
            </div>
        </Fragment>
    )
}

export default MainPageHeader