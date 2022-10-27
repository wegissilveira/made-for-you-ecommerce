import React from 'react'

import classes from './LoadMoreProducts.module.css'

const LoadMoreProducts = (props) => {
   const {
      products,
      count,
      pageLimit,
      setProductsPageHandlerCB
   } = props

   return (
      <div className={classes.Products_show_container}>
         <div className={classes.Products_show_subContainer}>
            <div>
               <button
                  disabled={count >= products.length}
                  type="button"
                  onClick={() => setProductsPageHandlerCB('more')}
               > SHOW MORE
               </button>
            </div>
         </div>
         <div className={classes.Products_show_subContainer}>
            <div>
               <button
                  disabled={count <= pageLimit || products.length <= pageLimit}
                  type="button"
                  onClick={() => setProductsPageHandlerCB('less')}
               > SHOW LESS
               </button>
            </div>
         </div>
      </div>
   )
}

export default LoadMoreProducts