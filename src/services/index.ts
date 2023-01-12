import { ProductCartType } from "common/types"

const cartListDataFn = () => {
   let cartData: ProductCartType[] = []
   const cartDataStorage = localStorage.getItem('cartList')

   if (cartDataStorage !== null) {
      cartData = JSON.parse(cartDataStorage)
   }

   return cartData
}

const wishlistDataFn = () => {
   let wishlist: string[] = []
   const wishlistStorage = localStorage.getItem('wishlist')
   
   if (wishlistStorage !== null) {
       wishlist = JSON.parse(wishlistStorage)
   } 
   
   return wishlist
} 

export { cartListDataFn, wishlistDataFn }