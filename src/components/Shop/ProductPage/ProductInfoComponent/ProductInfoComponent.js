import React from 'react'

import classes from './ProductInfoComponent.module.css'

import { connect } from 'react-redux'

import cartListDataFn from 'Data/cartData.js'
import wishlistDataFn from 'Data/wishlistData'

import * as actionTypes from 'store/actions/actionTypes'

import ProductInfoFooter from './ProductInfoFooter/ProductInfoFooter'
import ProductInfoBody from './ProductInfoBody/ProductInfoBody'
import ProductInfoHeader from './ProductInfoHeader/ProductInfoHeader'

const modalStyle = {
   specificDisplay: null,
   containerMargin: null,
   // wishWidth: null,
   // colorWidth: null,
}

const ProductInfoComponent = props => {
   const {
      cart,
      product,
      wish,
      modal,
      onWishlistState,
      onCartListState
   } = props

   if (modal) {
      modalStyle.specificDisplay = 'none'
      modalStyle.containerMargin = '0'
      // modalStyle.wishWidth = '90%'
      // modalStyle.colorWidth = '50%'
   }

   return (
      <div
         className={classes.ProductInfo_container}
         style={{ marginLeft: modalStyle.containerMargin }}
      >
         <ProductInfoHeader 
            product={product}
            modalStyle={modalStyle}
         />
         <ProductInfoBody 
            product={product}
            modalStyle={modalStyle}
            cart={cart}
            wish={wish}
            onWishlistStateCB={onWishlistState}
            onCartListStateCB={onCartListState}
         />
         <ProductInfoFooter modalStyle={modalStyle} />
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
      onWishlistState: () => dispatch({ type: actionTypes.WISHLIST, value: wishlistDataFn() }),
      onCartListState: () => dispatch({ type: actionTypes.CARTLIST, value: cartListDataFn() })
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoComponent)