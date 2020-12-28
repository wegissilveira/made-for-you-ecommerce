import React from 'react'

import classes from './Cart.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ProductQtde from '../../Shared/UI/ProductsQtde/ProductsQtde'
import ProductQtdeMobile from '../../Shared/UI/ProductQtdeMobile/ProductQtdeMobile'
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
    
    let products_cart_merged = []
    for(let i=0; i < products.length; i++) {
        products_cart_merged.push({
       ...products[i], 
       ...(props.cart.find((item) => item._id === products[i]._id))}
      )
    }

    products_cart_merged.sort((a,b) => {
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

    const toggleQtdeSelectMobileHandler = (i, qtde) => {
        const select = document.getElementById('product_qtde-'+i)

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
                    {products_cart_merged.map((product, i) => {
                        return  <div key={i} className={classes.Cart_details}>
                                    <div>
                                        <Link to={"/shop/product/" + product._id}>
                                            <img src={product.imgsDemo[0]} alt='img' />
                                        </Link>

                                        <div>
                                            <Link to={"/shop/product/" + product._id}>{product.name}</Link>
                                            <div className={classes.Cart_details_info}>
                                                <div>
                                                    <p>Size</p>
                                                    <p>Color</p>
                                                </div>
                                                <div>
                                                    <p>{product.size}</p>
                                                    <p>{product.color}</p>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Botão de remover mobile */}
                                        <FontAwesomeIcon
                                            onClick={() => removeProductCartHandler(product._id)}
                                            className={classes.Cart_delete_icon}
                                            icon="times"
                                            size="2x"
                                        />
                                    </div>
                                    <p>0%</p>
                                    <p>$ {product.price}</p>
                                    <div>
                                        <ProductQtde 
                                            startQtde={product.qtde}
                                            changeQtdeCallBack={qtde => setQtdeHandler(qtde, i)} 
                                            max={10}
                                        />
                                    </div>
                                    <p>$ {(qtde[i] * parseFloat(product.price)).toFixed(2)}</p>
                                    <p>
                                        <FontAwesomeIcon
                                            onClick={() => removeProductCartHandler(product._id)}
                                            className={classes.Cart_delete_icon}
                                            icon="times"
                                        />
                                    </p>
                                    <div className={classes.Cart_price_mobile}>
                                        <div
                                            onClick={() => toggleQtdeSelectMobileHandler(i, qtde[i])}
                                        >
                                            <p>{qtde[i]}</p>
                                            <FontAwesomeIcon icon="chevron-down" size="xs"/>
                                        </div>
                                        <p>$ {(qtde[i] * parseFloat(product.price)).toFixed(2)}</p>
                                        <div 
                                            id={'product_qtde-' + i}
                                            className={classes.Cart_qtde_mobile}
                                        >
                                            <ProductQtdeMobile
                                                changeQtdeCallBack={qtde => setQtdeHandler(qtde, i)} 
                                                productIndex={i}
                                                toggle={() =>toggleQtdeSelectMobileHandler(i)}
                                            />
                                        </div>
                                    </div>
                                </div>
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
                    <div className={classes.Form_cart_container}>
                        <div>
                            <p>COUPON DISCOUNT</p>
                            <p>Enter your coupon code if you have one</p>
                            <input placeholder="Enter your code"/>
                            <p className={classes.Cart_light_button}>APPLY COUPON</p>
                        </div>
                        <div>
                            <p>CALCULATE SHIPPING</p>
                            <select>
                                <option>Argentina</option>
                                <option>Brazil</option>
                                <option>Germany</option>
                                <option>United States</option>
                            </select>
                            <input placeholder="State/Country" />
                            <input placeholder="Town/City" />
                            <input placeholder="Postcode/ZIP" />
                            <p className={classes.Cart_light_button}>UPDATE</p>
                        </div>
                        <div>
                            <div>
                                <div className={classes.Form_cart_price_container}>
                                    <div>
                                        <p>SUBTOTAL</p>
                                        <p>$ {finalPrice.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p>SHIPPING</p>
                                        <p>$ 20.00</p>
                                    </div>
                                    <div>
                                        <p>TOTAL</p>
                                        <p>$ 40.00</p>
                                    </div>
                                </div>
                            </div>
                            <p className={classes.Cart_dark_button} >PROCEED TO CHECKOUT</p>
                        </div>
                    </div>
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