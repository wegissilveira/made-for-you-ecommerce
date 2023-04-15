import classes from './ProductCardFooter.module.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'
import { formatUrlName } from 'helpers/functions'


type Props = {
   productId: string
   productName: string
   productPrice: string
   iconBgColor: string
   cartHandlerCB: (action?: 'load') => void
   openModalHandlerCB: () => void
}

const ProductCardFooter = (props: Props) => {
   const {
      productId,
      productName,
      productPrice,
      iconBgColor,
      cartHandlerCB,
      openModalHandlerCB
   } = props


   return (
      <div className={classes.Products_description}>
         <div>
            <Link to={process.env.PUBLIC_URL + formatUrlName(productName, productId)}>{productName}</Link>
            <p>$ {productPrice}</p>
         </div>
         <div>
            <FontAwesomeIcon
               onClick={openModalHandlerCB}
               icon="eye"
            />
            <FontAwesomeIcon
               onClick={() => cartHandlerCB()}
               icon="shopping-bag" size="2x"
               className={iconBgColor}
            />
         </div>
      </div>
   )
}

export default ProductCardFooter