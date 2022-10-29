import React from 'react'
import classes from './CartHeader.module.css'

const CartHeader = () => {
   return (
      <div className={classes.Cart_header}>
         <p>PRODUCT</p>
         <p>DISCOUNT</p>
         <p>PRICE</p>
         <p>QUANTITY</p>
         <p>TOTAL</p>
         <p></p>
      </div>
   )
}

export default CartHeader