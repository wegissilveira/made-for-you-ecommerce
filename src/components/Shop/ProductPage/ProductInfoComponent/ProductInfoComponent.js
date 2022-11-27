import React from 'react'
import classes from './ProductInfoComponent.module.css'

import ProductContext from 'components/Shop/ProductPage/context/ProductProvider'

import ProductInfoFooter from './ProductInfoFooter/ProductInfoFooter'
import ProductInfoBody from './ProductInfoBody/ProductInfoBody'
import ProductInfoHeader from './ProductInfoHeader/ProductInfoHeader'


const ProductInfoComponent = props => {
   const {
      product      
   } = props

   return (
      <div className={classes.ProductInfo_container}>
         <ProductContext>
            <ProductInfoHeader product={product} />
            <ProductInfoBody product={product} />
         </ProductContext>
         <ProductInfoFooter />
      </div>
   )
}

export default ProductInfoComponent