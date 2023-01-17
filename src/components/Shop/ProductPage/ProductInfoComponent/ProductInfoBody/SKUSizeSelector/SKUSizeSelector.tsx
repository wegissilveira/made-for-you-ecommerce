import React, { useEffect, useRef, useContext } from 'react'
import classes from './SKUSizeSelector.module.scss'

import { ProductCartType } from 'common/types'

import { UpdateProductValuesContext } from "components/Shop/ProductPage/context/ProductContext"


type Props = {
   productCartDetails: ProductCartType
}

const SKUSizeSelector = (props: Props) => {
   const {
      productCartDetails
   } = props

   const { updateSize } = useContext(UpdateProductValuesContext)

   const selectRef = useRef<HTMLSelectElement>(null)

   useEffect(() => {
      const selectEl = selectRef.current

      if (selectEl) {
         const selectArray = Array.from(selectRef.current.children)
         selectArray.forEach((option, i) => {
            const optionEl = option as HTMLOptionElement
            if (optionEl.value === productCartDetails.size) {
               optionEl.selected = true
            } else {
               optionEl.selected = false
            }
         })
      }
   }, [JSON.stringify(productCartDetails)])


   return (
      <div className={classes['SKUSelector--container']}>
         <p>Size</p>
         <select ref={selectRef} onChange={e => updateSize(e.target.value, true)}>
            <option value="100x100">100x100 cm</option>
            <option value="200x200">200x200 cm</option>
            <option value="300x300">300x300 cm</option>
         </select>

      </div>
   )
}

export default React.memo(SKUSizeSelector)