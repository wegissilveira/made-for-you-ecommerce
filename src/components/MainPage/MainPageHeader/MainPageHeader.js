import React from 'react'
import { Fragment } from 'react'

import './MainPageHeader.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'

import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar';

const MainPageHeader = props => {

    let [slideImg, setSlideImg] = React.useState(0)
    let [minorSlideImg, setMinorSlideImg] = React.useState(0)

    let [translateValue, setTranslateValue] =  React.useState(0)

    let mainSlides = [
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider1-mainpage.png'),
            alt: 'Produto 1',
            linkText: ['LIVING ROOM DECOR COLLECTION', 'Start from $ 199.99'],
            cat: 'living-room/'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider2-mainpage.png'),
            alt: 'Produto 2',
            linkText: ['KITCHEN DECORATION', 'Start from $ 50.00'],
            cat: 'kitchen'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider3-mainpage.png'),
            alt: 'Produto 3',
            linkText: ['BATHROOM UTILITIES', 'Max price $ 200.99'],
            cat: 'bathroom'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider4-mainpage.png'),
            alt: 'Produto 4',
            linkText: ['BEDROOM PIECES', 'Start from $ 40.99'],
            cat: 'bedroom'
        },
    ]

    let minorSlides = [
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo1-mainpage.png'),
            alt: 'Produto 1',
            linkText: ['STERLING VASE GRAY', '$ 19.99'],
            productId: 1
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo2-mainpage.png'),
            alt: 'Produto 2',
            linkText: ['DOG HOUSE', '$ 199.99'],
            productId: 5
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo3-mainpage.png'),
            alt: 'Produto 3',
            linkText: ['RED CHAIR', '$ 499.99'],
            productId: 8
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo4-mainpage.png'),
            alt: 'Produto 4',
            linkText: ['BEAUTIFUL BED', '$ 999.99'],
            productId: 14
        },
    ]
    
    // const translate = `transform: translateX( ${translateValue}px)`
    // const transition = '.4s easeInOut'

    const translateT = {
        transform: `translateX(${translateValue}%)`,
        // transition: '.4s easeInOut'
        width: '100%'
    }
    // Passa os slides baseado nos argumentos
    const changeSlideHandler = (arg, obj, img, fn) => {
        if (arg === 'next') {
            img < obj.length - 1 ? fn(img + 1) : fn(0) 
            setTranslateValue(-100)
        } else if (arg === 'previous') {
            img > 0 ? fn(img - 1) : fn(obj.length - 1)
            setTranslateValue(0) 
        } else if (typeof arg !== isNaN) {
            fn(arg)
        }
    }   

    // Executa a função de passar os slides periodicamente
    React.useEffect(() => {
        const interval = setTimeout(() => {
            changeSlideHandler('next', mainSlides, slideImg, setSlideImg)
            // changeSlide('next', minorSlides, minorSlideImg, setMinorSlideImg)
        }, 2500);
        return () => clearTimeout(interval);
    });

    // É executado pelo componente 'ProgressBar' para que os slides sejam passados em sincronia com as barras
    const changeSlideCallbackHandler = arg => {
        // changeSlide('next', mainSlides, slideImg, setSlideImg)
        // changeSlideHandler(arg, minorSlides, minorSlideImg, setMinorSlideImg)
    }
    


    return (
        <Fragment>
            <div className="container-fluid d-flex">
                <div className="col-6 container-fluid d-flex align-items-center" style={{height:'700px'}}>
                    <div style={{height:'65%', width:'25%'}}></div>
                    <div className="minorSlider-container">
                        <img 
                            src={minorSlides[minorSlideImg].img}
                            alt={"img-1"} 
                        />
                        <div>
                            <Link to={'/shop/product/' + minorSlides[minorSlideImg].productId} >
                                <p className="font-weight-bold">{minorSlides[minorSlideImg].linkText[0]}</p>
                                <p>{minorSlides[minorSlideImg].linkText[1]}</p>
                            </Link>
                        </div>
                    </div>
                    <div style={{height:'65%', width:'40%'}}></div>
                </div>
                <div style={{height:'700px', overflow: 'hidden', padding: '0'}}>
                    
                
                    <div className="mainSlider-container test" style={translateT}>
                    
                        {/* <div> */}
                        {mainSlides.map( img =>
                        <img 
                            style={{width: '100%'}}
                            src={img.img} 
                            alt={img.alt} 
                        />)}
                        {/* <div>
                            <Link to={'/shop/' + img.cat}>
                                <p className="font-weight-bold">{img.linkText[0]}</p>
                                <p>{img.linkText[1]}</p>
                            </Link>
                        </div> */}
                        {/* </div> */}
                        
                    </div>
                    {/* <div className="mainSlider-container test" style={translateT}>
                        <img 
                            src={mainSlides[slideImg].img} 
                            alt={mainSlides[slideImg].alt} 
                        />
                        <div>
                            <Link to={'/shop/' + mainSlides[slideImg].cat}>
                                <p className="font-weight-bold">{mainSlides[slideImg].linkText[0]}</p>
                                <p>{mainSlides[slideImg].linkText[1]}</p>
                            </Link>
                        </div>
                    </div> */}
                    <div className="change-slide-setas d-flex justify-content-between">
                        <FontAwesomeIcon 
                            onClick={() => changeSlideHandler('previous', mainSlides, slideImg, setSlideImg)} 
                            icon="arrow-left" 
                        />
                        <FontAwesomeIcon 
                            onClick={() => changeSlideHandler('next', mainSlides, slideImg, setSlideImg)} 
                            icon="arrow-right" 
                        />
                    </div>
                </div>
                {/* <div className="col-6" style={{height:'700px', overflow: 'hidden', padding: '0', display: 'flex'}}>
                    <div className="mainSlider-container test" style={translateT}>
                        <img 
                            src={mainSlides[slideImg].img} 
                            alt={mainSlides[slideImg].alt} 
                        />
                        <div>
                            <Link to={'/shop/' + mainSlides[slideImg].cat}>
                                <p className="font-weight-bold">{mainSlides[slideImg].linkText[0]}</p>
                                <p>{mainSlides[slideImg].linkText[1]}</p>
                            </Link>
                        </div>
                    </div>
                    <div className="change-slide-setas d-flex justify-content-between">
                        <FontAwesomeIcon 
                            onClick={() => changeSlideHandler('previous', mainSlides, slideImg, setSlideImg)} 
                            icon="arrow-left" 
                        />
                        <FontAwesomeIcon 
                            onClick={() => changeSlideHandler('next', mainSlides, slideImg, setSlideImg)} 
                            icon="arrow-right" 
                        />
                    </div>
                </div> */}
            </div>
            <div className="header-text row">
                {/* <div> */}
                    <ProgressBar 
                        bars={minorSlides.length} // => Qtde de barras
                        timer={5000} // => Tempo do loop
                        change={changeSlideCallbackHandler} // => Função que controla a passagem automática de slides
                        auto={true} // => Determina se a passagem de slides e barras será automática
                        direction={'column'} // => Orientação dos pontos, horizontal ou vertical
                        height={150} // => Altura que o bloco de pontos ocupará
                    />
                {/* </div> */}
                <div className="header-title col-4">
                    <p>MADE</p>
                    <p>FOR YOU</p>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} className="icones"/>
                    <FontAwesomeIcon icon={['fab', 'instagram']} className="icones" />
                    <FontAwesomeIcon icon={['fab', 'vk']} className="icones" />
                    <FontAwesomeIcon icon={['fab', 'twitter']} className="icones" />
                </div>
            </div>
        </Fragment>
    )
}

export default MainPageHeader