import { useState, useEffect } from 'react'

import classes from './ProductPage.module.scss'

import useProduct from 'hooks/useProduct'

import ProductInfoComponent from './ProductInfoComponent/ProductInfoComponent'
import ProductSlider from './ProductSlider/ProductSlider'
import Spinner from 'components/Shared/UI/Spinner/Spinner'


const ProductPage = () => {
   const [loading, setLoading] =  useState(true)
   const currentProduct = useProduct()

   useEffect(() => {       
      if (currentProduct) {
         const loaded = Object.keys(currentProduct).length >= 1 ? true : false
         setTimeout(() => {
            setLoading(!loaded)
         }, 1500)
      }

   }, [currentProduct])

   return (
      <div className={classes.Product_page_container}>
         {
            !loading
               ?
                  <>
                     <ProductSlider imgs={currentProduct!.imgsDemo} />
                     <ProductInfoComponent product={currentProduct} />
                  </> 
               :
            <>
            <Spinner />
            </>
         }

      </div>
   )
}

export default ProductPage