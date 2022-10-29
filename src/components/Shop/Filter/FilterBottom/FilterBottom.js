import React from "react"
import classes from './FilterBottom.module.css'

const filterButtonStyle = [classes.Filter_button, classes.Filter_button_active]

const FilterBottom = props => {
   const {
      cleanFiltersHandlerCB
   } = props

   return (
      <div className={classes.Filter_buttons_container}>
         <button className={filterButtonStyle.join(' ')}>FILTER</button>
         <button
            className={classes.Filter_button}
            onClick={() => cleanFiltersHandlerCB()}
         > CLEAR ALL
         </button>
      </div>
   )
}

export default FilterBottom