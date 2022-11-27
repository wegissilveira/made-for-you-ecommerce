import { createContext } from "react"
import { initialFilter } from "../helpers/values"

export const UpdateProductsListContext = createContext({
   updateTag: () => {},
   updateCategory: () => {},
   updateFilterColor: () => {},
   updateOffer: () => {},
   updateOrder: () => {},
   updatePrice: () => {},
   setDefaultValues: () => {},
})

export const FilterDataContext = createContext({filterReducerState: initialFilter})