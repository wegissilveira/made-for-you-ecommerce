import React from 'react'
import classes from './ProductCardFooter.module.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom'


const ProductCardFooter = (props) => {
   const {
      productId,
      productName,
      productPrice,
      productIndex,
      iconBgColor,
      cartHandlerCB,
      openModalHandlerCB
   } = props


   return (
      <div className={classes.Products_description}>
         <div>
            <Link to={"/shop/product/" + productId}>{productName}</Link>
            <p>$ {productPrice}</p>
         </div>
         <div>
            <FontAwesomeIcon
               onClick={() => openModalHandlerCB(productIndex)}
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