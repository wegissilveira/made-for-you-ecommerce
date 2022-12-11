import React from 'react'

import classes from './Cart.module.scss'

import { connect } from 'react-redux'

import CartList from './CartList/CartList'
import KeepBuyingBtn from './KeepBuyingBtn/KeepBuyingBtn'


const Cart = props => {
   const {
      cart
   } = props

   return (
      <div className={classes.Session_container}>
         <h1>SHOPPING BAG</h1>
         {cart.length > 0 ?
            <CartList />
            :
            <>
               <h1>YOUR BAG IS EMPTY</h1>
               <KeepBuyingBtn btnText={'GO SHOPPING'} />
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

export default connect(mapStateToProps)(Cart)