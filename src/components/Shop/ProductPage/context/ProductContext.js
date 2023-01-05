import { createContext } from "react"
import { initialValue } from "../helpers/values"

export const UpdateProductValuesContext = createContext({
   updateTag: () => {},
   updateSize: () => {},
   updateQty: () => {},
   updateColor: (color, update) => {}
})

export const ProductDataContext = createContext(initialValue)