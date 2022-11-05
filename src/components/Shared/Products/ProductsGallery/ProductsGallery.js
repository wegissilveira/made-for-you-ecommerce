import React from "react"

import classes from './ProductsGallery.module.css'

import ProductCard from 'components/Shared/Products/ProductsGallery/ProductCard/ProductCard'


const ProductsGallery = (props) => {
   const {
      products,
      count,
      tag,
      category,
      productsSubContainerRef
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
                  if (tag === 'all-products' || product.tag === tag) {
                     if (category === 'all' || product.category === category) {
                        productsList =
                           <ProductCard
                              key={product + i}
                              product={product}
                              index={i}
                           />
                     }
                  }
               }
               return productsList
            })
         }
         {products.length <= 0 &&
            <h1>{!props.wishlist ? 'YOUR SEARCH DID NOT RETURN ANY PRODUCT' : 'YOUR WISHLIST IS EMPTY'}</h1>
         }
      </div>
   )
}

export default ProductsGallery