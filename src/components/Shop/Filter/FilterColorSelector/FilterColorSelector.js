import React, { useContext } from "react"
import classes from './FilterColorSelector.module.css'

import { UpdateProductsListContext, FilterDataContext } from "../context/FilterContext"

import ColorSelect from 'components/Shared/UI/ColorSelect/ColorSelect'


const FilterColorSelector = () => {
   const { updateColor } = useContext(UpdateProductsListContext)
   const filterReducerState = useContext(FilterDataContext)

   const lastSelectedColorHandler = (e) => {
      const isAllColorsChecked = e.target.checked
      const checked = {
         currentColor: isAllColorsChecked ? '' : filterReducerState.color.lastSelectedColor,
         lastSelectedColor: filterReducerState.color.lastSelectedColor
      }
      
      updateColor(checked)
   }


   return (
      <div className={classes.FilterColor_container}>
         <h6>COLOR</h6>
         <div className={classes.FilterColor_subContainer}>
            <input
               type="checkbox"
               onChange={(e) => lastSelectedColorHandler(e)}
               id="all-colors-input"
            />
            <label htmlFor="all-colors-input">All available colors</label>
         </div>
         <ColorSelect
            // colors={['red', 'yellow', 'blue', 'purple', 'green']}
            isFilter={true}
         />
      </div>
   )
}

export default FilterColorSelector