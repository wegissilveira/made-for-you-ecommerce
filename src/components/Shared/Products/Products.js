import React, { useState, useRef, useEffect } from 'react'

import classes from './Products.module.css'

import { useParams } from 'react-router-dom'

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
      pageLimit = 8
   } = props
   
   const [productsState, setProductsState] = useState([])
   const [pageLimitState, setPageLimit] = useState(0)
   const [galleryClass, setGalleryClass] = useState('ProductsContainer')

   const productsContainerRef = useRef()
   const productsSubContainerRef = useRef()

   const { setProductsPageHandler, setCount, count } = useSetPageTop()
   const params = useParams()

   const mountProducts = (urlArg) => {      
      const currentProducts = [...productsData]

      let products = []
      const productsId = []
      const key = new RegExp(params[urlArg], 'gi')
      
      currentProducts.forEach(product => {
         for (let i in product) {
            if (i !== 'imgsDemo' && i !== 'img' && i !== 'deal') {
               if (product[i].toString().match(key) && !productsId.includes(product._id)) {
                  products.push(product)
                  productsId.push(product._id)
               }
            }
         }
      })

      setProductsState(products)
   }

   useEffect(() => {
      if (params.searchKey) mountProducts('searchKey')
      if (params.cat) mountProducts('cat')
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
         ref={productsContainerRef}
         className={classes[galleryClass]}
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
            setProductsPageHandlerCB={(action) => setProductsPageHandler(action, productsContainerRef, productsSubContainerRef, containerHeight, isFilterOpen)}
         />
      </div>
   )
}

export default Products