import { ActionTypeFilter } from "components/Shop/Filter/context/actionTypes"
import { ActionTypesProduct } from "components/Shop/ProductPage/context/actionTypes"
import { ActionTypesGlobal } from 'store/actions/actionTypes'

type RGB = `rgb(${number}, ${number}, ${number})`
export type HEX = `#${string}`
export type Color = RGB | HEX
export type ColorValues = {
   currentColor: Color
   lastSelectedColor: Color
}

export type Offer = 
   | 'new' 
   | 'old'
   | 'best-seller'
   | 'sales'

export type Category = 
   | 'bathroom'
   | 'living-room' 
   | 'kitchen' 
   | 'furniture' 
   | 'bedroom' 
   | 'children-room' 
   | 'all'

export type Tag = 
   | 'textile'
   | 'decorations' 
   | 'furniture' 
   | 'lightning' 
   | 'accessories' 
   | 'all-products'

export type Order = 
   | 'default' 
   | 'low-high' 
   | 'high-low' 
   | 'alphabetical'

export enum FilterValues {
   CATEGORY = 'category',
   TAG = 'tag',
   ORDER = 'order',
   OFFER = 'offer',
   COLOR = 'color',
   PRICE_RANGE = 'priceRange',
}

export type SliderDirection = 'next' | 'previous'

export type QtyAction = 'increase' | 'decrease'

export type GalleryQty = 'more' | 'less'

export type ProductCartType = {
   _id: string
   qtde: number
   color: Color
   size: string
   price: string
   prodName: string
   prodImg: string
}

export type InitialState = {
   cartListState: ProductCartType[]
   wishlistState: string[]
   totalCartValue: number
}

export type ProductType = {
   _id: string 
   name: string 
   price: string
   img: string
   tag: Tag
   category: Category
   imgsDemo: string[]
   colors: Color[]
   deal: boolean
   offer: Offer
   slide?: [boolean, Color]
}

export type MainSliderType = {
   img: string
   alt: string
   linkText: string[]
   cat: Category
}

export type MinorSliderType = {
   _id: string
   img: string
   alt: string
   name: string
   price: string
   bgColor: Color
   cat: Category
}

export type SetQtyDesk = {
   mobile: false
   newQty: number
   action: QtyAction
}

export type SetQtyMobile = {
   mobile: true
   qtyMobile: number   
   newQty: number
   action: QtyAction
}

export type SetQty = SetQtyDesk | SetQtyMobile

export type QtyProps = {
   max: number
   changeQtyCallBack?: (qtyObj: SetQty) => void
   productQtyCheckout?: number
}

export type OfferOptions = {
   value: Offer
   title: string
} 

export type PriceRange = {
   minValue: number,
   maxValue: number
}

export type FilterType = {
   productsState: ProductType[]
   tag: Tag
   category: Category
   color:  ColorValues
   offer: Offer[]
   order: Order
   priceRange: {
      minValue: number
      maxValue: number
   }
   isFilterOn: boolean
   isFilterTagOn: boolean
}

export type FilterTag = {
   currentFilterValue: Tag,
   type: FilterValues.TAG
}

export type FilterCat = {
   currentFilterValue: Category,
   type: FilterValues.CATEGORY
}

export type FilterOrder = {
   currentFilterValue: Order,
   type: FilterValues.ORDER
}

export type FilterOffer = {
   currentFilterValue: Offer[],
   type: FilterValues.OFFER
}

export type FilterColor = {
   currentFilterValue: ColorValues,
   type: FilterValues.COLOR
}

export type FilterPrice = {
   currentFilterValue: PriceRange,
   type: FilterValues.PRICE_RANGE
}

export type FilterBase = 
   | FilterTag
   | FilterCat   
   | FilterOrder
   | FilterOffer 
   | FilterColor
   | FilterPrice

type SetTag = {
   type: ActionTypeFilter.SET_TAG
   tag: Tag
}

type SetCategory = {
   type: ActionTypeFilter.SET_CATEGORY
   category: Category
}

type SetColor = {
   type: ActionTypeFilter.SET_COLOR
   color: ColorValues
}

type SetOffer = {
   type: ActionTypeFilter.SET_OFFER
   offer: Offer[]
}

type SetOrder = {
   type: ActionTypeFilter.SET_ORDER
   order: Order
}

type SetPrice = {
   type: ActionTypeFilter.SET_PRICE
   priceRange: PriceRange
}

type ResetFilter = {
   type: ActionTypeFilter.RESET_FILTER
}

export type FilterAction = 
   | SetTag
   | SetCategory
   | SetColor
   | SetOffer
   | SetOrder
   | SetPrice
   | ResetFilter

   
export type ProductPageType = {
   productColor: HEX
   productQty: number
   productSize: string
   productUpdated: boolean
}

type UpdateColor = {
   type: ActionTypesProduct.UPDATE_COLOR
   productColor:  HEX
   productUpdate: boolean
}

type UpdateSize = {
   type: ActionTypesProduct.UPDATE_SIZE
   productSize: string
   productUpdate: boolean
}

type UpdateQty = {
   type: ActionTypesProduct.UPDATE_QTY
   productQty: number
   productUpdate: boolean
}

type FinishUpdate = {
   type: ActionTypesProduct.FINISH_UPDATE
   productUpdate: boolean
}

export type ProductAction = 
   | UpdateColor
   | UpdateSize
   | UpdateQty
   | FinishUpdate


export enum SearchTerms {
   'SEARCH_KEY' = 'searchKey',
   'CAT' = 'cat'
}

export type SearchParams = {
   searchKey: SearchTerms.SEARCH_KEY
   cat: SearchTerms.CAT
}

type UpdateWishlist = {
   type: ActionTypesGlobal.WISHLIST
   wishlist: string[]
}

type updateCart = {
   type: ActionTypesGlobal.CARTLIST
   cartList: ProductCartType[]
}

type UpdateFinalValue = {
   type: ActionTypesGlobal.UPDATE_FINAL_VALUE
   totalCartValue: number
}

export type GlobaAction = 
   | UpdateWishlist
   | updateCart
   | UpdateFinalValue