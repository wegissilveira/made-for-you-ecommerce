import React from 'react'

import classes from './ProductPage.module.css'

import productsData from 'Data/productsData'

import useProduct from 'hooks/useProduct'

import ProductInfoComponent from './ProductInfoComponent/ProductInfoComponent'
import ProductSlider from './ProductSlider/ProductSlider'


const ProductPage = props => {
   const product = productsData.find(product => product._id === props.match.params.id)
   // const currentProduct = useProduct()

   return (
      <div className={classes.Product_page_container}>
         <ProductSlider product={product} />
         <ProductInfoComponent product={product} />
      </div>
   )
}

export default ProductPage