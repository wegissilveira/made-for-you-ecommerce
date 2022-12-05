import React from 'react'
import classes from './CartPaymentForm.module.scss'

const CartPaymentForm = (props) => {
   const {
      finalPrice
   } = props


   return (
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
               <p>$ {(finalPrice + 20).toFixed(2)}</p>
            </div>
         </div>
         <p className={classes.Cart_dark_button}>PROCEED TO CHECKOUT</p>
      </div>
   )
}

export default CartPaymentForm