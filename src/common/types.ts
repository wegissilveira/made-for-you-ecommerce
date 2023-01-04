export type Cart = {
   _id: string
   qtde: number
   color: string
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

type Offer = 'new' | 'old' | 'best-seller' | 'sales'
type Category = 'bathroom' | 'living-room' | 'kitchen' | 'furniture' | 'bedroom' | 'children-room'
type Tag = 'textile'| 'decorations' | 'furniture' | 'bedroom'

export type ProductType = {
   _id: string 
   name: string 
   price: string
   img: string
   tag: Tag
   category: Category
   imgsDemo: string[]
   colors: string[]
   deal: boolean
   offer: Offer
   slide?: [boolean, string]
}

export type SliderDirection = 'next' | 'previous'

export type MainSliderType = {
   img: string
   alt: string
   linkText: string[]
   cat: string
}

export type MinorSliderType = {
   _id: string
   img: string
   alt: string
   name: string
   price: string
   bgColor: string
   cat: string
}