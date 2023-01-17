import { useContext } from "react"
import classes from './FilterColorSelector.module.scss'

import { UpdateFilterListContext, FilterDataContext } from "../context/FilterContext"
import { Color } from "common/types"

import ColorSelect from 'components/Shared/UI/ColorSelect/ColorSelect'


const FilterColorSelector = () => {
   const { updateFilterColor } = useContext(UpdateFilterListContext)
   const filterReducerState = useContext(FilterDataContext)

   const lastSelectedColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isAllColorsChecked = e.target.checked
      const checked = {
         currentColor: isAllColorsChecked ? '' as Color : filterReducerState.color.lastSelectedColor,
         lastSelectedColor: filterReducerState.color.lastSelectedColor
      }
      
      updateFilterColor(checked)
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
         <ColorSelect isFilter={true} />
      </div>
   )
}

export default FilterColorSelector