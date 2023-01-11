import { useState, useEffect } from 'react'
import classes from './MainPageProducts.module.css'

import { mountProducts } from "helpers/functions"
import { ProductType, Tag } from 'common/types'

import Products from 'components/Shared/Products/Products'
import productsData from 'Data/productsData'
import MainPageProductsHeader from './MainPageProductsHeader/MainPageProductsHeader'


const MainPageProducts = () => {
   const [tag, setTag] = useState<Tag>('all-products')
   const [products, setProducts] = useState<ProductType[]>([])
   const [pageLimit, setPageLimit] = useState(8)

   useEffect(() => {
      if (window.matchMedia('(max-width: 480px)').matches) {
         setPageLimit(4)
      } else if (window.matchMedia('(max-width: 768px)').matches) {
         setPageLimit(6)
      } else if (window.matchMedia('(max-width: 1200px)').matches) {
         setPageLimit(9)
      }
   }, [pageLimit])

   useEffect(() => {
      const filterObj = {
         tag,
         category: 'all'
      } as const

      const mountedProducts = mountProducts(productsData, filterObj)
      setProducts(mountedProducts)
   }, [tag])


   return (
      <div className={classes.Session_container}>
         <h1>FEATURED PRODUCTS</h1>
         <p>Select a category using special switches or go to the section with a convenient filter by product</p>
         <MainPageProductsHeader 
            setTagCB={(tag: Tag) => setTag(tag)}
         />
         <Products
            productsProps={products}
            pageLimit={pageLimit}
         />
      </div>
   )
}

export default MainPageProducts