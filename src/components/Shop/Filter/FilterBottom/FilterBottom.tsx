import { useContext } from "react"
import classes from './FilterBottom.module.css'

import { UpdateFilterListContext } from "../context/FilterContext"
import useSetGalleryFilterHeight from "hooks/useSetGalleryFilterHeight"

const filterButtonStyle = [classes.Filter_button, classes.Filter_button_active]

const FilterBottom = () => {
   const { setDefaultValues } = useContext(UpdateFilterListContext)
   const setGalleryHeight = useSetGalleryFilterHeight()

   const cleanFiltersHandler = () => {
      const selectList = Array.from(document.getElementById('order-filter-wrapper')!.children) as HTMLOptionElement[]
      const categoriesList = Array.from(document.getElementById('categories-wrapper')!.children) as HTMLParagraphElement[]
      const typesList = Array.from(document.getElementById('types-wrapper')!.children) as HTMLParagraphElement[]
      const offerList = Array.from(document.getElementById('our-offers-wrapper')!.children) as HTMLDivElement[]
      const colorInput = document.getElementById('all-colors-input') as HTMLInputElement
      const colorsBullets = Array.from(document.getElementById('colors-selector-bullets')!.children) as HTMLDivElement[]
      
      selectList.forEach((element, i) => {
         if (i === 0) {
            element.selected = true
         } else {
            element.selected = false
         }
      })

      const resetFilters = (el: Element, i: number) => {
         if (i !== 0) i === 1 ? el.className = classes.Selected : el.className = classes.Not_Selected
      }

      categoriesList.forEach((element, i) => {
         resetFilters(element, i)
      })

      typesList.forEach((element, i) => {
         resetFilters(element, i)
      })

      offerList.forEach(element => {
         if (element.tagName === 'DIV') {
            Array.from(element.children).forEach(el => {
               if (el.tagName === 'INPUT') {
                  (el as HTMLInputElement).checked = false
               }
            })
         }
      })

      colorsBullets.forEach((bullet) => {
         (bullet.children[0] as HTMLSpanElement).style.opacity = '0.4'
         bullet.style.border = '1px solid black'         
      })

      colorInput.checked = false      
      setDefaultValues()
      setGalleryHeight()
   }


   return (
      <div className={classes.Filter_buttons_container}>
         {/* <button className={filterButtonStyle.join(' ')}>FILTER</button> */}
         <button
            className={classes.Filter_button}
            onClick={cleanFiltersHandler}
         > CLEAR ALL
         </button>
      </div>
   )
}

export default FilterBottom