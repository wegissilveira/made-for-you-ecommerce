type RGB = `rgb(${number}, ${number}, ${number})`
export type HEX = `#${string}`
export type Color = RGB | HEX

export type Offer = 'new' | 'old' | 'best-seller' | 'sales'
export type Category = 'bathroom' | 'living-room' | 'kitchen' | 'furniture' | 'bedroom' | 'children-room' | 'all'
export type Tag = 'textile'| 'decorations' | 'furniture' | 'lightning' | 'accessories' | 'all-products'
type Order = 'default' | 'low-high' | 'high-low' | 'alphabetical'

export type SliderDirection = 'next' | 'previous'

export type QtyAction = 'increase' | 'decrease'

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
   changeQtyCallBack: (qtyObj: SetQty) => void
   productQtyCheckout: number
}

export type OfferOptions = {
   value: Offer
   title: string
} 

export type FilterType = {
   productsState: ProductType[]
   tag: Tag
   category: Category
   color:  {
      currentColor: Color
      lastSelectedColor: Color
   }
   offer: Offer[]
   order: Order
   priceRange: {
      minValue: number
      maxValue: number
   }
   isFilterOn: boolean
   isFilterTagOn: boolean
}