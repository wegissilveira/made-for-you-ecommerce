import React from 'react'

import classes from './Cart.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductCart from './ProductCart/ProductCart';
import CartForm from './CartForm/CartForm'
import * as actionTypes  from '../../../store/actions/actionTypes'

import cartListDataFn from '../../../Data/cartData'
import productsData from '../../../Data/productsData'


const Cart = props => {

    let products = []
    productsData.forEach(product => {
        props.cart.forEach(item => {
            if (item._id === product._id) {
                products.push(product)
            }
        })
    })
    
    let products_cart_details = []
    for(let i=0; i < products.length; i++) {
        products_cart_details.push({
       ...products[i], 
       ...(props.cart.find((item) => item._id === products[i]._id))}
      )
    }

    products_cart_details.sort((a,b) => {
        const indexOfA = props.cart.findIndex(e => e._id === a._id)
        const indexOfB = props.cart.findIndex(e => e._id === b._id)
        return indexOfA - indexOfB;
    })


    let [qtde, setQtde] = React.useState(() => {
        let arrQtde = []
        props.cart.map((item, index) => {
            return arrQtde[index] = item.qtde
        })

        return arrQtde
    })

    const pricesArrState = products.map(item => parseFloat(item.price))

    let finalPrice = 0
    pricesArrState.map((item, i) => {
        finalPrice = finalPrice + (item * qtde[i])
        return finalPrice
    })

    const setQtdeHandler = (value, index) => {
        let arrQtde = [...qtde]
        arrQtde[index] = value
        setQtde(arrQtde)
    }

    const removeProductCartHandler = id => {
        let cartList = props.cart.filter(item => item._id !== id)
        localStorage.setItem('cartList', JSON.stringify(cartList))
        props.onCartListState()
    }



    return (
        <div className={classes.Session_container}>
            <h1>CART</h1>
            { products.length > 0 ?
                <div className={classes.Cart_container}>
                    <div>
                        <p>PRODUCT</p>
                        <p>DISCOUNT</p>
                        <p>PRICE</p>
                        <p>QUANTITY</p>
                        <p>TOTAL</p>
                        <p></p>
                    </div>
                    { 
                        products_cart_details.map((product, i) => {
                            return <ProductCart 
                                        key={i}
                                        product={product} 
                                        prodIndex={i}
                                        qtde={qtde[i]}
                                        setQtdeCallback={(value, index) => setQtdeHandler(value, index)}
                                        removeProductCallback={id => removeProductCartHandler(id)}
                                    />
                        })
                    }
                    
                    <div>
                        <Link to="/shop/">
                            <p className={classes.Cart_dark_button}>
                                <FontAwesomeIcon icon="long-arrow-alt-left" />
                                <span>KEEP BUYING</span>
                            </p>
                        </Link>
                    </div>
                    <CartForm finalPrice={finalPrice} />
                </div> :

                <h1>YOUR BAG IS EMPTY</h1>
            }
        </div>
    )
}


const mapStateToProps = state => {
    return {
        cart: state.cartListState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCartListState: () => dispatch({
                type: actionTypes.CARTLIST, 
                value: cartListDataFn()
            })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart)