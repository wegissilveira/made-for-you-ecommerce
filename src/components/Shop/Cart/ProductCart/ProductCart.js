import React, { useState, useEffect } from 'react'
import classes from './ProductCart.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { connect } from 'react-redux'
import * as actionTypes from 'store/actions/actionTypes'

import cartListDataFn from 'Data/cartData'

import ProductsQty from "components/Shared/UI/ProductsQty/ProductsQty"
import ProductQtyMobile from 'components/Shared/UI/ProductQtyMobile/ProductQtyMobile'
import ProductCartDetails from './ProductCartDetails/ProductCartDetails'


const ProductCart = props => {
   const {
      product,
      setQtdeCallback,
      onCartListState,
      cart
   } = props

   const [productQty, setQty] = useState(1)

   const setQtdeHandler = value => {
      setQty(value)
      setQtdeCallback(value, product._id)
   }

   const removeProductCart = id => {
      let cartList = cart.filter(item => item._id !== id)
      localStorage.setItem('cartList', JSON.stringify(cartList))
      onCartListState()
   }

   useEffect(() => {
      setQty(product.qtde)
   }, [])

   return (
      <tr className={classes['Cart-body--wrapper']}>
         <td className={classes['Cart-column--prod-details']}>
            <ProductCartDetails product={product} />
         </td>
         <td className={classes['Cart-column--discount']}>0%</td>
         <td className={classes['Cart-column--unit-price']}>$ {product.price}</td>
         <td className={classes['Cart-column--qty']}>
            <ProductsQty
               productQtyCheckout={productQty}
               changeQtyCallBack={setQtdeHandler}
               max={8}
            />
            <ProductQtyMobile
               changeQtyCallBack={setQtdeHandler}
               productQtyCheckout={productQty}
               id={product._id}
               max={8}
            />
         </td>
         <td className={classes['Cart-column--total-price']}>$ {(productQty * parseFloat(product.price)).toFixed(2)}</td>
         <td className={classes['Cart-column--remove-prod']}>
            <FontAwesomeIcon
               onClick={() => removeProductCart(product._id)}
               className={classes.Cart_delete_icon}
               icon="times"
            />
            <FontAwesomeIcon
               onClick={() => removeProductCart(product._id)}
               className={classes.Cart_delete_icon}
               icon="times"
               size="2x"
            />
         </td>
      </tr>
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


export default connect(mapStateToProps, mapDispatchToProps)(ProductCart)