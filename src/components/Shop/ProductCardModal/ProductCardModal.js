import React, { Fragment } from 'react'

import classes from './ProductCardModal.module.css'
import './Modal.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal';
import { connect } from 'react-redux'

import ProductsQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'
import ProgressBar from '../../Shared/UI/ProgressBar/ProgressBar'
import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect';
import * as actionTypes from '../../../store/actions/actionTypes'

import wishlistDataFn from '../../../Data/wishlistData'
import cartListDataFn from '../../../Data/cartData'


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

    let [isProductInBag, setProdExists] = React.useState(0)

    let bag_button_color = isProductInBag === 0 ? classes.Bag_button_green : classes.Bag_button_red
    let bag_button_text = isProductInBag === 0 ? 'ADD TO BAG' : 'REMOVE FROM BAG'

    let heart_Icon = props.wish.includes(props.product._id) ? 'fas' : 'far'

    React.useEffect(() => {
        let productCartArr = [...props.cart]
        
        let count = 0
        productCartArr.forEach(item => {
            if (item._id === props.product._id) count++
        })
        
        setProdExists(count)

    }, [props.cart, props.product._id])

    let [qtde, setQtde] = React.useState(1) 
    let [size, setSize] = React.useState('100x100') 

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

        let list = [...props.wish]
        if (list.includes(id)) {
            list = list.filter(item => item !== id)
        } else {
            list.push(id)
        }

        localStorage.setItem('wishlist', JSON.stringify(list))

        props.onWishlistState()
    }
       
    const addProductToBagHandler = () => {
        
        let productCartArr = [...props.cart]

        let count = 0
        productCartArr.forEach(item => {
            if (item._id === props.product._id) count++
        })

        if (count === 0) {
            let productCart = {}

            productCart._id = props.product._id
            productCart.qtde = qtde
            productCart.color = productColor
            productCart.size = size
    
            productCartArr.push(productCart)
            setProdExists(1)

        } else {
            productCartArr = productCartArr.filter(item => item._id !== props.product._id)
            setProdExists(0)
        }

        localStorage.setItem('cartList', JSON.stringify(productCartArr))

        props.onCartListState()
    }



    

    return (
        <Fragment>
            <Modal
                isOpen={!props.showProduct}
                onRequestClose={() => props.setShowProduct()}
                style={customStyles}
                contentLabel="Product Card"
                ariaHideApp={false}
                closeTimeoutMS={500}
            >

                <div className={classes.Product_card_modal_container}>
                    <p onClick={() => props.setShowProduct()}>
                        <FontAwesomeIcon icon="times" />
                    </p>
                    <div>
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
                                change={changeSlide}
                                // slide={imgSlide}
                            />
                        </div>
                    </div>
                    <div>
                        <h1>{props.product.name}</h1>
                        <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
                        <div>
                            <h3>$ {props.product.price}</h3>
                            <div className={classes.Product_price_availability}>
                                <FontAwesomeIcon icon="check" />
                                <p>Available</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Size</p>
                                <select 
                                    onChange={e => setSize(e.target.value)}
                                    className={classes.Product_details_select}
                                >
                                    <option value="100x100">100x100 cm</option>
                                    <option value="200x200">200x200 cm</option>
                                    <option value="300x300">300x300 cm</option>
                                </select>
                            </div>
                            <div>
                                <p>Color</p>
                                <ColorSelect
                                    colors={props.product.colors}
                                    selectColorHandlerCallback={(color, i) => selectColorHandler(color, i)}
                                />
                            </div>
                        </div>
                        <div>
                            <ProductsQtde changeQtdeCallBack={qtde => setQtdeHandler(qtde)} /> 

                            <button 
                                onClick={() => addProductToBagHandler()}
                                type="button" 
                                className={bag_button_color}
                            > {bag_button_text}
                            </button> 

                            <FontAwesomeIcon 
                                onClick={() => wishlistHandler(props.product._id)} 
                                icon={[heart_Icon, 'heart']} size="2x" 
                            />
                        </div>
                        
                        <div>
                            <div>
                                <p>Category: <span>{props.product.category}</span></p>
                                <p>Tags: <span>{props.product.tag}</span></p>
                            </div>
                            <div>
                                <FontAwesomeIcon icon="share-alt"/>
                                <p style={{margin: '0'}}>Share</p>
                            </div>
                        </div>
                    </div>
                </div>            
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        wish: state.wishlistState,
        cart: state.cartListState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onWishlistState: () => dispatch({type: actionTypes.WISHLIST, value: wishlistDataFn()}),
        onCartListState: () => dispatch({type: actionTypes.CARTLIST, value: cartListDataFn()})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCardModal)