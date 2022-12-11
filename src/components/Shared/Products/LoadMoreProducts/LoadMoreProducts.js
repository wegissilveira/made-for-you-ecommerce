import React from 'react'
import classes from './LoadMoreProducts.module.css'

import useSetPageTop from 'hooks/useSetPageTop'


const LoadMoreProducts = (props) => {
   const {
      products,
      count,
      pageLimit,
      setProductsPageHandler
   } = props

   useSetPageTop(count)


   return (
      <div className={classes.Products_show_container}>
         <div className={classes.Products_show_subContainer}>
            <div>
               <button
                  disabled={count >= products.length}
                  type="button"
                  onClick={() => setProductsPageHandler('more')}
               > SHOW MORE
               </button>
            </div>
         </div>
         <div className={classes.Products_show_subContainer}>
            <div>
               <button
                  disabled={count <= pageLimit || products.length <= pageLimit}
                  type="button"
                  onClick={() => setProductsPageHandler('less')}
               > SHOW LESS
               </button>
            </div>
         </div>
      </div>
   )
}

export default LoadMoreProducts