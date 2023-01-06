import React, { useContext, useState, useEffect } from "react"
import classes from  './QtySelectorInput.module.css'

import { verifyCheckout } from "helpers/functions"

import { UpdateProductValuesContext, ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

import { QtyAction, QtyProps } from 'common/types'

import { useLocation } from "react-router-dom"


interface Props extends Omit<QtyProps, 'max'> {
   maxQty: number[]
}

const QtySelectorInput = (props: Props) => {
   const  {
      maxQty,
      changeQtyCallBack,
      productQtyCheckout
   } = props

   const [ productQtyState, setProductQtyState ] = useState(1)
   const [ isCheckoutRoute, setIsCheckout ] = useState(false)

   const { productQty } = useContext(ProductDataContext)
   const { updateQty } = useContext(UpdateProductValuesContext)

   const location = useLocation()

   const changeQtyHandler = (e: React.MouseEvent<HTMLDivElement>) => {
      const containerEl = e.target as HTMLDivElement
      const inputQty = containerEl.closest('DIV')!.getElementsByTagName('INPUT')[0] as HTMLInputElement
		const inputValue = Number(inputQty.value)
      
		if(!isCheckoutRoute) updateQty(inputValue, true)
      if(isCheckoutRoute) {
         const action: QtyAction = productQtyState < inputValue ? 'increase' : 'decrease'
         const newQty = action === 'decrease' ? productQtyState - inputValue : inputValue - productQtyState
         const qtyObj = {
            newQty: inputValue,
            action: action,
            mobile: true,
            qtyMobile: newQty
         }

         changeQtyCallBack(qtyObj)
      } 
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