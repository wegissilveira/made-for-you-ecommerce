import { useReducer, useMemo } from "react"

import filterReducer from "./filterReducer"
import { initialFilter } from "../helpers/values"

import { 
   setTag,
   setCategory,
   setColor,
   setOffer,
   setOrder,
   setPrice,
   resetFilter
} from "./action-creators"

import { 
   UpdateProductsListContext,
   FilterDataContext
} from "./FilterContext"


const FilterProvider = (props) => {
   const [filterReducerState, dispatch] = useReducer(filterReducer, initialFilter)

   const updateProductsListHandler = useMemo(() => {
      const updateTag = (tag) => {
         dispatch(setTag(tag))
      }
      
      const updateCategory = (cat) => {
         dispatch(setCategory(cat))
      }

      const updateColor = (color) => {
         dispatch(setColor(color))
      }

      const updateOffer = (offer) => {
         dispatch(setOffer(offer))
      }

      const updateOrder = (order) => {
         dispatch(setOrder(order))
      }

      const updatePrice = (priceRange) => {
         dispatch(setPrice(priceRange))
      }

      const setDefaultValues = () => {
         dispatch(resetFilter())
      }

      return { 
         updateTag, 
         updateCategory, 
         updateColor, 
         updateOffer, 
         updateOrder, 
         updatePrice, 
         setDefaultValues 
      }

   }, [])

   // console.log('filterReducerState: ', filterReducerState);

   return (
      <UpdateProductsListContext.Provider value={updateProductsListHandler}>
         <FilterDataContext.Provider value={filterReducerState}>
            {props.children}
         </FilterDataContext.Provider>
      </UpdateProductsListContext.Provider>
   )
} 

export default FilterProvider