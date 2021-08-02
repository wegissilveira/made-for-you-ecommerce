import React, { Fragment } from 'react'

import classes from './ProductPageModal.module.css'
import './Modal.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';

import ProductInfoComponent from '../ProductPage/ProductInfoComponent/ProductInfoComponent';
import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar'

const customStyles = {
    content : {
        width: '60%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -45%)',
        transition: 'transform 3s ease-in-out 3s',
        overflow: 'hidden',
    }
};


const ProductPageModal = props => {
        
    let [imgSlide, setImgSlide] = React.useState(0)
    let [translateValue, setTranslateValue] = React.useState(0)

    const translateSlider = {
        transform: `translateX(${translateValue}%)`,
        transition: '.8s ease-in-out',
        overflow: 'unset'
    }
    
    const changeSlide = arg => {

        if (arg === 'previous') {
             
            if (imgSlide > 0) {
                setImgSlide(imgSlide - 1)
                setTranslateValue(translateValue + 100)
            } else {
                setImgSlide(props.imgs.length - 1)
                setTranslateValue((props.imgs.length - 1) * -100)
            }
            
        } else if (arg === 'next') {

            if (imgSlide < props.imgs.length - 1) {
                setImgSlide(imgSlide + 1)
                setTranslateValue(translateValue -100)
            } else {
                setImgSlide(0)
                setTranslateValue(0)
            }
            
        } else if (typeof arg === 'number') {
            setImgSlide(arg)
            setTranslateValue(arg * -100)
        }
    }

    if (window.innerWidth <= 768) {
        customStyles.content.paddingTop = '40px'
    }


    return (
        <Fragment>
            <Modal
                isOpen={props.showProduct}
                onRequestClose={() => props.setShowProduct()}
                style={customStyles}
                contentLabel="Product Card"
                ariaHideApp={false}
                closeTimeoutMS={500}
            >
                <div className={classes.Product_page_modal_container}>
                    <p onClick={() => props.setShowProduct()}>
                        <FontAwesomeIcon icon="times" />
                    </p>
                    <div className={classes.Product_modal_slider}>
                        <div 
                            className={classes.Main_img_slider} 
                            style={translateSlider}
                        >
                            {props.product.imgsDemo.map((slide, i) => 
                                <img 
                                    key={i} 
                                    src={slide} 
                                    alt="img-1" 
                                />
                            )}
                        </div>
                        <div className={classes.ProgressBar_container}>
                            <ProgressBar 
                                bars={props.product.imgsDemo.length}
                                auto={true}
                                timer={5000}
                                changeDot={changeSlide}
                            />
                        </div>
                    </div>
                    <ProductInfoComponent 
                        product={props.product}
                        modal={true}
                    />
                </div>            
            </Modal>
        </Fragment>
    )
}

export default ProductPageModal