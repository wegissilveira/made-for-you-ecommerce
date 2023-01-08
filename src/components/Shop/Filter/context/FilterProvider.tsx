import { useReducer, useMemo } from "react"
import filterReducer from "./filterReducer"
import { initialFilter } from "../helpers/values"
import { Tag, Category, Offer, Order, PriceRange, ColorValues } from "common/types"

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
   UpdateFilterListContext,
   FilterDataContext
} from "./FilterContext"


type Props = {
   children: React.ReactNode
}

const FilterProvider = (props: Props) => {
   const [filterReducerState, dispatch] = useReducer(filterReducer, initialFilter)

   const updateProductsListHandler = useMemo(() => {
      const updateTag = (tag: Tag) => {
         dispatch(setTag(tag))
      }
      
      const updateCategory = (cat: Category) => {
         dispatch(setCategory(cat))
      }

      const updateFilterColor = (color: ColorValues) => {
         dispatch(setColor(color))
      }

      const updateOffer = (offerArr: Offer[]) => {
         dispatch(setOffer(offerArr))
      }

      const updateOrder = (order: Order) => {
         dispatch(setOrder(order))
      }

      const updatePrice = (priceRange: PriceRange) => {
         dispatch(setPrice(priceRange))
      }

      const setDefaultValues = () => {
         dispatch(resetFilter())
      }

      return { 
         updateTag, 
         updateCategory, 
         updateFilterColor, 
         updateOffer, 
         updateOrder, 
         updatePrice, 
         setDefaultValues 
      }

   }, [])

   return (
      <UpdateFilterListContext.Provider value={updateProductsListHandler}>
         <FilterDataContext.Provider value={filterReducerState}>
            {props.children}
         </FilterDataContext.Provider>
      </UpdateFilterListContext.Provider>
   )
} 

export default FilterProvider