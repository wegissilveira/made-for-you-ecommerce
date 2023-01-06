import React from 'react'
import classes from './QtySelectorMobile.module.css'

import ReactDOM from 'react-dom'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { QtyProps } from 'common/types'

import QtySelectorInput from './QtySelectorInput/QtySelectorInput'

interface Props extends Omit<QtyProps, 'max'> {
   qtyListRef: React.MutableRefObject<HTMLDivElement | null>
   maxQty: number[]
   toggleQtySelectMobileCB: () => void
}

const QtySelectorMobile = (props: Props) => {
   const {
      qtyListRef,
      maxQty,
      toggleQtySelectMobileCB,
      changeQtyCallBack,
      productQtyCheckout
   } = props

   return (
      ReactDOM.createPortal(
         <div
            ref={qtyListRef}
            className={classes.selectList_container}
         >
            <div
               className={classes.selectList_subContainer}
            >
               <FontAwesomeIcon
                  onClick={() => toggleQtySelectMobileCB()}
                  className={classes['Close-btn']}
                  icon="times"
                  size="2x"
               />
               <h2>Select Quantity</h2>
               <QtySelectorInput 
                  maxQty={maxQty}
                  changeQtyCallBack={changeQtyCallBack}
                  productQtyCheckout={productQtyCheckout}
               />
            </div>
         </div>,
         document.getElementById('qty-selector-root')!
      )
   )
}

export default QtySelectorMobile