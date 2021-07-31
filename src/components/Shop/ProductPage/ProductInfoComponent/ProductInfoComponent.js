import React from 'react'

import classes from './ProductInfoComponent.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

import cartListDataFn from '../../../../Data/cartData.js'
import wishlistDataFn from '../../../../Data/wishlistData'

import ProductsQtde from '../../../Shared/UI/ProductsQtde/ProductsQtde'
import ProductQtdeMobile from '../../../Shared/UI/ProductQtdeMobile/ProductQtdeMobile'
import ColorSelect from '../../../Shared/UI/ColorSelect/ColorSelect'
import * as actionTypes from '../../../../store/actions/actionTypes'


const ProductInfoComponent = props => {

    let [isProductInBag, setProdExists] = React.useState(() => {
        let productCartArr = [...props.cart]
        let prod = 0

        productCartArr.map(item => 
            item._id === props.product._id ? prod++ : null
        )

        return prod
    })    

    let heart_Icon = props.wish.includes(props.product._id) ? 'fas' : 'far'    
    
    let [productColor, setProductColor] = React.useState('')
    let [productQtde, setQtde] = React.useState(undefined)
    let [productSize, setSize] = React.useState('100x100')
    let [productUpdated, setProductUpdated] = React.useState(false)


    let bag_button_color
    let bag_button_text
    if (productUpdated === true && isProductInBag === 1) {
        bag_button_color = classes.Bag_button_orange
        bag_button_text = 'UPDATE BAG'
    } else {
        bag_button_color = isProductInBag === 0 ? classes.Bag_button_green : classes.Bag_button_red
        bag_button_text = isProductInBag === 0 ? 'ADD TO BAG' : 'REMOVE FROM BAG'
    }
    
    const selectColorHandler = color => {
        setProductColor(color)
        setProductUpdated(true)
    }

    const setQtdeHandler = value => {
        setQtde(value)
        setProductUpdated(true)
    }

    const setSizeHandler = size => {
        setSize(size)
        setProductUpdated(true)
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
            if (item._id === props.product._id) count++
        })

        
        if (count === 0 || productUpdated) {
            let productCart = {}

            productCart._id = props.product._id
            productCart.qtde = productQtde
            productCart.color = productColor
            productCart.size = productSize

            if (productUpdated === true) {
                productCartArr = productCartArr.filter(item => item._id !== props.product._id)
            }
    
            productCartArr.push(productCart)
            setProdExists(1)
        } else {
            productCartArr = productCartArr.filter(item => item._id !== props.product._id)
            setProdExists(0)
        }

        setProductUpdated(false)

        localStorage.setItem('cartList', JSON.stringify(productCartArr))

        props.onCartListState()
    } 

    let product_cart_details = {}
    for (let i=0; i < props.cart.length; i++) {
        if (props.cart[i]._id === props.product._id){
            product_cart_details = {
                ...props.product, 
                ...props.cart[i]
            }
        }
    }

    const selectRef = React.useRef()
    
    React.useEffect(() => {
        const selectArray = Array.from(selectRef.current.children)
        selectArray.forEach((select, i) => {
            if (select.value === product_cart_details.size) {
                selectRef.current.children[i].selected = true
            } else {
                selectRef.current.children[i].selected = false
            }
        })
    }, [product_cart_details.size])



    return (
        <div className={classes.ProductInfo_container}>
            <div>
                <p>123456</p>
                <p>exemplo</p>
            </div>
            <h1>{props.product.name}</h1>
            <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
            <div className={classes.Product_price_container}>
                <h3>$ {props.product.price}</h3>
                <div>
                    <FontAwesomeIcon icon="check" />
                    <p>Available</p>
                </div>
            </div>
            <div className={classes.Product_details_container}>
                <div>
                    <p>Size</p>
                    <select ref={selectRef} onChange={e => setSizeHandler(e.target.value)}>
                        <option value="100x100">100x100 cm</option>
                        <option value="200x200">200x200 cm</option>
                        <option value="300x300">300x300 cm</option>
                    </select>
                </div>
                <div className={classes.ProductPage_colors}>
                    <p>Color</p>
                    <ColorSelect 
                        selectedColor={product_cart_details.color}
                        colors={props.product.colors}
                        selectColorHandlerCallback={(color, i) => selectColorHandler(color, i)}
                    />
                </div>
            </div>
            <div className={classes.Product_wishlist_container}>
                <ProductsQtde 
                    startQtde={product_cart_details.qtde}
                    changeQtdeCallBack={qtde => setQtdeHandler(qtde)}  
                    max={8}
                />
                <ProductQtdeMobile
                    changeQtdeCallBack={qtde => setQtdeHandler(qtde)} 
                    startQtde={productQtde !== undefined ? productQtde : product_cart_details.qtde}
                    initialValue={true}
                />        
                <button 
                    onClick={() => productCartHandler()}
                    type="button" 
                    className={bag_button_color}
                > {bag_button_text}
                </button> 

                <FontAwesomeIcon 
                    onClick={() => wishlistHandler(props.product._id)} 
                    className={classes.Wishlist_icon_alt}
                    icon={[heart_Icon, 'heart']} size="2x" 
                />
            </div>
            <div className={classes.Product_category_container}>
                <p>Category: <span>{props.product.category}</span></p>
                <p>Tags: <span>{props.product.tag}</span></p>
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


export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoComponent)