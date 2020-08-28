import React from 'react'
import { Fragment } from 'react'

import './MainPageHeader.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProgressBar from '../../UI/ProgressBar/ProgressBar';

const MainPageHeader = props => {

    let [slideImg, setSlideImg] = React.useState(0)
    let [minorSlideImg, setMinorSlideImg] = React.useState(0)

    let mainSlides = [
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider1-mainpage.png'),
            alt: 'Produto 1'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider2-mainpage.png'),
            alt: 'Produto 2'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider3-mainpage.png'),
            alt: 'Produto 3'
        },
        {
            img: require('../../../assets/images/Header/MainSlider/imgSlider4-mainpage.png'),
            alt: 'Produto 4'
        },
    ]

    let minorSlides = [
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo1-mainpage.png'),
            alt: 'Produto 1'
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo2-mainpage.png'),
            alt: 'Produto 2'
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo3-mainpage.png'),
            alt: 'Produto 3'
        },
        {
            img: require('../../../assets/images/Header/MinorSlider/imgSolo4-mainpage.png'),
            alt: 'Produto 4'
        },
    ]
    
    // Passa os slides baseado nos argumentos
    const changeSlideHandler = (arg, obj, img, fn) => {
        if (arg === 'next') {
            img < obj.length - 1 ? fn(img + 1) : fn(0) 
        } else if (arg === 'previous') {
            img > 0 ? fn(img - 1) : fn(obj.length - 1) 
        } else if (typeof arg !== isNaN) {
            fn(arg)
        }
    }   

    // Executa a função de passar os slides periodicamente
    React.useEffect(() => {
        const interval = setTimeout(() => {
            changeSlideHandler('next', mainSlides, slideImg, setSlideImg)
            // changeSlide('next', minorSlides, minorSlideImg, setMinorSlideImg)
        }, 5000);
        return () => clearTimeout(interval);
    });

    // É executado pelo componente 'ProgressBar' para que os slides sejam passados em sincronia com as barras
    const changeSlideCallbackHandler = arg => {
        // changeSlide('next', mainSlides, slideImg, setSlideImg)
        changeSlideHandler(arg, minorSlides, minorSlideImg, setMinorSlideImg)
    }



    return (
        <Fragment>
            <div className="container-fluid d-flex">
                <div className="col-6 container-fluid d-flex align-items-center" style={{height:'700px'}}>
                    <div style={{height:'65%', width:'25%'}}></div>
                    <img style={{height:'65%', width:'50%'}} src={minorSlides[minorSlideImg].img} alt={"img-1"} />
                    <div style={{height:'65%', width:'40%'}}></div>
                </div>
                <div className="col-6" style={{height:'700px'}}>
                    <img style={{height:'90%', maxWidth:'100%'}} src={mainSlides[slideImg].img} alt={mainSlides[slideImg].alt} />
                    <div className="change-slide-setas d-flex justify-content-between">
                        <FontAwesomeIcon onClick={() => changeSlideHandler('previous', mainSlides, slideImg, setSlideImg)} icon="arrow-left" />
                        <FontAwesomeIcon onClick={() => changeSlideHandler('next', mainSlides, slideImg, setSlideImg)} icon="arrow-right" />
                    </div>
                </div>
            </div>
            <div className="header-text row">
                {/* <div> */}
                    <ProgressBar 
                        bars={4} // => Qtde de barras
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