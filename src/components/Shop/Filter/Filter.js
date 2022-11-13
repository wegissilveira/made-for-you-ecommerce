import React, { useState, useEffect, useRef, useReducer } from 'react'
import classes from './Filter.module.css'

import useCallResizeWarning from 'hooks/useCallResizeWarning'

import filterReducer from './context/filterReducer'
import { initialFilter } from './helpers/values'

import { 
   setTag,
   setCategory,
   setColor,
   setOffer,
   setOrder,
   setPrice,
   resetFilter
} from './context/action-creators'

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


// Considerando transformar a lógica de state do Filter em um contexto
// Posso usar o mesmo reducer que já criei, mas transformando a filterReducerState em uma state global
// Isso permitirá a remoção de várias das funções que estão sendo usadas aqui simplesmente como callback
// O que por consequência fará com que muitas das props deixem de existir
// O contexto será restrito a filters, já que que todos os filtros convertem em Filter, que envia filterReducerState para o componente products
const Filter = () => {
   const [pageLimit, setPageLimit] = useState(12)
   const [filterOpen, setFilterOpen] = useState(false)
   const [translateValueState, setTranslateValue] = useState()

   const [filterReducerState, dispatch] = useReducer(filterReducer, initialFilter)

   const containerRef = useRef()
   const filterRef = useRef()
   const sliderRef = useRef()
   const categoriesRef = useRef()
   const typesRef = useRef()
   const offerRef = useRef()
   const selectRef = useRef()

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

   const setPriceRange = values => {
      const priceRange = {
         minValue: values[0],
         maxValue: values[1]
      }
      dispatch(setPrice(priceRange))
   }

   const selectColorHandler = color => {
      const colorInput = document.getElementById('all-colors-input')

      const colorObj = {
         currentColor: color,
         lastSelectedColor: color
      }

      dispatch(setColor(colorObj))

      colorInput.checked = false
   }

   const lastSelectedColorHandler = (e) => {
      const isAllColorsChecked = e.target.checked
      const checked = {
         currentColor: isAllColorsChecked ? '' : filterReducerState.color.lastSelectedColor,
         lastSelectedColor: filterReducerState.color.lastSelectedColor
      }
      
      dispatch(setColor(checked))
   }

   const setProductTypeHandler = (e, block, arg) => {
      block === 'cat' ? dispatch(setCategory(arg)) : dispatch(setTag(arg))

      let elementsArr = Array.from(e.target.parentNode.children)
      elementsArr.forEach((element, i) => {
         if (i !== 0) element.className = classes.Not_Selected
      })

      e.target.className = classes.Selected
   }

   const setOfferHandler = e => {
      let inputValuesArr = [...filterReducerState.offer]
      const input = e.target

      if (input.checked) {
         inputValuesArr.push(input.value)
      } else {
         inputValuesArr = inputValuesArr.filter(value => value !== input.value)
      }
      
      dispatch(setOffer(inputValuesArr))
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
 
      dispatch(resetFilter()) 
      
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
               setOrderCB={(value) => dispatch(setOrder(value))}
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
                     setOfferCB={e => setOfferHandler(e)}
                     lastSelectedColorHandlerCB={lastSelectedColorHandler}
                     selectColorHandlerCB={selectColorHandler}
                     setPriceRangeCB={setPriceRange}
                     setProductTypeHandlerCB={(e, type, value) => setProductTypeHandler(e, type, value)}
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