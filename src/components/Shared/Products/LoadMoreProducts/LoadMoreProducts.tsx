import classes from './LoadMoreProducts.module.css'

import useSetPageTop from 'hooks/useSetPageTop'

import { ProductType, GalleryQty } from 'common/types'


type Props = {
   products: ProductType[]
   count: number
   pageLimit: number
   setProductsPageCount: (newCount: number) => void
   galleryEl: React.RefObject<HTMLDivElement>
}

const LoadMoreProducts = (props: Props) => {
   const {
      products,
      count,
      pageLimit,
      setProductsPageCount,
      galleryEl
   } = props

   useSetPageTop(count)

   const setProductsPageHandler = (action: GalleryQty) => {  
      const subContainerEl = galleryEl.current

      if (subContainerEl) {
         const subContainerWidth = Number((window.getComputedStyle(subContainerEl).inlineSize).replace(/[^0-9.]+/g, ""))
         const productCardWidth = Number((window.getComputedStyle(subContainerEl.children[0]).inlineSize).replace(/[^0-9.]+/g, ""))
         const itemsPerRow = Math.floor(subContainerWidth / productCardWidth)
   
         let newCount
         if (action === 'more') {
            newCount = count + itemsPerRow
         } else {
            newCount = count - itemsPerRow
         }
   
         setProductsPageCount(newCount)
      }
   }


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