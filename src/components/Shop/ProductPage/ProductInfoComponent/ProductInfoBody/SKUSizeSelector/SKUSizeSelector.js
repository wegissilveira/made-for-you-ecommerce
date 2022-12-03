import React, { useEffect, useRef, useContext } from 'react'
import classes from './SKUSizeSelector.module.css'

import { UpdateProductValuesContext } from "components/Shop/ProductPage/context/ProductContext"

const SKUSizeSelector = (props) => {
   const {
      productCartDetails
   } = props

   const { updateSize } = useContext(UpdateProductValuesContext)

   const selectRef = useRef()

   useEffect(() => {
      const selectArray = Array.from(selectRef.current.children)
      selectArray.forEach((select, i) => {
         if (select.value === productCartDetails.size) {
            selectRef.current.children[i].selected = true
         } else {
            selectRef.current.children[i].selected = false
         }
      })
   }, [JSON.stringify(productCartDetails)])


   return (
      <div className={classes['SKUSelector--container']}>
         <p>Size</p>
         <select ref={selectRef} onChange={e => updateSize(e.target.value, true)}>
         {/* <select ref={selectRef} onChange={e => setSizeHandlerCB(e.target.value, true)}> */}
            <option value="100x100">100x100 cm</option>
            <option value="200x200">200x200 cm</option>
            <option value="300x300">300x300 cm</option>
         </select>

      </div>
   )
}

export default SKUSizeSelector