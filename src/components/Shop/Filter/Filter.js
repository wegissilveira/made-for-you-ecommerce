import React, { useState, useEffect, useRef, useContext } from 'react'
import classes from './Filter.module.css'

import { FilterDataContext, UpdateProductsListContext } from './context/FilterContext'

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


// Falta configurar a função de limpar filtro dentro do bottom
// Está aqui por ora pon conta das refs
const Filter = () => {
   const [pageLimit, setPageLimit] = useState(12)
   const [filterOpen, setFilterOpen] = useState(false)
   const [translateValueState, setTranslateValue] = useState()

   const { setDefaultValues } = useContext(UpdateProductsListContext)

   const containerRef = useRef()
   const filterRef = useRef()
   const sliderRef = useRef()
   const categoriesRef = useRef()
   const typesRef = useRef()
   const offerRef = useRef()
   const selectRef = useRef()

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

   const cleanFiltersHandler = () => {
      const selectList = Array.from(selectRef.current.children)
      const categoriesList = Array.from(categoriesRef.current.children)
      const typesList = Array.from(typesRef.current.children)
      const offerList = Array.from(offerRef.current.children)
      const colorInput = document.getElementById('all-colors-input')

      selectList.forEach((element, i) => {
         if (i === 0) {
            element.selected = true
         } else {
            element.selected = false
         }
      })

      const resetFilters = (el, i) => {
         if (i !== 0) i === 1 ? el.className = classes.Selected : el.className = classes.Not_Selected
      }

      categoriesList.forEach((element, i) => {
         resetFilters(element, i)
      })

      typesList.forEach((element, i) => {
         resetFilters(element, i)
      })

      offerList.forEach(element => {
         if (element.tagName === 'DIV') {
            Array.from(element.children).forEach(el => {
               if (el.tagName === 'INPUT') {
                  el.checked = false
               }
            })
         }
      })
 
      setDefaultValues()
      
      sliderRef.current.resetPriceSlider()

      colorInput.checked = false
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
         <div className={classes.Filter_container} ref={containerRef} style={containerStyle}>
            <FilterHeader 
               selectRef={selectRef}
               filterOpen={filterOpen}
               openFilterHandlerCB={openFilterHandler}
            />
            <div style={translateFilter}>
               <div
                  className={classes.Filter_subContainer}
                  ref={filterRef}
               >
                  <FilterBody 
                     categoriesRef={categoriesRef}
                     typesRef={typesRef}
                     offerRef={offerRef}
                     sliderRef={sliderRef}
                  />
                  <FilterBottom cleanFiltersHandlerCB={cleanFiltersHandler} />
               </div>
               <Products
                  productsProps={filterReducerState.productsState} // => Envia o array com os produtos que serão exibidos
                  pageLimit={pageLimit}  // => Número limite de produtos a serem mostrados inicialmente
                  containerHeight={containerHeightHandler}
                  isFilterOpen={[filterOpen, filter_height]}
               />
            </div>
         </div>
      </>
   )
}

export default Filter