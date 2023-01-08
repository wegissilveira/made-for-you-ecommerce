import { createContext } from "react"
import { initialValue } from "../helpers/values"
import { Color } from "common/types"

export const UpdateProductValuesContext = createContext({
   updateColor: (color: Color, update: boolean) => {},
   updateSize: (size: string, update: boolean) => {},
   updateQty: (qty: number, update: boolean) => {},
   finishUpdate: () => {}
})

export const ProductDataContext = createContext(initialValue)