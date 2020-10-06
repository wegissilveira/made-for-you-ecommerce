import React, { Fragment } from 'react'

import './ProductCardModal.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';

import ProductsQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'
import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar'
import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect';

const customStyles = {
    content : {
        width: '60%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden'
    }
};


const ProductCardModal = props => {
        
    let [imgSlide, setImgSlide] = React.useState(0)
    let [productColor, setProductColor] = React.useState('')

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
            
        }else if (typeof arg === 'number') {
            setImgSlide(arg)
            setTranslateValue(arg * -100)
        }

        // if (arg === 'previous') {
        //     imgSlide > 0 ? setImgSlide(imgSlide - 1) : setImgSlide(props.imgs.length - 1)
        // } else if (arg === 'next') {
        //     imgSlide < props.imgs.length - 1 ? setImgSlide(imgSlide + 1) : setImgSlide(0)
        // } else if (typeof arg === 'number') {
        //     setImgSlide(arg)
        // }
    }

    // Aqui esta função que seleciona as cores não passará o slide, já que o slide é automático.
    // Simplesmente armazenará as informações sobre o produto destinado ao DB.
    const selectColorHandler = (color, i) => {
        setProductColor(color)
    }
    

    return (
        <Fragment>
            <Modal
                isOpen={props.showProduct}
                onRequestClose={() => props.setShowProduct(false)}
                style={customStyles}
                contentLabel="Product Card"
                ariaHideApp={false}
            >

                <div className="container-fluid d-flex">
                    <p className="product-card-modal-exit" onClick={() => props.setShowProduct(false)}>
                        <FontAwesomeIcon icon="times" />
                    </p>
                    <div className="col-6 pl-0 pr-0 mr-4" style={{overflow: 'hidden'}}>
                        <div className="main-img-slider d-flex" style={translateSlider}>
                            {/* <img src={props.product.imgsDemo[imgSlide]} alt="img-1" /> */}
                            {props.product.imgsDemo.map((slide, i) => 
                                <img key={i} src={slide} alt="img-1" />
                            )}
                        </div>
                        <div className="d-flex row justify-content-between mt-4 ml-1">
                            <ProgressBar 
                                bars={props.product.imgsDemo.length}
                                auto={true}
                                timer={5000}
                                change={changeSlide}
                                // slide={imgSlide}
                            />
                            {/* Não consegui sincronizar as setas com as barras (também não insisti), por isso vou deixar isso suspenso por enquanto e talvez volte depois, já que gastei muito tempo com isso. */}
                            {/* <div className="d-flex justify-content-between col-2">
                                <FontAwesomeIcon onClick={() => changeSlide('previous')} icon="arrow-left" />
                                <FontAwesomeIcon onClick={() => changeSlide('next')} icon="arrow-right" />
                            </div> */}
                        </div>
                    </div>
                    <div className="col-6">
                        {/* <div className="d-flex justify-content-between">
                            <p>123456</p>
                            <p>exemplo</p>
                        </div> */}
                        <h1 className="mt-1">{props.product.name}</h1>
                        <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
                        <div className="product-price-container-modal d-flex justify-content-between mt-4">
                            <h3 className="mb-0">$ {props.product.price}</h3>
                            <div className="product-price-availability d-flex justify-content-between align-items-center text-success">
                                <FontAwesomeIcon icon="check" />
                                <p>Available</p>
                            </div>
                        </div>
                        <div className="product-details-container-modal d-flex justify-content-between row mt-4">
                            <div className="col-6">
                                <p>Size</p>
                                <select className="
                                        product-details-select 
                                        mt-2 
                                        border-left-0 
                                        border-right-0
                                        border-top-0
                                        border-bottom
                                    "
                                >
                                    <option>100x100 cm</option>
                                    <option>200x200 cm</option>
                                    <option>300x300 cm</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <p>Color</p>
                                <ColorSelect
                                    colors={props.product.colors}
                                    selectColorHandlerCallback={(color, i) => selectColorHandler(color, i)}
                                />
                            </div>
                        </div>
                        <div className="product-qtde-container-modal d-flex justify-content-between align-items-center mt-4">
                            <ProductsQtde />
                            <button type="button" className="btn btn-dark">ADD TO BAG</button>   
                            <FontAwesomeIcon icon={["far", "heart"]} size="2x" />
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-end mt-1">
                            <div className="product-category-container mt-3">
                                <p>Category: <span className="font-weight-bold">{props.product.category}</span></p>
                                <p>Tags: <span className="font-weight-bold">{props.product.tag}</span></p>
                            </div>
                            <div className="d-flex justify-content-end align-items-center">
                                <FontAwesomeIcon icon="share-alt" className="mr-4" />
                                <p style={{margin: '0'}}>Share</p>
                            </div>
                        </div>
                    </div>
                </div>            
            </Modal>
        </Fragment>
    )
}

export default ProductCardModal