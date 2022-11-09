import React, { useState, useRef, useEffect } from 'react'

import classes from './Products.module.css'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actionTypes from 'store/actions/actionTypes'

import useSetPageTop from 'hooks/useSetPageTop'

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
      isFilterOn,
      isFilterTagOn,
      pageLimit = 8
   } = props
   
   const [productsState, setProductsState] = useState([])
   const [pageLimitState, setPageLimit] = useState(0)
   const [galleryClass, setGalleryClass] = useState('ProductsContainer')

   const initialRender = useRef(true)
   const productsContainerRef = useRef()
   const productsSubContainerRef = useRef()

   const { setProductsPageHandler, setCount, count } = useSetPageTop()

   const pathname = history.location.pathname

   let tagVar = 'all-products'
   let categoryVar = 'all'  
   const mountProducts = (productsFiltered) => {
      // Bloco que determina os valores das variáveis 'tagVar' e 'categoryVar'
      // São tais variáveis que servem como referência para definir quais produtos serão inseridos em cada respectiva galeria
      if (tag && category) {
         tagVar = tag
         categoryVar = category
      } else if (tag) {
         tagVar = tag
      } else if (match.params.cat) {
         categoryVar = match.params.cat
      } 
      
      // Bloco responsável por montar a galeria de produtos em cada respectiva situação - possui utilidade somente em Shop
      const currentProducts = isFilterOn ? (productsFiltered ? [...productsFiltered] : mountFilters(true) ) : [...productsData]

      let products = []
      const productsId = []
      // Se for busca
      if (match.params.searchKey) {
         let searchKey = new RegExp(match.params.searchKey, 'gi')
         
         currentProducts.forEach(product => {
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

      // Se for diferente de busca
      // Home, Shop, Wishlist
      } else {
         // Wishlist
         if (pathname.match('wishlist')) {
            products = currentProducts.filter(product => wish.includes(product._id))
         } else {
            switch(true) {
               case (tagVar === 'all-products' && categoryVar === 'all') :
                  products = currentProducts
                  break
               case (tagVar === 'all-products' && categoryVar !== 'all') :
                  products = currentProducts.filter(item => item.category === categoryVar)
                  break
               case (tagVar !== 'all-products' && categoryVar === 'all') :
                  products = currentProducts.filter(item => item.tag === tagVar)
                  break
               case (tagVar !== 'all-products' && categoryVar !== 'all') :
                  products = currentProducts.filter(item => item.tag === tagVar)
                  products = products.filter(item => item.category === categoryVar)
                  break
               default:
            }            
         }
      }
      console.log('PRODUCTS TAG/CAT: ', products);
      setProductsState(products)
   }

   const mountFilters = (sendBackForMounting) => {
      const currentProducts = [...productsData]
      let products
      // => Filtros (só existem em Shop)
      // Valor
      if (valueRange) {
         products = currentProducts.filter(product =>
            parseFloat(product.price) >= valueRange[0] && parseFloat(product.price) <= valueRange[1]
         )
      }

      // Cor
      if (productColor && productColor !== '') {
         products = products.filter(product =>
            product.colors.includes(productColor)
         )
      }

      // Tipo de oferta
      if (offer && offer.length > 0) {
         products = products.filter(product =>
            offer.includes(product.offer))
      }

      // Ordenação
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

      console.log('PRODUCTS FILTER: ', products);

      if(sendBackForMounting) return products
      
      if (isFilterTagOn) {
         mountProducts(products)
      } else {
         setProductsState(products)
      }
   } 

   useEffect(() => {
      mountProducts()
   }, [tag, category])

   useEffect(() => {
      if(initialRender.current) {
         initialRender.current = false
      } else {
         mountFilters()
      }
   }, [JSON.stringify(valueRange), productColor, JSON.stringify(offer), order])

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
            products={productsState}
            count={count}
            tag={tagVar}
            category={categoryVar}
            productsSubContainerRef={productsSubContainerRef}
         />
         <LoadMoreProducts 
            products={productsState}
            count={count}
            pageLimit={pageLimitState}
            setProductsPageHandlerCB={(action) => setProductsPageHandler(action, productsContainerRef, productsSubContainerRef, containerHeight, isFilterOpen)}
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