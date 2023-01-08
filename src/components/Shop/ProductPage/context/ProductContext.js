import { createContext } from "react"
import { initialValue } from "../helpers/values"

export const UpdateProductValuesContext = createContext({
   updateColor: (color, update) => {},
   updateSize: (size, update) => {},
   updateQty: (qty, update) => {},
   finishUpdate: () => {}
})

export const ProductDataContext = createContext(initialValue)