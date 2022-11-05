import React, { useState, useRef, useEffect } from 'react'

import classes from './Products.module.css'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actionTypes from 'store/actions/actionTypes'

import productsData from 'Data/productsData'
import wishlistDataFn from 'Data/wishlistData'
import LoadMoreProducts from './LoadMoreProducts/LoadMoreProducts'
import ProductsGallery from './ProductsGallery/ProductsGallery'
import CategoryHeader from './CategoryHeader/CategoryHeader'


const Products = props => {
   const {
      containerHeight, // Função recebida de 'Filter' que seta a altura do filtro. Usado para setar a altura dinamicamente em caso do filtro estar aberto ou fechado
      isFilterOpen, // Complemento da função de cima - identificar exatamente o que faz, mas acredito que altera a altura da janela para subir ou descer e garantir que os botão de load more estejam sempre no bottom da janela.
      tag, // Tag que determina o tipo de produtos que serão mostrados (all products, furniture. decorations, textile)
      category, // Categoria definida pelas abas de categoria na home
      match, // Match params - utilizado para montar as prateleiras baseada na categoria ou no termo de busca. Ambos são inseridos dentro do objeto 'params'  
      history, // Histórico do router - utilizado para identificar a página (rota) atual. sendo utilizado para identificar se o usuário está na 'shop' ou na wishlist, já que isso determina os produtos que serão inseridos na galeria.
      wish, // Recebido do redux - Array de ids dos produtos que estão na wishlist. Monta a prateleira com os produtos correspondentes.
      valueRange, // Recebido de Filter para definir a janela de preços dos produtos que serão mostrados. Definido pelo slider de preços
      productColor, // Cor do produto definido no Filter
      offer, // Oferta na qual o produto se encaixa definido no Filter
      order, // Ordem em que os produtos devem ser exibidos
      pageLimit = 8
   } = props
   
   const [count, setCount] = useState(0)
   const [pageLimitState, setPageLimit] = useState(0)
   const [top, setTop] = useState()
   const [galleryClass, setGalleryClass] = useState('ProductsContainer')

   const productsContainerRef = useRef()
   const productsSubContainerRef = useRef()

   const pathname = history.location.pathname

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
   console.log('HISTORY: ', history);
   console.log('MATCH: ', match);
   console.log('*****');
   let tagVar
   let categoryVar
   if (tag && category) {
      tagVar = tag
      categoryVar = category
   } else if (match.params.cat) {
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
      if (pathname.match('wishlist')) {
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

   useEffect(() => {
      setPageLimit(pageLimit)
      setCount(pageLimit)
   }, [pageLimit])

   useEffect(() => {
      pathname === '/shop/' && setGalleryClass('ProductsContainer-shop')
   }, [])


   return (
      <div
         ref={productsContainerRef}
         className={classes[galleryClass]}
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


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Products))