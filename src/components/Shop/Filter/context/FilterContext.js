import { createContext } from "react"
import { initialFilter } from "../helpers/values"

export const UpdateFilterListContext = createContext({
   updateTag: (tag) => {},
   updateCategory: (cat) => {},
   updateFilterColor: (color) => {},
   updateOffer: (offerArr) => {},
   updateOrder: (order) => {},
   updatePrice: (priceRange) => {},
   setDefaultValues: () => {},
})

export const FilterDataContext = createContext(initialFilter)