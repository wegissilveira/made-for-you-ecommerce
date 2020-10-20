import React, { Fragment } from 'react'

import classes from './ProductCardModal.module.css'
import './Modal.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';

import ProductsQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'
import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar'
import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect';
import wishlist from '../../../Data/wishlistData'


const customStyles = {
    content : {
        width: '60%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 3s ease-in-out 3s',
        overflow: 'hidden'
    }
};


const ProductCardModal = props => {
        
    let [imgSlide, setImgSlide] = React.useState(0)
    let [productColor, setProductColor] = React.useState('')
    let [wishlistState, setWishlist] = React.useState([])

    React.useEffect(() => {
        setWishlist(props.wishlist)
    }, [props.wishlist])

    let [qtde, setQtde] = React.useState(1) 

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

    // Aqui esta função que seleciona as cores não passará o slide, já que o slide é automático.
    // Simplesmente armazenará as informações sobre o produto destinado ao DB.
    const selectColorHandler = (color, i) => {
        setProductColor(color)
    }
    
    const setQtdeHandler = value => {
        setQtde(value)
    }

    const wishlistHandler = id => {

        let list = [...wishlistState]
        if (list.includes(id)) {
            list = wishlistState.filter(item => item !== id)
        } else {
            list.push(id)
        }
        
        setWishlist(list)

        localStorage.setItem('wishlist', JSON.stringify(list))
    }



    

    return (
        <Fragment>
            <Modal
                isOpen={props.showProduct}
                onRequestClose={() => props.setShowProduct(false)}
                style={customStyles}
                contentLabel="Product Card"
                ariaHideApp={false}
                closeTimeoutMS={500}
            >

                <div className="container-fluid d-flex" style={{paddingRight: '35px'}}>
                    <p className={classes.Product_card_modal_exit} onClick={() => props.setShowProduct(wishlistState)}>
                    {/* <p className={classes.Product_card_modal_exit} onClick={() => showProductHandlerCallback()}> */}
                        <FontAwesomeIcon icon="times" />
                    </p>
                    <div className="col-6 pl-0 pr-0 mr-4" style={{overflow: 'hidden'}}>
                        <div className={classes.Main_img_slider} style={translateSlider}>
                            {props.product.imgsDemo.map((slide, i) => 
                                <img 
                                    key={i} 
                                    src={slide} 
                                    alt="img-1" 
                                />
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
                        </div>
                    </div>
                    <div className="col-6">
                        <h1 className="mt-1">{props.product.name}</h1>
                        <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
                        <div className={`mt-4 ${classes.Product_details_container_modal}`}>
                            <h3 className="mb-0">$ {props.product.price}</h3>
                            <div className={`text-success ${classes.Product_price_availability}`}>
                                <FontAwesomeIcon icon="check" />
                                <p>Available</p>
                            </div>
                        </div>
                        <div className={`row mt-4 ${classes.Product_details_container_modal}`}>
                            <div className="col-6">
                                <p>Size</p>
                                <select className={`mt-2 border-bottom ${classes.Product_details_select}`}>
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
                        <div className={`mt-4 ${classes.Product_qtde_container_modal}`}>
                            <ProductsQtde changeQtdeCallBack={qtde => setQtdeHandler(qtde)} />
                            <button type="button" className="btn btn-dark">ADD TO BAG</button>   
                            {   wishlistState.includes(props.product._id) ?
                                    <FontAwesomeIcon 
                                        onClick={() => wishlistHandler(props.product._id)} 
                                        className={classes.Wishlist_icon_alt} 
                                        icon={['fas', 'heart']} size="2x" 
                                    />
                                :
                                    <FontAwesomeIcon 
                                        onClick={() => wishlistHandler(props.product._id)} 
                                        className={classes.Wishlist_icon_alt} 
                                        icon={['far', 'heart']} size="2x" 
                                    />
                            }
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-end mt-1">
                            <div className={`mt-3 ${classes.Product_category_container}`}>
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