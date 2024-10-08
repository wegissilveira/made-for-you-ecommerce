import React, { useContext, useState, useEffect } from "react"
import classes from  './QtySelectorInput.module.scss'

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
   const [ isCheckoutRoute, setIsCheckoutRoute ] = useState(false)

   const { productQty } = useContext(ProductDataContext)
   const { updateQty } = useContext(UpdateProductValuesContext)

   const location = useLocation()

   const changeQtyHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      const inputQty = e.currentTarget.getElementsByTagName('INPUT')[0] as HTMLInputElement
		const inputValue = Number(inputQty.value)
      
		if(!isCheckoutRoute) {
         updateQty(inputValue, true)
      } else {
         const action: QtyAction = productQtyState < inputValue ? 'increase' : 'decrease'
         const newQty = action === 'decrease' ? productQtyState - inputValue : inputValue - productQtyState
         const qtyObj = {
            newQty: inputValue,
            action: action,
            mobile: true,
            qtyMobile: newQty
         } as const

         if(changeQtyCallBack) changeQtyCallBack(qtyObj)
      }
	}
   
   useEffect(() => {
      let qty = 1
      if (!isCheckoutRoute) qty = productQty
      if(productQtyCheckout) {
         if (isCheckoutRoute) qty = productQtyCheckout
      }      

      setProductQtyState(qty)
   }, [productQtyCheckout, productQty, isCheckoutRoute])

   useEffect(() => {
      const isCheckout = verifyCheckout()
      setIsCheckoutRoute(isCheckout)
   }, [location])

   return (
      <div className={classes.selectList_items}>
         {
            maxQty.map((item, i) => {
               return (
                  <button 
                     key={item} 
                     onClick={changeQtyHandler}
                  >
                     <label>{i + 1}</label>
                     <input
                        type="radio"
                        value={i + 1}
                        checked={Number(productQtyState) === i + 1}
                        readOnly
                     />
                  </button>
               )
            })
         }
      </div>
   )
}

export default QtySelectorInput