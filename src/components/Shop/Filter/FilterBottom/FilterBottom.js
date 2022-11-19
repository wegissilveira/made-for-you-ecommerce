import React, { useContext } from "react"
import classes from './FilterBottom.module.css'

import { UpdateProductsListContext } from "../context/FilterContext"

const filterButtonStyle = [classes.Filter_button, classes.Filter_button_active]

const FilterBottom = () => {
   const { setDefaultValues } = useContext(UpdateProductsListContext)

   const cleanFiltersHandler = () => {
      const selectList = Array.from(document.getElementById('order-filter-wrapper').childNodes)
      const categoriesList = Array.from(document.getElementById('categories-wrapper').childNodes)
      const typesList = Array.from(document.getElementById('types-wrapper').childNodes)
      const offerList = Array.from(document.getElementById('our-offers-wrapper').childNodes)
      const colorInput = document.getElementById('all-colors-input')
      const colorsBullets = Array.from(document.getElementById('colors-selector-bullets').childNodes)
      
      selectList.forEach((element, i) => {
         if (i === 0) {
            element.selected = true
         } else {
            element.selected = false
         }
      })

      const resetFilters = (el, i) => {
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
                  el.checked = false
               }
            })
         }
      })

      colorsBullets.forEach((bullet) => {
         bullet.style.border = '1px solid black'
         bullet.children[0].style.opacity = 0.4  
      })

      colorInput.checked = false      
      setDefaultValues()
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