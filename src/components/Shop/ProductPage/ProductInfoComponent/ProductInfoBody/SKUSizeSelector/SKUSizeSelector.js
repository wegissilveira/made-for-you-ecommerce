import React from 'react'
import classes from './SKUSizeSelector.module.css'

const SKUSizeSelector = (props) => {
   const {
      selectRef,
      setSizeHandlerCB
   } = props

   return (
      <div className={classes['SKUSelector--container']}>
         <p>Size</p>
         <select ref={selectRef} onChange={e => setSizeHandlerCB(e.target.value)}>
            <option value="100x100">100x100 cm</option>
            <option value="200x200">200x200 cm</option>
            <option value="300x300">300x300 cm</option>
         </select>
      </div>
   )
}

export default SKUSizeSelector