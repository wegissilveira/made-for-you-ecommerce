import classes from './Cart.module.scss'

import { connect } from 'react-redux'

import { InitialState, CartType } from 'common/types'

import CartList from './CartList/CartList'
import KeepBuyingBtn from './KeepBuyingBtn/KeepBuyingBtn'


type Props = {
   cart: CartType[]
}

const Cart = (props: Props) => {
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

const mapStateToProps = (state: InitialState) => {
   return {
      cart: state.cartListState
   }
}

export default connect(mapStateToProps)(Cart)