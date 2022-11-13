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

import { UpdateProductsListContext } from "./FilterContext"


const FilterProvider = (props) => {
   const [filterReducerState, dispatch] = useReducer(filterReducer, initialFilter)

   const updateProductsListHandler = useMemo(() => {
      const updateTag = (tag) => {
         dispatch(setTag(tag))
         console.log('TAG CONTEXT: ', tag);
      }

      return { updateTag }
   }, [])

   console.log('filterReducerState: ', filterReducerState);

   return (
      <UpdateProductsListContext.Provider value={updateProductsListHandler}>
         {props.children}
      </UpdateProductsListContext.Provider>
   )
} 

export default FilterProvider