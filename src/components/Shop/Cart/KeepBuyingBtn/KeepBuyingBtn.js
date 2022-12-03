import React from "react"
import classes from './KeepBuyingBtn.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'

const KeepBuyingBtn = props => {
   const {
      btnText
   } = props

   return (
      <div className={classes.Cart_keepBuy_button}>
         <Link to="/shop/">
            <p className={classes.Cart_dark_button}>
               <FontAwesomeIcon icon="long-arrow-alt-left" />
               <span>{btnText}</span>
            </p>
         </Link>
      </div>
   )
}

export default KeepBuyingBtn