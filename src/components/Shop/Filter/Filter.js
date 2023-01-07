import React, { useState, useEffect, useRef, useContext } from 'react'
import classes from './Filter.module.css'

import { FilterDataContext } from './context/FilterContext'

import useCallResizeWarning from 'hooks/useCallResizeWarning'

import Toastify from 'components/Shared/UI/Toastify/Toastify'
import Products from 'components/Shared/Products/Products'
import FilterHeader from './FilterHeader/FilterHeader'
import FilterBottom from './FilterBottom/FilterBottom'
import FilterBody from './FilterBody/FilterBody'


const _ = undefined

const toastifyMsg = [
   'Reload The Page',
   'In order for all components to adjust to the new screen dimensions, the page should be reloaded.'
]

const Filter = () => {
   const [pageLimit, setPageLimit] = useState(12)
   const [filterOpen, setFilterOpen] = useState(false)
   const [translateValueState, setTranslateValue] = useState()

   const containerRef = useRef()
   const filterRef = useRef()

   const filterReducerState = useContext(FilterDataContext)

   const { 
      containerHeightHandler, 
      translateValue,
      filter_height,
      openToastify,
      containerHeight
   } = useCallResizeWarning(filterRef, containerRef, filterOpen)

   const translateFilter = {
      transform: `translateY(${translateValueState}px)`,
      transition: '.8s ease-in-out'
   }

   const containerStyle = {
      height: containerHeight + 'px'
   }
   
   const openFilterHandler = () => {
      const open = filterOpen ? false : true
      const translate = translateValueState < 0 ? 0 : -filter_height

      setFilterOpen(open)
      setTranslateValue(translate)
      containerHeightHandler(_, _, open)
   }

   useEffect(() => {
      setTranslateValue(translateValue)
   }, [translateValue])

   useEffect(() => {
      if (window.matchMedia('(max-width: 480px)').matches) {
         setPageLimit(6)
      } else if (window.matchMedia('(max-width: 768px)').matches) {
         setPageLimit(8)
      }
   }, [])


   return (
      <>
         {/* Analisar se o toastify fica aqui mesmo. Talvez seja melhor movê-lo para um portal */}
         <Toastify
            toastifyDetails={toastifyMsg}
            open={openToastify}
         />
         <div 
            className={classes.Filter_container} 
            ref={containerRef} 
            style={containerStyle}
         >
            <FilterHeader 
               filterOpen={filterOpen}
               openFilterHandlerCB={openFilterHandler}
            />
            <div style={translateFilter}>
               <div
                  className={classes.Filter_subContainer}
                  ref={filterRef}
               >
                  <FilterBody />
                  <FilterBottom/>
               </div>
               <Products
                  productsProps={filterReducerState.productsState} // => Envia o array com os produtos que serão exibidos
                  pageLimit={pageLimit}  // => Número limite de produtos a serem mostrados inicialmente
                  containerHeightFN={containerHeightHandler}
               />
            </div>
         </div>
      </>
   )
}

export default Filter