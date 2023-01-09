import classes from './LoadMoreProducts.module.css'

import useSetPageTop from 'hooks/useSetPageTop'

import { ProductType, GalleryQty } from 'common/types'


type Props = {
   products: ProductType[]
   count: number
   pageLimit: number
   setProductsPageHandler: (action: GalleryQty) => void
}

const LoadMoreProducts = (props: Props) => {
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