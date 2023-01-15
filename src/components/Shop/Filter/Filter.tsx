import { useState, useEffect, useRef, useContext } from 'react'
import classes from './Filter.module.css'

import { FilterDataContext } from './context/FilterContext'

import useCallResizeWarning from 'hooks/useCallResizeWarning'

import Toastify from 'components/Shared/UI/Toastify/Toastify'
import Products from 'components/Shared/Products/Products'
import FilterHeader from './FilterHeader/FilterHeader'
import FilterBottom from './FilterBottom/FilterBottom'
import FilterBody from './FilterBody/FilterBody'


const toastifyMsg: [string, string] = [
   'Reload The Page',
   'In order for all components to adjust to the new screen dimensions, the page should be reloaded.'
]

const Filter = () => {
   const [pageLimit, setPageLimit] = useState(12)
   const [filterOpen, setFilterOpen] = useState(false)
   const [translateValue, setTranslateValue] = useState(() => {
      if (window.innerWidth <= 414) {
         return -900
      } else {
         return -391
      }
   })
   const [filter_height, setFilterHeight] = useState(0)

   const containerRef = useRef<HTMLDivElement>(null)
   const filterRef = useRef<HTMLDivElement>(null)

   const filterReducerState = useContext(FilterDataContext)

   const { openToastify } = useCallResizeWarning(containerRef)
   
   const translateFilter = {
      marginTop: translateValue + 'px',
      transition: '.8s ease-in-out'
   } as const
   
   const openFilterHandler = () => {
      const open = filterOpen ? false : true
      const translate = translateValue < 0 ? 0 : -filter_height

      setFilterOpen(open)
      setTranslateValue(translate)
   }

   const setFilterHeightHandler = () => {
      if  (filterRef) {
         if (filterRef.current) {
            const fHeight = filterRef.current.offsetHeight
   
            setTranslateValue(-fHeight)
            setFilterHeight(fHeight)
         }
      }
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

   useEffect(() => {
      setFilterHeightHandler()
   }, [])


   return (
      <>
         <Toastify
            toastifyDetails={toastifyMsg}
            open={openToastify}
         />
         <div 
            className={classes.Filter_container} 
            ref={containerRef} 
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
               />
            </div>
         </div>
      </>
   )
}

export default Filter