import React, { useContext } from "react"
import classes from  './QtySelectorInput.module.css'

import { ProductDataContext } from "components/Shop/ProductPage/context/ProductContext"

const QtySelectorInput = props => {
   const  {
      maxQty,
      changeQtyCB
   } = props

   const { productQty } = useContext(ProductDataContext)

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
                        defaultChecked={productQty === i + 1}
                     />
                  </div>
               )
            })
         }
      </div>
   )
}

export default QtySelectorInput