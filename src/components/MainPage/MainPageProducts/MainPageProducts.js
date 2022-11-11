import React, { useState, useEffect } from 'react'

import classes from './MainPageProducts.module.css'

import Products from 'components/Shared/Products/Products'
import productsData from 'Data/productsData'
import MainPageProductsHeader from './MainPageProductsHeader/MainPageProductsHeader'
import MainPageProductsHeaderMobile from './MainPageProductsHeaderMobile/MainPageProductsHeaderMobile'


const MainPageProducts = props => {
   const [tag, setTag] = useState('all-products')
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


   return (
      <div className={classes.Session_container}>
         <h1>FEATURED PRODUCTS</h1>
         <p>Select a category using special switches or go to the section with a convenient filter by product</p>
         <MainPageProductsHeader 
            setTagCB={(tag) => setTag(tag)}
         />
         <MainPageProductsHeaderMobile 
            setTagCB={(tag) => setTag(tag)}
            tag={tag}
         />
         <Products
            productsProps={productsData}
            pageLimit={pageLimit}
            tag={tag}
         />
      </div>
   )
}

export default MainPageProducts