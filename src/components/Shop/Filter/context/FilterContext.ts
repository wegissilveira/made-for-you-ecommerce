import { createContext } from "react"
import { initialFilter } from "../helpers/values"
import { Tag, Category, ColorValues, Offer, Order, PriceRange } from "common/types"

export const UpdateFilterListContext = createContext({
   updateTag: (tag: Tag) => {},
   updateCategory: (category: Category) => {},
   updateFilterColor: (color: ColorValues) => {},
   updateOffer: (offerArr: Offer[]) => {},
   updateOrder: (order: Order) => {},
   updatePrice: (priceRange: PriceRange) => {},
   setDefaultValues: () => {},
})

export const FilterDataContext = createContext(initialFilter)