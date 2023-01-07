import classes from './CartPaymentForm.module.scss'

import { connect } from 'react-redux'

import { InitialState } from 'common/types'


type Props = {
   totalCartValue: number
}

const CartPaymentForm = (props: Props) => {
   const {
      totalCartValue
   } = props

   return (
      <div>
         <div className={classes.Form_cart_price_container}>
            <div>
               <p>SUBTOTAL</p>
               <p>$ {totalCartValue.toFixed(2)}</p>
            </div>
            <div>
               <p>SHIPPING</p>
               <p>$ 20.00</p>
            </div>
            <div>
               <p>TOTAL</p>
               <p>$ {(totalCartValue + 20).toFixed(2)}</p>
            </div>
         </div>
         <p className={classes.Cart_dark_button}>PROCEED TO CHECKOUT</p>
      </div>
   )
}

const mapStateToProps = (state: InitialState) => {
   return {
      totalCartValue: state.totalCartValue
   }
}

export default connect(mapStateToProps)(CartPaymentForm)