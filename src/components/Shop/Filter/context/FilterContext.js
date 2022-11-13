import { createContext } from "react"
import { initialFilter } from "../helpers/values"


export const UpdateProductsListContext = createContext({
   updateTag: () => {},
   updateCategory: () => {},
   updateColor: () => {},
   updateOffer: () => {},
   updateOrder: () => {},
   updatePrice: () => {},
   setDefaultValues: () => {},
})

export const FilterDataContext = createContext({filterReducerState: initialFilter})