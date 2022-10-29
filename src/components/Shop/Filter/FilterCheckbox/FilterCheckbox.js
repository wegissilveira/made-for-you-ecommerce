import React from "react"

const FilterCheckbox = props => {
   const {
      checkboxItems,
      offerRef,
      setOfferCB
   } = props


   return (
      <div ref={offerRef}>
         <h6>OUR OFFER</h6>
         {checkboxItems.map((item, i) => {
            return (
               <div key={item.value+i}>
                  <input
                     type="checkbox"
                     value={item.value}
                     onChange={e => setOfferCB(e)}
                  />
                  <label>{item.title}</label>
               </div>)
         })}
      </div>
   )
}

export default FilterCheckbox