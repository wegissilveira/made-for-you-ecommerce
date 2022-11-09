import React from "react"
import classes from './FilterCheckbox.module.css'

const FilterCheckbox = props => {
   const {
      checkboxItems,
      offerRef,
      setOfferCB
   } = props


   return (
      <div ref={offerRef} className={classes['Offers-container']}>
         <h6>OUR OFFERS</h6>
         {checkboxItems.map((item, i) => {
            return (
               <div key={item.value+i}>
                  <input
                     type="checkbox"
                     value={item.value}
                     onChange={e => setOfferCB(e)}
                     id={item.value+i}
                  />
                  <label htmlFor={item.value+i} >{item.title}</label>
               </div>)
         })}
      </div>
   )
}

export default FilterCheckbox