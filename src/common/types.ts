type RGB = `rgb(${number}, ${number}, ${number})`
export type HEX = `#${string}`
export type Color = RGB | HEX

type Offer = 'new' | 'old' | 'best-seller' | 'sales'
type Category = 'bathroom' | 'living-room' | 'kitchen' | 'furniture' | 'bedroom' | 'children-room'
type Tag = 'textile'| 'decorations' | 'furniture' | 'bedroom'

export type SliderDirection = 'next' | 'previous'

export type Cart = {
   _id: string
   qtde: number
   color: Color
   size: string
   price: string
   prodName: string
   prodImg: string
}

export type InitialState = {
   cartListState: Cart[]
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