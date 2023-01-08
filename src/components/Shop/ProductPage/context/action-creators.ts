import { Color, ProductAction } from "common/types"
import { ActionTypesProduct } from "./actionTypes"

export const setQty = (qty: number, update: boolean) => ({
   type: ActionTypesProduct.UPDATE_QTY, 
   productQty: qty, 
   productUpdate: update 
} as ProductAction)

export const setSize = (size: string, update: boolean) => ({
   type: ActionTypesProduct.UPDATE_SIZE, 
   productSize: size, 
   productUpdate: update 
} as ProductAction)

export const setColor = (color: Color, update: boolean) => ({
   type: ActionTypesProduct.UPDATE_COLOR, 
   productColor: color, 
   productUpdate: update 
} as ProductAction)

export const setUpdate = () => ({
   type: ActionTypesProduct.FINISH_UPDATE 
} as ProductAction)