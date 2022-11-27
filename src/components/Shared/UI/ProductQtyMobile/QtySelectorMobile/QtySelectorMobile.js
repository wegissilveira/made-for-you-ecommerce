import React from 'react'
import classes from './QtySelectorMobile.module.css'

import ReactDOM from 'react-dom'  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import QtySelectorInput from './QtySelectorInput/QtySelectorInput'


const QtySelectorMobile = (props) => {
   const {
      qtyListRef,
      maxQty,
      startQty,
      toggleQtySelectMobileCB,
      changeQtyCB,
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
                  startQty={startQty}
                  changeQtyCB={changeQtyCB}
               />
            </div>
         </div>,
         document.getElementById('qty-selector-root')
      )
   )
}

export default QtySelectorMobile