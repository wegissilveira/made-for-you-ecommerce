import React, { useContext, useState, useEffect } from "react"
import classes from  './QtySelectorInput.module.css'

import { verifyCheckout } from "helpers/functions"

import { UpdateProductValuesContext, ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

import { useLocation } from "react-router-dom"


const QtySelectorInput = props => {
   const  {
      maxQty,
      changeQtyCheckoutCB,
      productQtyCheckout
   } = props

   const [ productQtyState, setProductQtyState ] = useState(1)
   const [ isCheckoutRoute, setIsCheckout ] = useState(false)

   const { productQty } = useContext(ProductDataContext)
   const { updateQty } = useContext(UpdateProductValuesContext)

   const location = useLocation()

   const changeQtyHandler = e => {
		const inputValue = e.target.closest('DIV').getElementsByTagName('INPUT')[0].value
      
		if(!isCheckoutRoute) updateQty(inputValue, true)
      if(isCheckoutRoute) changeQtyCheckoutCB(inputValue)
	}
   
   useEffect(() => {
      let qty = 1
      if (!isCheckoutRoute) qty = productQty
      if (isCheckoutRoute) qty = productQtyCheckout

      setProductQtyState(qty)
   }, [productQtyCheckout, productQty, isCheckoutRoute])

   useEffect(() => {
      const isCheckout = verifyCheckout()
      setIsCheckout(isCheckout)
   }, [location])


   return (
      <div onClick={e => changeQtyHandler(e)} className={classes.selectList_items}>
         {
            maxQty.map((item, i) => {
               return (
                  <div key={item + i}>
                     <label>{i + 1}</label>
                     <input
                        type="radio"
                        value={i + 1}
                        checked={Number(productQtyState) === i + 1}
                        readOnly
                     />
                  </div>
               )
            })
         }
      </div>
   )
}

export default QtySelectorInput