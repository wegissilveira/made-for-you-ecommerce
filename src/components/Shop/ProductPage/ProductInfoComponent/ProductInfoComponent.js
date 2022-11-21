import React from 'react'

import classes from './ProductInfoComponent.module.css'

import ProductInfoFooter from './ProductInfoFooter/ProductInfoFooter'
import ProductInfoBody from './ProductInfoBody/ProductInfoBody'
import ProductInfoHeader from './ProductInfoHeader/ProductInfoHeader'


const ProductInfoComponent = props => {
   const {
      product      
   } = props

   return (
      <div className={classes.ProductInfo_container}>
         <ProductInfoHeader product={product} />
         <ProductInfoBody />
         <ProductInfoFooter />
      </div>
   )
}

export default ProductInfoComponent