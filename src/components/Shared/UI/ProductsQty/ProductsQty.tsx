import React, { useContext, useEffect, useState } from 'react'
import classes from './ProductsQty.module.css'

import { verifyCheckout } from "helpers/functions"

import { UpdateProductValuesContext, ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

import { QtyAction, QtyProps } from 'common/types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLocation } from "react-router-dom"


interface Props extends QtyProps {}

const ProductsQty = (props: Props) => {
   const {
      max,
      changeQtyCallBack,
      productQtyCheckout
   } = props

   const [ productQtyState, setProductQtyState ] = useState(1)
   const [ isCheckoutRoute, setIsCheckout ] = useState(false)

   const { updateQty } = useContext(UpdateProductValuesContext)
   const { productQty } = useContext(ProductDataContext)
   const location = useLocation()

   const changeQty = (action: QtyAction) => {
      let qty = productQtyState
      
      if (action === 'increase' && (productQtyState < max || max === undefined)) qty++
      if (action === 'decrease' && productQtyState > 1) qty--
      
      const qtyObj = {
         mobile: false,
         newQty: qty,
         action: action
      } as const

      if(!isCheckoutRoute) updateQty(qty, true)
      if (changeQtyCallBack) {
         if(isCheckoutRoute) changeQtyCallBack(qtyObj)
      }      
   }

   useEffect(() => {
      const isCheckout = verifyCheckout()
      setIsCheckout(isCheckout)
   }, [location])

   useEffect(() => {
      let qty = 1
      if (!isCheckoutRoute) qty = productQty
      if (productQtyCheckout) {
         if (isCheckoutRoute) qty = productQtyCheckout
      }     

      setProductQtyState(qty)
   }, [productQtyCheckout, productQty, isCheckoutRoute])
   
   
   return (
      <div className={classes.Product_qtde}>
         <p>{productQtyState}</p>
         <div className={classes.Product_qtde_arrows}>
            <FontAwesomeIcon 
               className={classes[productQtyState < max || max === undefined ? 'active' : 'disabled']}
               onClick={productQtyState < max || max === undefined ? () => changeQty('increase') : undefined}
               icon="chevron-up" size="xs"
            />
            <FontAwesomeIcon
               className={classes[productQtyState > 1 ? 'active' : 'disabled']}
               onClick={productQtyState > 1 ? () => changeQty('decrease') : undefined}
               icon="chevron-down" size="xs"
            />
         </div>
      </div>
   )
}

export default React.memo(ProductsQty)