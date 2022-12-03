import React from "react"
import classes from './CartList.module.scss'

import CartForm from 'components/Shop/Cart/CartForm/CartForm'
import ProductCartTable from "./ProductCartTable/ProductCartTable"
import KeepBuyingBtn from "../KeepBuyingBtn/KeepBuyingBtn"


const CartList = props => {
   const {
      productsCartDetails,
      setQtdeHandlerCB,
      removeProductCartHandlerCB,
      finalPrice
   } = props


   return (
      <div className={classes.Cart_container}>
         <ProductCartTable 
            productsCartDetails={productsCartDetails}
            setQtdeHandlerCB={setQtdeHandlerCB}
            removeProductCartHandlerCB={removeProductCartHandlerCB}
         />
         <KeepBuyingBtn btnText={'KEEP BUYING'} />
         <CartForm finalPrice={finalPrice} />
      </div>
   )
}

export default CartList