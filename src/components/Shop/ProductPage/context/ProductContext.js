import { createContext } from "react"
import { initialValue } from "../helpers/values"

export const UpdateProductValuesContext = createContext({
   updateTag: () => {},
   updateSize: () => {},
   updateQty: () => {}
})

export const ProductDataContext = createContext({productReducerState: initialValue})