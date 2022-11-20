import React from "react"

import classes from './ProductInfoHeader.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ProductInfoHeader = props => {
   const {
      product
   } = props

   return (
      <>
         <div className={classes['Product-info-header--wrapper']}>
            <p>123456</p>
            <p>exemplo</p>
         </div>
         <h1>{product.name}</h1>
         <p>A comfortable bed for the dog. It will bring a lot of pleasure to your pet. High quality material does not allow the wool to stick and easy to clean.</p>
         <div className={classes.Product_price_container}>
            <h3>$ {product.price}</h3>
            <div>
               <FontAwesomeIcon icon="check" />
               <p>Available</p>
            </div>
         </div>
      </>
   )
}

export default ProductInfoHeader