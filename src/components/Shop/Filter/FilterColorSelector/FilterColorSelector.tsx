import { useContext } from "react"
import classes from './FilterColorSelector.module.css'

import { UpdateFilterListContext, FilterDataContext } from "../context/FilterContext"
import useSetGalleryFilterHeight from "hooks/useSetGalleryFilterHeight"
import { Color } from "common/types"

import ColorSelect from 'components/Shared/UI/ColorSelect/ColorSelect'


const FilterColorSelector = () => {
   const { updateFilterColor } = useContext(UpdateFilterListContext)
   const filterReducerState = useContext(FilterDataContext)
   const setGalleryHeight = useSetGalleryFilterHeight()

   const lastSelectedColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isAllColorsChecked = e.target.checked
      const checked = {
         currentColor: isAllColorsChecked ? '' as Color : filterReducerState.color.lastSelectedColor,
         lastSelectedColor: filterReducerState.color.lastSelectedColor
      }
      
      updateFilterColor(checked)
      setGalleryHeight()
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