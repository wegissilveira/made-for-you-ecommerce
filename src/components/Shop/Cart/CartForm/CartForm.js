import React from 'react'
import CartCouponForm from './CartCouponForm/CartCouponForm'

import classes from './CartForm.module.css'
import CartPaymentForm from './CartPaymentForm/CartPaymentForm'
import CartShippingForm from './CartShippingForm/CartShippingForm'


const CartForm = props => {
   const {
      finalPrice
   } = props

   return (
      <div className={classes.Form_cart_container}>
         <CartCouponForm />
         <CartShippingForm />
         <CartPaymentForm finalPrice={finalPrice} />
      </div>
   )
}

export default CartForm