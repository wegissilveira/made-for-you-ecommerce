import React, { useContext, useState, useEffect } from "react"
import classes from  './QtySelectorInput.module.css'

import { verifyCheckout } from "helpers/functions"

import { UpdateProductValuesContext, ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

const isCheckout = verifyCheckout()


const QtySelectorInput = props => {
   const  {
      maxQty,
      changeQtyCheckoutCB,
      productQtyCheckout
   } = props

   const [ productQtyState, setProductQtyState ] = useState(1)

   const { productQty } = useContext(ProductDataContext)
   const { updateQty } = useContext(UpdateProductValuesContext)

   const changeQtyHandler = e => {
		const inputValue = e.target.closest('DIV').getElementsByTagName('INPUT')[0].value
      
		if(!isCheckout) updateQty(inputValue, true)
      if(isCheckout) changeQtyCheckoutCB(inputValue)
	}
   
   useEffect(() => {
      let qty = 1
      if (!isCheckout) qty = productQty
      if (isCheckout) qty = productQtyCheckout

      setProductQtyState(qty)
   }, [productQtyCheckout, productQty])


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