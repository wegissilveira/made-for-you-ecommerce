import { useState, useRef, useEffect } from 'react'
import classes from './Products.module.scss'

import { useParams } from 'react-router-dom'

import { ProductType, SearchParams, SearchTerms } from 'common/types'

import productsData from 'Data/productsData'
import LoadMoreProducts from './LoadMoreProducts/LoadMoreProducts'
import ProductsGallery from './ProductsGallery/ProductsGallery'
import CategoryHeader from './CategoryHeader/CategoryHeader'


type Props = {
   productsProps: ProductType[]
   pageLimit?: number
}

const Products = (props: Props) => {
   const {
      productsProps,
      pageLimit = 8
   } = props
   
   const [productsState, setProductsState] = useState<ProductType[]>([])
   const [pageLimitState, setPageLimitState] = useState(0)
   const [galleryClass, setGalleryClass] = useState('ProductsContainer')
   const [count, setCount] = useState(0)

   const productsSubContainerRef = useRef<HTMLDivElement>(null)
   const params = useParams<SearchParams>()

   const mountProducts = (urlArg: SearchTerms.SEARCH_KEY | SearchTerms.CAT) => {
      const currentProducts = [...productsData]
      let products: ProductType[] = []
      const productsId: string[] = []
      const key = new RegExp(params[urlArg], 'gi')
      
      currentProducts.forEach(product => {
         const keys = Object.keys(product) as Exclude<keyof ProductType, 'imgsDemo'| 'img' | 'deal'>[]
         keys.forEach(k => {
               if (product[k]?.toString().match(key) && !productsId.includes(product._id)) {
                  products.push(product)
                  productsId.push(product._id)
               }
         })
      })

      setProductsState(products)
   }

   const setPageProductsQtyHandler = (newCount: number) => {
      setCount(newCount)
   } 

   useEffect(() => {
      if (params.searchKey) mountProducts(SearchTerms.SEARCH_KEY)
      if (params.cat) mountProducts(SearchTerms.CAT)
   }, [params.searchKey])

   useEffect(() => {
      setPageLimitState(pageLimit)
      setCount(pageLimit)
   }, [pageLimit])

   useEffect(() => {
      const pathname = window.location.pathname
      pathname === '/shop/' && setGalleryClass('ProductsContainer-shop')
   }, [])


   return (
      <div
         className={classes[galleryClass]}
         id="gallery-container"
      >
         <CategoryHeader />
         <ProductsGallery 
            products={productsProps || productsState}
            count={count}
            ref={productsSubContainerRef}
         />
         <LoadMoreProducts 
            products={productsProps || productsState}
            count={count}
            pageLimit={pageLimitState}
            setProductsPageCount={setPageProductsQtyHandler}
            galleryEl={productsSubContainerRef}
         />
      </div>
   )
}

export default Products