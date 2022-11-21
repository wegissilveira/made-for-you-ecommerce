import React from 'react'

import classes from './ProductPage.module.css'

import useProduct from 'hooks/useProduct'

import ProductInfoComponent from './ProductInfoComponent/ProductInfoComponent'
import ProductSlider from './ProductSlider/ProductSlider'


const ProductPage = () => {
   const currentProduct = useProduct()

   return (
      <div className={classes.Product_page_container}>
         <ProductSlider imgs={currentProduct.imgsDemo} />
         <ProductInfoComponent product={currentProduct} />
      </div>
   )
}

export default ProductPage