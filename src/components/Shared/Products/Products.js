import React, { useState, useRef, useEffect } from 'react'

import classes from './Products.module.css'

import { connect } from 'react-redux'

import * as actionTypes from 'store/actions/actionTypes'

import productsData from 'Data/productsData'
import wishlistDataFn from 'Data/wishlistData'
import LoadMoreProducts from './LoadMoreProducts/LoadMoreProducts'
import ProductsGallery from './ProductsGallery/ProductsGallery'
import CategoryHeader from './CategoryHeader/CategoryHeader'


const Products = props => {
   const {
      containerHeight,
      isFilterOpen,
      tag,
      category,
      match,
      wishlist,
      wish,
      valueRange,
      productColor,
      offer,
      order,
      pageLimit
   } = props

   const [count, setCount] = useState(0)
   const [pageLimitState, setPageLimit] = useState(0)
   const [top, setTop] = useState()

   const productsContainerRef = useRef()
   const productsSubContainerRef = useRef()

   const setProductsPageHandler = arg => {
      const containerEl = productsContainerRef.current
      const subContainerEl = productsSubContainerRef.current

      let containerBottom
      if (containerHeight) {
         containerBottom = containerEl.offsetHeight
      } else {
         containerBottom = containerEl.offsetTop + containerEl.offsetHeight
      }

      const productCardStyle = window.getComputedStyle(containerEl.children[0].children[0])
      const productCardHeight = parseInt((productCardStyle.height).match(/\d+/)[0])
      const productCardMarginTop = parseInt((productCardStyle.marginTop).match(/\d+/)[0])
      const productCardFullHeight = productCardHeight + productCardMarginTop

      let newCount
      const subContainerWidth = Number((window.getComputedStyle(subContainerEl).inlineSize).replace(/[^0-9.]+/g, ""))
      const productCardWidth = Number((window.getComputedStyle(subContainerEl.children[0]).inlineSize).replace(/[^0-9.]+/g, ""))
      const itemsPerRow = Math.floor(subContainerWidth / productCardWidth)

      if (arg === 'more') {
         newCount = count + itemsPerRow
      } else {
         containerBottom = top - productCardFullHeight
         newCount = count - itemsPerRow
      }

      let btnBottom
      if (containerHeight) {
         btnBottom = 290

         if (window.screen.width >= 768 && window.screen.width <= 1365) {
            btnBottom = 210
         } else if (window.screen.width >= 1366 && window.screen.width <= 1599) {
            btnBottom = -70
         } else if (window.screen.width <= 360) {
            btnBottom = 0
         }

      } else {
         btnBottom = 560

         if (window.screen.width >= 1366 && window.screen.width <= 1599) {
            btnBottom = 200
         } else if (window.screen.width <= 360) {
            btnBottom = 300
         }
      }

      let windowTop = containerBottom - btnBottom
      if (isFilterOpen) {
         if (isFilterOpen[0]) {
            windowTop = windowTop + isFilterOpen[1]
         }
      }

      window.scrollTo({ top: windowTop, left: 0, behavior: 'smooth' })
      setTop(containerBottom)
      setCount(newCount)

      const _ = undefined
      if (containerHeight) {
         props.containerHeight(_, _, _, [arg, productCardFullHeight + 20])
      }
   }

   let tagVar
   let categoryVar
   if (tag && category) {
      tagVar = tag
      categoryVar = category
   } else if (match) {
      tagVar = 'all-products'
      categoryVar = match.params.cat
   } else if (tag) {
      tagVar = tag
      categoryVar = 'all'
   } else if (category) {
      tagVar = 'all-products'
      categoryVar = category
   } else {
      tagVar = 'all-products'
      categoryVar = 'all'
   }

   let products = []
   let productsId = []
   if (match && match.params.searchKey) {
      let searchKey = new RegExp(match.params.searchKey, 'gi')

      productsData.forEach(product => {
         for (let i in product) {
            if (i !== 'imgsDemo' && i !== 'img' && i !== 'deal') {
               if (product[i].toString().match(searchKey) && !productsId.includes(product._id)) {
                  products.push(product)
                  productsId.push(product._id)
               }
            }
         }
      })

      categoryVar = 'all'

   } else {

      if (wishlist) {
         products = productsData.filter(product => wish.includes(product._id))

      } else {

         if (tagVar === 'all-products' && categoryVar === 'all') {
            products = productsData

         } else if (tagVar === 'all-products' && categoryVar !== 'all') {
            products = productsData.filter(item => item.category === categoryVar)

         } else if (tagVar !== 'all-products' && categoryVar === 'all') {
            products = productsData.filter(item => item.tag === tagVar)

         } else if (tagVar !== 'all-products' && categoryVar !== 'all') {
            products = productsData.filter(item => item.tag === tagVar)
            products = products.filter(item => item.category === categoryVar)

         }
      }

      if (valueRange) {
         products = products.filter(product =>
            parseFloat(product.price) >= valueRange[0] && parseFloat(product.price) <= valueRange[1]
         )
      }

      if (productColor && productColor !== '') {
         products = products.filter(product =>
            product.colors.includes(productColor)
         )
      }

      if (offer && offer.length > 0) {
         products = products.filter(product =>
            offer.includes(product.offer))
      }

      if (order) {
         if (order === 'low-high') {
            products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
         } else if (order === 'high-low') {
            products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
         } else if (order === 'alphabetical') {
            products.sort((a, b) => a.name.localeCompare(
               b.name,
               undefined,
               { numeric: true, sensitivity: 'base' }
            ))
         }
      }
   }

   const url_string = window.location.href
   const url = new URL(url_string);

   const products_container =
      url.pathname === '/shop/' ?
         { width: '100%', margin: '0' } :
         classes.Products_container

   useEffect(() => {
      if (pageLimit === undefined) {
         setPageLimit(8)
         setCount(8)
      } else {
         setPageLimit(pageLimit)
         setCount(pageLimit)
      }

   }, [pageLimit])


   return (
      <div
         ref={productsContainerRef}
         className={products_container}
      >
         <CategoryHeader 
            category={categoryVar} 
         />
         <ProductsGallery 
            products={products}
            count={count}
            tag={tagVar}
            category={categoryVar}
            productsSubContainerRef={productsSubContainerRef}
         />
         <LoadMoreProducts 
            products={products}
            count={count}
            pageLimit={pageLimitState}
            setProductsPageHandlerCB={(action) => setProductsPageHandler(action)}
         />
      </div>
   )
}

const mapStateToProps = state => {
   return {
      wish: state.wishlistState
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onWishlistState: () => dispatch({ type: actionTypes.WISHLIST, value: wishlistDataFn() })
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products)