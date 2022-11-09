import React from "react"
import classes from './FilterColorSelector.module.css'

import ColorSelect from 'components/Shared/UI/ColorSelect/ColorSelect'


const FilterColorSelector = props => {
   const {
      lastSelectedColorHandlerCB,
      selectColorHandlerCB
   } = props

   return (
      <div className={classes.FilterColor_container}>
         <h6>COLOR</h6>
         <div>
            <input
               type="checkbox"
               onChange={(e) => lastSelectedColorHandlerCB(e)}
               id="all-colors-input"
            />
            <label htmlFor="all-colors-input">All available colors</label>
         </div>
         <ColorSelect
            title={'COLOR'}
            colors={['red', 'yellow', 'blue', 'purple', 'green']}
            selectColorHandlerCallback={color => selectColorHandlerCB(color, false)}
         />
      </div>
   )
}

export default FilterColorSelector