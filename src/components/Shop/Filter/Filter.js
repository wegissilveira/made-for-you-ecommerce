import React, { useState, useEffect, useRef } from 'react'

import classes from './Filter.module.css'

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

   /* Slider Price */
   const [min_value, setMinValue] = useState(initial_min_value)
   const [max_value, setMaxValue] = useState(initial_max_value)

   /* Demais filtros */
   const [tag, setTag] = useState('all-products')
   const [category, setCategory] = useState('all')
   const [checkColor, setCheckColor] = useState(true)
   const [productColor, setProductColor] = useState('') // => Armazena cor selecionada do produto
   const [productColorStep, setProductColorStep] = useState('') // => Armazena cor selecionada do produto
   const [offer, setOffer] = useState([])
   const [order, setOrder] = useState('default')
   const [isFilterOn, setIsFilterOn] = useState(false)
   const [isFilterTagOn, setIsFilterTagOn] = useState(false)
   /* */

   const [openToastify, setOpenToastify] = useState(false)

   const containerRef = useRef()
   const filterRef = useRef()
   const sliderRef = useRef()
   const categoriesRef = useRef()
   const typesRef = useRef()
   const offerRef = useRef()
   const selectRef = useRef()


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
      setMinValue(values[0])
      setMaxValue(values[1])
      setIsFilterOn(true)
   }

   const selectColorHandler = color => {
      setProductColorStep(color)
      setProductColor(color)
      setCheckColor(false)
      setIsFilterOn(true)
   }

   const setCheckColorHandler = check => {
      const checked = check ? '' : productColorStep

      setCheckColor(check)
      setProductColor(checked)
      setIsFilterOn(true)
   }

   const setProductTypeHandler = (e, block, arg) => {

      block === 'cat' ? setCategory(arg) : setTag(arg)

      let elementsArr = Array.from(e.target.parentNode.children)

      elementsArr.forEach(element => {
         element.style.fontWeight = 'normal'
      })

      e.target.style.fontWeight = 'bold'

      setIsFilterTagOn(true)
   }

   const setOfferHandler = e => {

      let inputValuesArr = [...offer]
      const input = e.target

      if (input.checked) {
         inputValuesArr.push(input.value)
      } else {
         inputValuesArr = inputValuesArr.filter(value => value !== input.value)
      }

      setOffer(inputValuesArr)
      setIsFilterOn(true)
   }

   const cleanFiltersHandler = () => {

      const selectList = Array.from(selectRef.current.children)
      const categoriesList = Array.from(categoriesRef.current.children)
      const typesList = Array.from(typesRef.current.children)
      const offerList = Array.from(offerRef.current.children)

      selectList.forEach((element, i) => {
         if (i === 0) {
            element.selected = true
         } else {
            element.selected = false
         }
      })

      categoriesList.forEach((element, i) => {
         i === 1 ? element.style.fontWeight = 'bold' : element.style.fontWeight = 'normal'
      })

      typesList.forEach((element, i) => {
         i === 1 ? element.style.fontWeight = 'bold' : element.style.fontWeight = 'normal'
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
      console.log('CHAMOU CLEAN');


      setOrder('default')
      setTag('all-products')
      setCategory('all')
      setCheckColor(true)
      setProductColor('')
      setOffer([])
      
      sliderRef.current.resetPriceSlider()

      setIsFilterOn(false)
      setIsFilterTagOn(false)
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
               setOrderCB={(value) => setOrder(value)}
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
                     checkColor={checkColor}
                     sliderRef={sliderRef}
                     minValue={initial_min_value}
                     maxValue={initial_max_value}
                     setOfferCB={e => setOfferHandler(e)}
                     setCheckColorHandlerCB={setCheckColorHandler}
                     selectColorHandlerCB={selectColorHandler}
                     setPriceRangeCB={setPriceRange}
                     setProductTypeHandlerCB={(e, type, value) => setProductTypeHandler(e, type, value)}
                  />
                  <FilterBottom cleanFiltersHandlerCB={cleanFiltersHandler} />
               </div>
               <Products
                  // products={products} // => Envia o array com os produtos que serão exibidos
                  pageLimit={pageLimit}  // => Número limite de produtos a serem mostrados inicialmente
                  tag={tag} // => Tag que determina quais produtos serão mostrados
                  category={category} // => Categoria dos produtos que serão mostrados
                  valueRange={[min_value, max_value]} // => Intervalo de preço que determinará os produtos que serão mostrados
                  productColor={productColor} // => Filtra o produto por cor
                  offer={offer} // => Filtra os produtos por tipo de oferta
                  order={order}
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