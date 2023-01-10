import { useState, useRef, useEffect } from 'react'
import classes from './Products.module.css'

import { useParams } from 'react-router-dom'

import { ProductType, GalleryQty, SearchParams, SearchTerms } from 'common/types'

import productsData from 'Data/productsData'
import LoadMoreProducts from './LoadMoreProducts/LoadMoreProducts'
import ProductsGallery from './ProductsGallery/ProductsGallery'
import CategoryHeader from './CategoryHeader/CategoryHeader'


type Props = {
   productsProps: ProductType[]
   containerHeightFN?: (cHeight?: number, fHeight?: number, open?: boolean, addRow?: [GalleryQty, number]) => void
   pageLimit?: number
}

const _ = undefined
const Products = (props: Props) => {
   const {
      productsProps,
      containerHeightFN, // Função recebida de 'Filter' que seta a altura do filtro. Usado para setar a altura dinamicamente em caso do filtro estar aberto ou fechado
      pageLimit = 8
   } = props
   
   const [productsState, setProductsState] = useState<ProductType[]>([])
   const [pageLimitState, setPageLimit] = useState(0)
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

   const setGalleryHeightHandler = (action: GalleryQty) => {
      const containerEl = document.getElementById('gallery-container') as HTMLDivElement
      const productCardStyle = window.getComputedStyle(containerEl.children[0].children[0])
      const productCardHeight = parseInt((productCardStyle.height).match(/\d+/)![0])
      const productCardMarginTop = parseInt((productCardStyle.marginTop).match(/\d+/)![0])
      const productCardFullHeight = productCardHeight + productCardMarginTop

      if (containerHeightFN) {
         containerHeightFN(_, _, _, [action, productCardFullHeight + 20])
      }
   }

   const setPageProductsQtyHandler = (action: GalleryQty, subContainer: React.RefObject<HTMLDivElement>) => {  
      const subContainerEl = subContainer.current

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
   
         setCount(newCount)
         setGalleryHeightHandler(action)
      }
   }

   useEffect(() => {
      if (params.searchKey) mountProducts(SearchTerms.SEARCH_KEY)
      if (params.cat) mountProducts(SearchTerms.CAT)
   }, [params.searchKey])

   useEffect(() => {
      setPageLimit(pageLimit)
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
            productsSubContainerRef={productsSubContainerRef}
         />
         <LoadMoreProducts 
            products={productsProps || productsState}
            count={count}
            pageLimit={pageLimitState}
            setProductsPageHandler={(action: GalleryQty) => setPageProductsQtyHandler(action, productsSubContainerRef)}
         />
      </div>
   )
}

export default Products