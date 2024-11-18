import { useState, useEffect } from 'react'
import classes from './ProductPage.module.scss'

import useProduct from 'hooks/useProduct'
import { ProductType } from 'common/types'

import ProductInfoComponent from './ProductInfoComponent/ProductInfoComponent'
import ProductSlider from './ProductSlider/ProductSlider'
import Spinner from 'components/Shared/UI/Spinner/Spinner'


const ProductPage = () => {
   const [currentProduct, setCurrentProduct] = useState<ProductType>({} as ProductType)
   const { data, loading } = useProduct()

   useEffect(() => {
      if (data) {
         setCurrentProduct(data.product)
      }
   }, [data])   

   return (
      <div className={classes.Product_page_container}>
         {
            !loading
               ?
                  <>
                     <ProductSlider imgs={currentProduct.imgsDemo} />
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