import React from 'react'
import { Fragment } from 'react'

import classes from './MainPageHeader.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'

import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar'
import MainSliderComponent from './MainSliderComponent/MainSliderComponent'


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

const MainPageHeader = props => {

    let [minorSlideImg, setMinorSlideImg] = React.useState(0)


    const changeSlideHandler = (index) => {
        
        if (typeof index !== 'string') {
            setMinorSlideImg(index)
            
        } else {
            if (minorSlideImg < minorSlides.length - 1) {
                setMinorSlideImg(minorSlideImg + 1)
                
            } else {
                setMinorSlideImg(0)
                
            }
        }    
    }
    
    const changeSlideCallbackHandler = index => {
        changeSlideHandler(index)
    }


    return (
        <Fragment>
            <div className={classes.Header_container}>
                <div className={classes.Header_block_1}>
                    <ProgressBar 
                        bars={minorSlides.length} // => Qtde de barras
                        timer={5000} // => Tempo do loop
                        changeDot={changeSlideCallbackHandler} // => Função que controla a passagem automática de slides
                        auto={true} // => Determina se a passagem de slides e barras será automática
                        direction={'column'} // => Orientação dos pontos, horizontal ou vertical
                        height={150} // => Altura que o bloco de pontos ocupará
                    />
                    <div className={classes.MinorSlider_container}>
                        {minorSlides.map((item, i) => {
                            return (
                                <div 
                                    className={classes.MinorSlider_subContainer} 
                                    style={{
                                        backgroundColor: item.bg, 
                                        display: i === minorSlideImg ? 'block' : 'none'
                                    }}
                                >
                                    <img 
                                        src={item.img}
                                        alt={"img-1"} 
                                    />
                                    <div>
                                        <Link to={'/shop/product/' + item.productId} >
                                            <p>{item.linkText[0]}</p>
                                            <p>{item.linkText[1]}</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={classes.Header_block_2}>
                    <MainSliderComponent />
                    <div className={classes.Icons_container}>
                        <FontAwesomeIcon icon={['fab', 'facebook-f']}/>
                        <FontAwesomeIcon icon={['fab', 'instagram']} />
                        <FontAwesomeIcon icon={['fab', 'vk']} />
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                    </div>
                </div>
                <div className={classes.Header_title}>
                    <p>MADE</p>
                    <p>FOR YOU</p>
                </div>
            </div>
        </Fragment>
    )
}

export default MainPageHeader