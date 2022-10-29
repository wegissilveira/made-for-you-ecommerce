import React from "react"
import classes from './FilterHeader.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const FilterHeader = props => {
   const {
      filterOpen,
      selectRef,
      openFilterHandlerCB,
      setOrderCB
   } = props

   const filterToggle =
      filterOpen === false ?
         ['OPEN FILTERS', 'filter'] :
         ['CLOSE FILTERS', 'times']


   return (
      <div className={classes.FilterHeader}>
         <div onClick={() => openFilterHandlerCB()}
            className={classes.Filter_toggle}
         >
            <FontAwesomeIcon icon={filterToggle[1]} />
            <p>{filterToggle[0]}</p>
         </div>
         <div className={classes.Filter_sort}>
            <p>Sort by</p>
            <select
               onChange={e => setOrderCB(e.target.value)}
               ref={selectRef}
            >
               <option value="default">Default Sorting</option>
               <option value="low-high">Price: Low to High</option>
               <option value="high-low">Price: High to Low</option>
               <option value="alphabetical">Alphabetical Order</option>
            </select>
         </div>
      </div>
   )
}

export default FilterHeader