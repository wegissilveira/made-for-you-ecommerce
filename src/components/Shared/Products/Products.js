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

   const [count, setCount] = useState(0)
   const [pageLimit, setPageLimit] = useState(0)
   const [top, setTop] = useState()

   const productsContainerRef = useRef()
   const productsSubContainerRef = useRef()

   const setProductsPageHandler = arg => {
      const containerEl = productsContainerRef.current
      const subContainerEl = productsSubContainerRef.current

      let containerBottom
      if (props.containerHeight) {
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
      if (props.containerHeight) {
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
      if (props.isFilterOpen) {
         if (props.isFilterOpen[0]) {
            windowTop = windowTop + props.isFilterOpen[1]
         }
      }

      window.scrollTo({ top: windowTop, left: 0, behavior: 'smooth' })
      setTop(containerBottom)
      setCount(newCount)

      const _ = undefined
      if (props.containerHeight) {
         props.containerHeight(_, _, _, [arg, productCardFullHeight + 20])
      }
   }

   let tag
   let category
   if (props.tag && props.category) {
      tag = props.tag
      category = props.category
   } else if (props.match) {
      tag = 'all-products'
      category = props.match.params.cat
   } else if (props.tag) {
      tag = props.tag
      category = 'all'
   } else if (props.category) {
      tag = 'all-products'
      category = props.category
   } else {
      tag = 'all-products'
      category = 'all'
   }

   let products = []
   let productsId = []
   if (props.match && props.match.params.searchKey) {
      let searchKey = new RegExp(props.match.params.searchKey, 'gi')

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

      category = 'all'

   } else {

      if (props.wishlist) {
         products = productsData.filter(product => props.wish.includes(product._id))

      } else {

         if (tag === 'all-products' && category === 'all') {
            products = productsData

         } else if (tag === 'all-products' && category !== 'all') {
            products = productsData.filter(item => item.category === category)

         } else if (tag !== 'all-products' && category === 'all') {
            products = productsData.filter(item => item.tag === tag)

         } else if (tag !== 'all-products' && category !== 'all') {
            products = productsData.filter(item => item.tag === tag)
            products = products.filter(item => item.category === category)

         }
      }

      if (props.valueRange) {
         products = products.filter(product =>
            parseFloat(product.price) >= props.valueRange[0] && parseFloat(product.price) <= props.valueRange[1]
         )
      }

      if (props.productColor && props.productColor !== '') {
         products = products.filter(product =>
            product.colors.includes(props.productColor)
         )
      }

      if (props.offer && props.offer.length > 0) {
         products = products.filter(product =>
            props.offer.includes(product.offer))
      }

      if (props.order) {
         if (props.order === 'low-high') {
            products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
         } else if (props.order === 'high-low') {
            products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
         } else if (props.order === 'alphabetical') {
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
      if (props.pageLimit === undefined) {
         setPageLimit(8)
         setCount(8)
      } else {
         setPageLimit(props.pageLimit)
         setCount(props.pageLimit)
      }

   }, [props.pageLimit])

   console.log('PROPS: ', props)

   return (
      <div
         ref={productsContainerRef}
         className={products_container}
      >
         {/* ANALISAR ALÉM DAS PROPS COMUNS, A MELHOR MANEIRA DE PASSAR O HISTORY DO ROUTER PARA ESTE CHILDREN NA RESPECTIVA ETAPA - ELE NÃO ESTÁ RECEBENDO ROUTER NO APP.JS */}
         <CategoryHeader 
            category={category} 
            match={props.match}  
         />
         <ProductsGallery 
            products={products}
            count={count}
            tag={tag}
            category={category}
            productsSubContainerRef={productsSubContainerRef}
         />
         <LoadMoreProducts 
            products={products}
            count={count}
            pageLimit={pageLimit}
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