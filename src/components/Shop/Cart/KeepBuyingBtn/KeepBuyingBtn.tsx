import classes from './KeepBuyingBtn.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'


type Props = {
   btnText: string
}

const KeepBuyingBtn = (props: Props) => {
   const {
      btnText
   } = props

   return (
      <div className={classes.Cart_keepBuy_button}>
         <Link to="/shop/">
            <button className={classes.Cart_dark_button}>
               <FontAwesomeIcon icon="long-arrow-alt-left" />
               <span>{btnText}</span>
            </button>
         </Link>
      </div>
   )
}

export default KeepBuyingBtn