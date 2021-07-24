import React, { Fragment } from 'react'

import classes from './ProductPage.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

import productsData from '../../../Data/productsData'
import cartListDataFn from '../../../Data/cartData.js'
import wishlistDataFn from '../../../Data/wishlistData'

import ProductsQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'
import ProductQtdeMobile from '../../Shared/UI/ProductQtdeMobile/ProductQtdeMobile'
import ColorSelect from '../../Shared/UI/ColorSelect/ColorSelect'
import ProductSlider from './ProductSlider/ProductSlider'
import * as actionTypes from '../../../store/actions/actionTypes'

  

const ProductPage = props => {

    const product = productsData.find(product => product._id === props.match.params.id)

    let [isProductInBag, setProdExists] = React.useState(() => {
        let productCartArr = [...props.cart]
        let prod = 0

        productCartArr.map(item => 
            item._id === product._id ? prod++ : null
        )

        return prod

    })

    const bag_button_color = isProductInBag === 0 ? classes.Bag_button_green : classes.Bag_button_red
    const bag_button_text = isProductInBag === 0 ? 'ADD TO BAG' : 'REMOVE FROM BAG'

    let heart_Icon = props.wish.includes(product._id) ? 'fas' : 'far'    
    
    let [imgSlide, setImgSlide] = React.useState(0)
    let [productColor, setProductColor] = React.useState('') // => Armazena cor selecionada do produto

    let [qtde, setQtde] = React.useState(1)
    let [size, setSize] = React.useState('100x100')

    const selectColorHandler = (color, i) => {
        setProductColor(color)
        setImgSlide(i)
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
    
    const productCartHandler = () => {
        
        let productCartArr = [...props.cart]

        let count = 0
        productCartArr.forEach(item => {
            if (item._id === product._id) count++
        })

        if (count === 0) {
            let productCart = {}

            productCart._id = product._id
            productCart.qtde = qtde
            productCart.color = productColor
            productCart.size = size
    
            productCartArr.push(productCart)
            setProdExists(1)

        } else {
            productCartArr = productCartArr.filter(item => item._id !== product._id)
            setProdExists(0)
        }

        localStorage.setItem('cartList', JSON.stringify(productCartArr))

        props.onCartListState()
    } 

    const toggleQtdeSelectMobileHandler = (qtde) => {
        const select = document.getElementById('product_qtde')

        if (select.style.display === 'flex') {
            select.style.display = 'none'
        } else {
            select.style.display = 'flex'
        }

        Array.from(select.children[0].children).forEach(item => {

            if (Number(item.children[1].value) === qtde) {
                item.children[1].checked = true
            }
        })
    }
    



    return (
        
        <Fragment>
            <div className={classes.Session_container}>
                <div className={classes.Product_page_container}>
                    <h1>{product.name}</h1>
                    <ProductSlider product={product} />
                    <div>
                        <div>
                            <p>123456</p>
                            <p>exemplo</p>
                        </div>
                        <h1>{product.name}</h1>
                        <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
                        <div className={classes.Product_price_container}>
                            <h3>$ {product.price}</h3>
                            <div>
                                <FontAwesomeIcon icon="check" />
                                <p>Available</p>
                            </div>
                        </div>
                        <div className={classes.Product_details_container}>
                            <div>
                                <p>Size</p>
                                <select onChange={e => setSize(e.target.value)}>
                                    <option value="100x100">100x100 cm</option>
                                    <option value="200x200">200x200 cm</option>
                                    <option value="300x300">300x300 cm</option>
                                </select>
                            </div>
                            <div>
                                <p>Color</p>
                                <ColorSelect 
                                    colors={product.colors}
                                    selectColorHandlerCallback={(color, i) => selectColorHandler(color, i)}
                                />
                            </div>
                        </div>
                        <div className={classes.Product_wishlist_container}>
                            <ProductsQtde 
                                changeQtdeCallBack={qtde => setQtdeHandler(qtde)}  
                                max={8}
                            />
                            <div
                                onClick={() => toggleQtdeSelectMobileHandler()}
                            >
                                <p>{qtde}</p>
                                <FontAwesomeIcon icon="chevron-down" size="xs"/>
                            </div>
                                                    
                            <button 
                                onClick={() => productCartHandler()}
                                type="button" 
                                className={bag_button_color}
                            > {bag_button_text}
                            </button> 

                            <FontAwesomeIcon 
                                onClick={() => wishlistHandler(product._id)} 
                                className={classes.Wishlist_icon_alt}
                                icon={[heart_Icon, 'heart']} size="2x" 
                            />

                            <div 
                                id="product_qtde"
                                className={classes.Cart_qtde_mobile}
                            >
                                <ProductQtdeMobile
                                    changeQtdeCallBack={qtde => setQtde(qtde)} 
                                    // productIndex={}
                                    initialValue={true}
                                    toggle={() =>toggleQtdeSelectMobileHandler()}
                                />
                            </div>
                        </div>
                        <div className={classes.Product_category_container}>
                            <p>Category: <span>{product.category}</span></p>
                            <p>Tags: <span>{product.tag}</span></p>
                        </div>
                        <div className={classes.Product_specifications_container}>
                            <div>
                                <div>
                                    <h6>DETAILS</h6>
                                    <h6>SPECIFICATIONS</h6>
                                </div>
                                <div>
                                    <div>
                                        <p>Material:</p>
                                        <p>Care:</p>
                                        <p>Size:</p>
                                    </div>
                                    <div>
                                        <p> Polyester</p>
                                        <p> 30 degree wash</p>
                                        <p> 100x100 cm</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <FontAwesomeIcon icon="share-alt" />
                                <p>Share</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
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


export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)