const cartListDataFn = () => {
   let cartData = []
   const cartDataStorage = JSON.parse(localStorage.getItem('cartList'))

   if (cartDataStorage !== null) {
      cartData = cartDataStorage
   }

   return cartData
}

const wishlistDataFn = () => {

   let wishlist = []
   const wishlistStorage = JSON.parse(localStorage.getItem('wishlist'))
   
   if (wishlistStorage !== null) {
       wishlist = wishlistStorage
   } 
   
   return wishlist
} 

export { cartListDataFn, wishlistDataFn }