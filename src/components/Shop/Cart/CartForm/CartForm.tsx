import CartCouponForm from './CartCouponForm/CartCouponForm'

import classes from './CartForm.module.css'
import CartPaymentForm from './CartPaymentForm/CartPaymentForm'
import CartShippingForm from './CartShippingForm/CartShippingForm'


const CartForm = () => {
   return (
      <div className={classes.Form_cart_container}>
         <CartCouponForm />
         <CartShippingForm />
         <CartPaymentForm />
      </div>
   )
}

export default CartForm