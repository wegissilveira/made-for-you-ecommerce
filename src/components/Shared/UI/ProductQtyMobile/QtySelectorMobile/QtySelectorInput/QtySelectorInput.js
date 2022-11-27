import React from "react"
import classes from  './QtySelectorInput.module.css'

const QtySelectorInput = props => {
   const  {
      maxQty,
      startQty,
      changeQtyCB
   } = props

   return (
      <div onClick={e => changeQtyCB(e)} className={classes.selectList_items}>
         {
            maxQty.map((item, i) => {
               return (
                  <div key={item + i}>
                     <label>{i + 1}</label>
                     <input
                        type="radio"
                        value={i + 1}
                        checked={startQty === i + 1}
                     />
                  </div>
               )
            })
         }
      </div>
   )
}

export default QtySelectorInput