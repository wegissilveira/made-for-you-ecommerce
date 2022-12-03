import React, { useState } from 'react'

import classes from './Cart.module.scss'

import { connect } from 'react-redux'

import * as actionTypes from 'store/actions/actionTypes'

import cartListDataFn from 'Data/cartData'
import productsData from 'Data/productsData'
import CartList from './CartList/CartList'
import KeepBuyingBtn from './KeepBuyingBtn/KeepBuyingBtn'


const Cart = props => {
   const [qtde, setQtde] = useState(() => {
      let arrQtde = []
      props.cart.map((item, index) => {
         return arrQtde[index] = item.qtde
      })

      return arrQtde
   })

   let products = []
   productsData.forEach(product => {
      props.cart.forEach(item => {
         if (item._id === product._id) {
            products.push(product)
         }
      })
   })

   let productsCartDetails = []
   for (let i = 0; i < products.length; i++) {
      productsCartDetails.push({
         ...products[i],
         ...(props.cart.find((item) => item._id === products[i]._id))
      }
      )
   }

   productsCartDetails.sort((a, b) => {
      const indexOfA = props.cart.findIndex(e => e._id === a._id)
      const indexOfB = props.cart.findIndex(e => e._id === b._id)
      return indexOfA - indexOfB;
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
         <h1>SHOPPING BAG</h1>
         {products.length > 0 ?
            <CartList 
               productsCartDetails={productsCartDetails}
               setQtdeHandlerCB={setQtdeHandler}
               removeProductCartHandlerCB={removeProductCartHandler}
               finalPrice={finalPrice}
            />
            :
            <>
               <h1>YOUR BAG IS EMPTY</h1>
               <KeepBuyingBtn btnText={'GO SHOP'} />
            </>
            
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