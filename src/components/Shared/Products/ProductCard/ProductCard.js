import React from 'react'

import classes from './ProductCard.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductPageModal from '../../../Shop/ProductPageModal/ProductPageModal'
import * as actionTypes from '../../../../store/actions/actionTypes'
import wishlistDataFn from '../../../../Data/wishlistData';
import cartListDataFn from '../../../../Data/cartData';



const ProductCard = props => {

    let [showProduct, setShowProduct] = React.useState(false)
    let [prodExistsCart, setProdExistsCart] = React.useState(false)

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

    const cartHandler = (arg) => {

        let cartList = [...props.cart]

        let count = 0
        cartList.forEach(item => {
            if (item._id === props.product._id) count++
            if ( arg === 'load' && item._id === props.product._id) {
                setProdExistsCart(true)
            }
        })
        
        if (arg !== 'load') {
            if (count === 0) {
                let productCart = {}
    
                productCart._id = props.product._id
                productCart.qtde = 1
                productCart.color = props.product.colors[0]
                productCart.size = '100x100'
                
                cartList.push(productCart)
                setProdExistsCart(true)
    
            } else {
                cartList = cartList.filter(item => item._id !== props.product._id)
                setProdExistsCart(false)
            }  

            localStorage.setItem('cartList', JSON.stringify(cartList))
            props.onCartListState()
        }
    }

    
    const openModalHandler = i => {
        setShowProduct(!showProduct)
        document.body.style.overflow = "hidden"
    }

    const closeModalCallback = () => {
        setShowProduct(!showProduct)
        document.body.style.overflow = "visible"
    }

    const wish_icon = props.wish.includes(props.product._id) ? 'fas' : 'far'
    const bag_icon_color = prodExistsCart ? classes.Wishlist_icon_bag_selected : classes.Wishlist_icon_bag
                                  
    React.useEffect(() => {
        cartHandler('load')
    }, [])


    return (
        <React.Fragment>
            <div className={classes.ProductCard_container}>
                <div className={classes.ProductCard_subContainer}>
                    <FontAwesomeIcon 
                        onClick={() => wishlistHandler(props.product._id)} 
                        icon={[wish_icon, 'heart']} size="2x" 
                        className={classes.Wishlist_icon_heart} 
                    />
                    <Link to={"/shop/product/" + props.product._id} >
                        <div className={classes.Products_img_container}>
                            <img 
                                src={props.product.img} 
                                alt="Produto" 
                            />
                        </div>
                    </Link>
                    <div className={classes.Products_description}>
                        <div>
                            <Link to={"/shop/product/" + props.product._id}>{props.product.name}</Link>
                            <p>$ {props.product.price}</p>
                        </div>
                        <div>
                            <FontAwesomeIcon 
                                onClick={() => openModalHandler(props.index)} 
                                icon="eye" 
                            />
                            <FontAwesomeIcon
                                onClick={() => cartHandler()}
                                icon="shopping-bag" size="2x"
                                className={bag_icon_color}  
                            />
                        </div>
                    </div>
                </div>
                
            </div>
            <ProductPageModal 
                showProduct={showProduct}
                setShowProduct={closeModalCallback}
                product={props.product} 
                wishlist={props.wish}
                imgs={props.product.imgsDemo} 
                name={props.product.name}
                setProductOnCart={(arg) => setProdExistsCart(arg)}
            />
        </React.Fragment>
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


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)