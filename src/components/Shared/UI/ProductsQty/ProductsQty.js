import React, { useContext, useEffect, useState } from 'react'
import classes from './ProductsQty.module.css'

import { UpdateProductValuesContext, ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ProductsQty = props => {
   const {
      max,
      isCheckout,
      changeQtyCallBack,
      productQtyCheckout
   } = props

   const [ productQtyState, setProductQtyState ] = useState(1)

   const { updateQty } = useContext(UpdateProductValuesContext)
   const { productQty } = useContext(ProductDataContext)

   const changeQty = arg => {
      let qty = productQtyState
      
      if (arg === "increase" && (productQtyState < max || max === undefined)) qty++
      if (arg === 'decrease' && productQtyState > 1) qty--

      if(!isCheckout) updateQty(qty, true)
      if(isCheckout) changeQtyCallBack(qty)
   }

   useEffect(() => {
      let qty = 1
      if (!isCheckout) qty = productQty
      if (isCheckout) qty = productQtyCheckout

      setProductQtyState(qty)
   }, [productQtyCheckout, productQty])

   
   return (
      <div className={classes.Product_qtde}>
         <p>{productQtyState}</p>
         <div className={classes.Product_qtde_arrows}>
            <FontAwesomeIcon 
               className={classes[productQtyState < max || max === undefined ? 'active' : 'disabled']}
               onClick={productQtyState < max || max === undefined ? () => changeQty('increase') : null}
               icon="chevron-up" size="xs"
            />
            <FontAwesomeIcon
               className={classes[productQtyState > 1 ? 'active' : 'disabled']}
               onClick={productQtyState > 1 ? () => changeQty('decrease') : null}
               icon="chevron-down" size="xs"
            />
         </div>
      </div>
   )
}

export default ProductsQty