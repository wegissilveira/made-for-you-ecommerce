import { useState, useEffect } from 'react'
import classes from './ProductCart.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import * as actionTypes from 'store/actions/actionTypes'

import cartListDataFn from 'Data/cartData'

import { CartType, InitialState, SetQty } from 'common/types';

import ProductsQty from "components/Shared/UI/ProductsQty/ProductsQty"
import ProductQtyMobile from 'components/Shared/UI/ProductQtyMobile/ProductQtyMobile'
import ProductCartDetails from './ProductCartDetails/ProductCartDetails'


type Props = {
   product: CartType
   onCartListState: () => void
   onUpdateCartValueState: (newValue: number) => void
   cart: CartType[]
   totalCartValue: number
}

const ProductCart = (props: Props) => {
   const {
      product,
      onCartListState,
      onUpdateCartValueState,
      cart,
      totalCartValue
   } = props
   
   const [productQty, setQty] = useState(1)

   const setQtdeHandler = (qtyObj: SetQty) => {
      const currentQty = qtyObj.mobile ? qtyObj.qtyMobile : 1
      const newCartValue = qtyObj.action === 'increase' ? 
         totalCartValue + (parseFloat(product.price) * currentQty) :
         totalCartValue - (parseFloat(product.price) * currentQty)

      onUpdateCartValueState(newCartValue)
      setQty(qtyObj.newQty)
   }

   const removeProductCart = (id: string) => {
      let cartList = cart.filter(item => item._id !== id)
      localStorage.setItem('cartList', JSON.stringify(cartList))
      onCartListState()
   }

   useEffect(() => {
      setQty(product.qtde)
   }, [])

   return (
      <tr className={classes['Cart-body--wrapper']}>
         <td className={classes['Cart-column--prod-details']}>
            <ProductCartDetails product={product} />
         </td>
         <td className={classes['Cart-column--discount']}>0%</td>
         <td className={classes['Cart-column--unit-price']}>$ {product.price}</td>
         <td className={classes['Cart-column--qty']}>
            <ProductsQty
               productQtyCheckout={productQty}
               changeQtyCallBack={setQtdeHandler}
               max={8}
            />
            <ProductQtyMobile
               changeQtyCallBack={setQtdeHandler}
               productQtyCheckout={productQty}
               max={8}
            />
         </td>
         <td className={classes['Cart-column--total-price']}>$ {(productQty * parseFloat(product.price)).toFixed(2)}</td>
         <td className={classes['Cart-column--remove-prod']}>
            <FontAwesomeIcon
               onClick={() => removeProductCart(product._id)}
               className={classes.Cart_delete_icon}
               icon="times"
            />
            <FontAwesomeIcon
               onClick={() => removeProductCart(product._id)}
               className={classes.Cart_delete_icon}
               icon="times"
               size="2x"
            />
         </td>
      </tr>
   )
}

const mapStateToProps = (state: InitialState) => {
   return {
      cart: state.cartListState,
      totalCartValue: state.totalCartValue
   }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
   return {
      onCartListState: () => dispatch({
         type: actionTypes.CARTLIST,
         value: cartListDataFn()
      }),
      onUpdateCartValueState: (newValue: number) => dispatch({
         type: actionTypes.UPDATE_FINAL_VALUE,
         value: newValue
      })
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductCart)