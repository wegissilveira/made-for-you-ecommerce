import React, { useState, useRef, useEffect } from 'react'

import classes from './Products.module.css'

import { withRouter } from 'react-router-dom'

import useSetPageTop from 'hooks/useSetPageTop'

import productsData from 'Data/productsData'
import LoadMoreProducts from './LoadMoreProducts/LoadMoreProducts'
import ProductsGallery from './ProductsGallery/ProductsGallery'
import CategoryHeader from './CategoryHeader/CategoryHeader'


const Products = props => {
   const {
      productsProps,
      containerHeight, // Função recebida de 'Filter' que seta a altura do filtro. Usado para setar a altura dinamicamente em caso do filtro estar aberto ou fechado
      isFilterOpen, // Complemento da função de cima - identificar exatamente o que faz, mas acredito que altera a altura da janela para subir ou descer e garantir que os botão de load more estejam sempre no bottom da janela.
      tag, // Tag que determina o tipo de produtos que serão mostrados (all products, furniture. decorations, textile)
      category, // Categoria definida pelas abas de categoria na home
      match, // Match params - utilizado para montar as prateleiras baseada na categoria ou no termo de busca. Ambos são inseridos dentro do objeto 'params'  
      history, // Histórico do router - utilizado para identificar a página (rota) atual. sendo utilizado para identificar se o usuário está na 'shop' ou na wishlist, já que isso determina os produtos que serão inseridos na galeria.
      pageLimit = 8
   } = props
   
   const [productsState, setProductsState] = useState([])
   const [pageLimitState, setPageLimit] = useState(0)
   const [galleryClass, setGalleryClass] = useState('ProductsContainer')

   const productsContainerRef = useRef()
   const productsSubContainerRef = useRef()

   const { setProductsPageHandler, setCount, count } = useSetPageTop()

   const pathname = history.location.pathname

   let tagVar = 'all-products'
   let categoryVar = 'all'  

   if (tag && category) {
      tagVar = tag
      categoryVar = category
   } else if (tag) {
      tagVar = tag
   } else if (match.params.cat) {
      categoryVar = match.params.cat
   } 

   // Passar montagem dos produtos para cada respectivo componente, como foi feito com filtro na galeria
   const mountProducts = () => {      
      const currentProducts = [...productsData]

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
      } 
     
      setProductsState(products)
   }

   useEffect(() => {
      mountProducts()
   }, [tag, category])

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
            // Temporário até finalizar o ajuste de productsProps da busca
            products={productsProps || productsState}
            count={count}
            tag={tagVar}
            category={categoryVar}
            productsSubContainerRef={productsSubContainerRef}
         />
         <LoadMoreProducts 
            // Temporário até finalizar o ajuste de productsProps da busca
            products={productsProps || productsState}
            count={count}
            pageLimit={pageLimitState}
            setProductsPageHandlerCB={(action) => setProductsPageHandler(action, productsContainerRef, productsSubContainerRef, containerHeight, isFilterOpen)}
         />
      </div>
   )
}


export default withRouter(Products)