import React from 'react'

import classes from './ProductsQty.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductsQty = props => {
   const {
      max,
      productQty,
      changeQtyCallBack
   } = props

   const changeQty = arg => {
      let qty = productQty
      
      if (arg === "increase" && (productQty < max || max === undefined)) qty++
      if (arg === 'decrease' && productQty > 1) qty--

      changeQtyCallBack(qty)
   }
   
   return (
      <div className={classes.Product_qtde}>
         <p>{productQty}</p>
         <div className={classes.Product_qtde_arrows}>
            <FontAwesomeIcon 
               className={classes[productQty < max || max === undefined ? 'active' : 'disabled']}
               onClick={productQty < max || max === undefined ? () => changeQty('increase') : null}
               icon="chevron-up" size="xs"
            />
            <FontAwesomeIcon
               className={classes[productQty > 1 ? 'active' : 'disabled']}
               onClick={productQty > 1 ? () => changeQty('decrease') : null}
               icon="chevron-down" size="xs"
            />
         </div>
      </div>
   )
}

export default ProductsQty