import { ForwardedRef, forwardRef } from 'react'
import classes from './ProductsGallery.module.css'
import { ProductType } from 'common/types'

import ProductCard from 'components/Shared/Products/ProductsGallery/ProductCard/ProductCard'


type Props = {
   products: ProductType[]
   count: number
}

const ProductsGallery = forwardRef((props: Props, productsSubContainerRef: ForwardedRef<HTMLDivElement>) => {
   const {
      products,
      count
   } = props

   return (
      <div
         ref={productsSubContainerRef}
         className={classes.Products_subContainer}
      >
         {products.length > 0 &&
            products.map((product, i) => {
               let productsList
               if (i + 1 <= count) {
                  productsList = <ProductCard
                                    key={product + '-' + i}
                                    product={product}
                                 />
               }
               return productsList
            })
         }
         {products.length <= 0 &&
            <h1>{window.location.pathname === '/wishlist/' ? 'YOUR WISHLIST IS EMPTY' : 'YOUR SEARCH DID NOT RETURN ANY PRODUCT'}</h1>
         }
      </div>
   )
})

export default ProductsGallery