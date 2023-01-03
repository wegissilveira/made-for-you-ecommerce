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

export type ProductsType = {
   _id: string 
   name: string 
   price: string
   img: string
   tag: string
   category: string
   imgsDemo: string[]
   colors: string[]
   deal: boolean
   offer: string
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