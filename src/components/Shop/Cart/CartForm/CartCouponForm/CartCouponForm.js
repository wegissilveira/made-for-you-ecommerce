import React from "react"
import classes from './CartCouponForm.module.css'

const CartCouponForm = () => {
   return (
      <div>
         <p>COUPON DISCOUNT</p>
         <p>Enter your coupon code if you have one</p>
         <input placeholder="Enter your code"/>
         <p className={classes.Cart_light_button}>APPLY COUPON</p>
      </div>
   )
}

export default CartCouponForm