import React from 'react'
import { Fragment } from 'react'

import './MainPageHeader.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainPageHeader = props => {

    let [slideImg, setSlideImg] = React.useState(0)
    let [minorSlideImg, setMinorSlideImg] = React.useState(0)

    const changeSlide = (arg, obj, img, fn) => {
        if (arg === 'next') {
            img < obj.length - 1 ? fn(img + 1) : fn(0) 
        } else if (arg === 'previous') {
            img > 0 ? fn(img - 1) : fn(obj.length - 1) 
        }
    }    

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

    React.useEffect(() => {
        const interval = setInterval(() => {
            changeSlide('next', mainSlides, slideImg, setSlideImg)
            changeSlide('next', minorSlides, minorSlideImg, setMinorSlideImg)
        }, 5000);
        return () => clearInterval(interval);
    });



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
                        <FontAwesomeIcon onClick={() => changeSlide('previous', mainSlides, slideImg, setSlideImg)} icon="arrow-left" />
                        <FontAwesomeIcon onClick={() => changeSlide('next', mainSlides, slideImg, setSlideImg)} icon="arrow-right" />
                    </div>
                </div>
            </div>
            <div className="header-text">
                <div className="icone-provisorio">
                    <p>*</p>
                    <p>*</p>
                    <p>*</p>
                    <p>*</p>
                </div>
                <div style={{fontSize: '100px', fontWeight: 'bold', lineHeight:'70px'}}>
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