import React, { useState, useEffect, useRef, useReducer } from 'react'

import classes from './Filter.module.css'

import productsData from 'Data/productsData'
import { mountProducts, mountFilters } from 'helpers/functions'

import Toastify from 'components/Shared/UI/Toastify/Toastify'
import Products from 'components/Shared/Products/Products'
import FilterHeader from './FilterHeader/FilterHeader'
import FilterBottom from './FilterBottom/FilterBottom'
import FilterBody from './FilterBody/FilterBody'


const initial_min_value = 5 // => Valor inicial do preço mínimo
const initial_max_value = 1290 // => Valor inicial do preço máximo

const _ = undefined

const toastifyMsg = [
   'Reload The Page',
   'In order for all components to adjust to the new screen dimensions, the page should be reloaded.'
]

const initialFilter = {
   productsState: productsData,
   tag: 'all-products',
   category: 'all',
   color:  {
      currentColor: '',
      lastSelectedColor: ''
   },
   offer: [],
   order: 'default',
   priceRange: {
      minValue: initial_min_value,
      maxValue: initial_max_value
   },
   isFilterOn: false,
   isFilterTagOn: false
}

// Próxima etapa é tentar montar a lista de produtos aqui e já enviar pronta para 'Products' como props
const filterReducer = (state, action) => {
   switch (action.type) {
      case 'setTag':
         return {
            ...state,
            tag: action.tag,
            productsState: mountProducts(productsData, action.tag, state.category, state.isFilterOn, state),
            isFilterTagOn: true
         }
      case 'setCategory':
         return {
            ...state,
            category: action.category,
            productsState: mountProducts(productsData, state.tag, action.category, state.isFilterOn, state),
            isFilterTagOn: true
         }
      case 'setColor':
         return {
            ...state,
            color: action.color,
            // productsState: mountFilters(
            //    productsData, 
            //    state.priceRange, 
            //    action.color.currentColor,
            //    state.offer,
            //    state.order,
            //    state.isFilterTagOn,
            // ),
            productsState: mountFilters(productsData, state),
            isFilterOn: true
         }
      case 'setOffer':
         return {
            ...state,
            offer: action.offer,
            productsState: mountFilters(
               productsData, 
               state.priceRange, 
               state.color.currentColor,
               action.offer,
               state.order,
               state.isFilterTagOn,
            ),
            isFilterOn: true
         }
      case 'setOrder':
         return {
            ...state,
            order: action.order,
            productsState: mountFilters(
               productsData, 
               state.priceRange, 
               state.color.currentColor,
               state.offer,
               action.order,
               state.isFilterTagOn,
            ),
            isFilterOn: true
         }
      case 'setPrice':
         return {
            ...state,
            priceRange: action.priceRange,
            productsState: mountFilters(
               productsData, 
               action.priceRange, 
               state.color.currentColor,
               state.offer,
               state.order,
               state.isFilterTagOn,
            ),
            isFilterOn: true
         }
      case 'resetFilter':
         return {
            tag: 'all-products',
            category: 'all',
            color: {
               currentColor: '',
               lastSelectedColor: ''
            },
            offer: [],
            order: 'default',
            priceRange: {
               minValue: initial_min_value,
               maxValue: initial_max_value
            },
            productsState: productsData,
            isFilterOn: false,
            isFilterTagOn: false
         }
      default:
         return state
   }
}


const Filter = props => {
   const {
      products
   } = props

   const [pageLimit, setPageLimit] = useState(12)
   const [filter_height, setFilterHeight] = useState()
   const [containerHeight, setContainerHeight] = useState()
   const [filterOpen, setFilterOpen] = useState(false)
   const [translateValue, setTranslateValue] = useState()
   const [resize, setResize] = useState(true)

   const [isFilterOn, setIsFilterOn] = useState(false)
   const [isFilterTagOn, setIsFilterTagOn] = useState(false)
   /* */

   const [openToastify, setOpenToastify] = useState(false)

   const [filterReducerState, dispatch] = useReducer(filterReducer, initialFilter)

   const containerRef = useRef()
   const filterRef = useRef()
   const sliderRef = useRef()
   const categoriesRef = useRef()
   const typesRef = useRef()
   const offerRef = useRef()
   const selectRef = useRef()

   // console.log('productsState: ', filterReducerState.productsState);

   const translateFilter = {
      transform: `translateY(${translateValue}px)`,
      transition: '.8s ease-in-out'
   }

   const containerStyle = {
      height: containerHeight + 'px'
   }

   const containerHeightHandler = (cHeight = containerHeight, fHeight = filter_height, open = filterOpen, addRow) => {
      let height
      if (addRow) {
         height = addRow[0] === 'more' ? containerHeight + addRow[1] : containerHeight - addRow[1]
      } else {
         height = open ? containerHeight + fHeight : cHeight - fHeight
      }

      setContainerHeight(height)
   }

   const openFilterHandler = () => {
      const open = filterOpen ? false : true
      const translate = translateValue < 0 ? 0 : -filter_height

      setFilterOpen(open)
      setTranslateValue(translate)
      containerHeightHandler(_, _, open)
   }

   const setPriceRange = values => {
      dispatch({type: 'setPrice', priceRange: {
         minValue: values[0],
         maxValue: values[1]
      }})
      setIsFilterOn(true)
   }

   const selectColorHandler = color => {
      const colorInput = document.getElementById('all-colors-input')

      dispatch({type: 'setColor', color: {
         currentColor: color,
         lastSelectedColor: color
      }})

      colorInput.checked = false
      setIsFilterOn(true)
   }

   const lastSelectedColorHandler = (e) => {
      const isAllColorsChecked = e.target.checked
      const checked = {
         currentColor: isAllColorsChecked ? '' : filterReducerState.color.lastSelectedColor,
         lastSelectedColor: filterReducerState.color.lastSelectedColor
      }
      dispatch({type: 'setColor', color: checked})
      setIsFilterOn(true)
   }

   const setProductTypeHandler = (e, block, arg) => {
      block === 'cat' ? dispatch({type: 'setCategory', category: arg}) : dispatch({type: 'setTag', tag: arg})

      let elementsArr = Array.from(e.target.parentNode.children)
      elementsArr.forEach((element, i) => {
         if (i !== 0) element.className = classes.Not_Selected
      })

      e.target.className = classes.Selected
      setIsFilterTagOn(true)
   }

   const setOfferHandler = e => {
      let inputValuesArr = [...filterReducerState.offer]
      const input = e.target

      if (input.checked) {
         inputValuesArr.push(input.value)
      } else {
         inputValuesArr = inputValuesArr.filter(value => value !== input.value)
      }
      
      dispatch({type: 'setOffer', offer: inputValuesArr})
      setIsFilterOn(true)
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

      dispatch({type: 'resetFilter'}) 
      
      sliderRef.current.resetPriceSlider()

      setIsFilterOn(false)
      setIsFilterTagOn(false)
      colorInput.checked = false
   }

   const callResizeAlert = () => {// alert('Atualize a página para que todos os componentes se ajustem às novas dimensões. Essa mensagem não aparecerá novamente nesta sessão.')
      setOpenToastify(true)
      setTimeout(() => {
         setOpenToastify(false)
      }, 8000)
      setResize(false)
      sessionStorage.setItem('warned', true)
   }

   const reportWindowSize = () => {
      const fHeight = filterRef.current.offsetHeight

      setTranslateValue(-fHeight)
      setFilterHeight(fHeight)

      setTimeout(() => {
         const containerHeight = containerRef.current.offsetHeight
         containerHeightHandler(containerHeight, fHeight)
      }, 30)
   }

   const observer = useRef(
      new ResizeObserver(() => {
         const windowWidth = window.innerWidth
         const loadWidth = sessionStorage.getItem('windowWidth')
         const rendered = sessionStorage.getItem('rendered')

         if (rendered && windowWidth != loadWidth) {
            callResizeAlert()
         }
      })
   )

   useEffect(() => {
      reportWindowSize()
   }, [])

   useEffect(() => {
      sessionStorage.removeItem('rendered')
      const loadWidth = window.innerWidth

      setTimeout(() => {
         sessionStorage.setItem('rendered', true)
         sessionStorage.setItem('windowWidth', loadWidth)
      }, 1000)
   }, [])

   useEffect(() => {
      const warned = sessionStorage.getItem('warned')
      if (warned) {
         setResize(false)
      }
   }, [])

   useEffect(() => {
      if (containerRef.current) {
         const body = document.getElementsByTagName('BODY')[0]
         if (resize) {
            observer.current.observe(body)
         } else {
            observer.current.unobserve(body)
         }
      }
   })

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
               setOrderCB={(value) => dispatch({type: 'setOrder', order: value})}
            />
            <div style={translateFilter}>
               <div
                  className={classes.Filter_subContainer}
                  ref={filterRef}
               >
                  <FilterBody 
                     products={products}
                     categoriesRef={categoriesRef}
                     typesRef={typesRef}
                     offerRef={offerRef}
                     sliderRef={sliderRef}
                     minValue={initial_min_value}
                     maxValue={initial_max_value}
                     setOfferCB={e => setOfferHandler(e)}
                     lastSelectedColorHandlerCB={lastSelectedColorHandler}
                     selectColorHandlerCB={selectColorHandler}
                     setPriceRangeCB={setPriceRange}
                     setProductTypeHandlerCB={(e, type, value) => setProductTypeHandler(e, type, value)}
                  />
                  <FilterBottom cleanFiltersHandlerCB={cleanFiltersHandler} />
               </div>
               <Products
                  // products={products} // => Envia o array com os produtos que serão exibidos
                  pageLimit={pageLimit}  // => Número limite de produtos a serem mostrados inicialmente
                  tag={filterReducerState.tag} // => Tag que determina quais produtos serão mostrados
                  category={filterReducerState.category} // => Categoria dos produtos que serão mostrados
                  valueRange={[filterReducerState.priceRange.minValue, filterReducerState.priceRange.maxValue]} // => Intervalo de preço que determinará os produtos que serão mostrados
                  productColor={filterReducerState.color.currentColor} // => Filtra o produto por cor
                  offer={filterReducerState.offer} // => Filtra os produtos por tipo de oferta
                  order={filterReducerState.order}
                  containerHeight={containerHeightHandler}
                  isFilterOpen={[filterOpen, filter_height]}
                  isFilterOn={isFilterOn}
                  isFilterTagOn={isFilterTagOn}
               />
            </div>
         </div>
      </>
   )
}

export default Filter