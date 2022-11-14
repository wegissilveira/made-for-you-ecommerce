import React, { useContext } from "react"
import classes from './FilterCheckbox.module.css'

import { UpdateProductsListContext, FilterDataContext } from "../context/FilterContext"


const FilterCheckbox = props => {
   const {
      checkboxItems
   } = props

   const { updateOffer } = useContext(UpdateProductsListContext)
   const filterReducerState = useContext(FilterDataContext)

   const setOfferHandler = e => {
      let inputValuesArr = [...filterReducerState.offer]
      const input = e.target

      if (input.checked) {
         inputValuesArr.push(input.value)
      } else {
         inputValuesArr = inputValuesArr.filter(value => value !== input.value)
      }
      
      updateOffer(inputValuesArr)
   }  


   return (
      <div id="our-offers-wrapper" className={classes['Offers-container']}>
         <h6>OUR OFFERS</h6>
         {checkboxItems.map((item, i) => {
            return (
               <div key={item.value+i}>
                  <input
                     type="checkbox"
                     value={item.value}
                     onChange={e => setOfferHandler(e)}
                     id={item.value+i}
                  />
                  <label htmlFor={item.value+i} >{item.title}</label>
               </div>)
         })}
      </div>
   )
}

export default FilterCheckbox