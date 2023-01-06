import { HEX } from "common/types"

type initialValue = {
   productColor: HEX
   productQty: number
   productSize: string
   productUpdated: boolean
}

export const initialValue: initialValue = {
   productColor: '' as HEX,
   productQty: 1,
   productSize: '100x100',
   productUpdated: false
}