const cartDataFn = () => {
   let cartData = []
   const cartDataStorage = JSON.parse(localStorage.getItem('cartList'))

   if (cartDataStorage !== null) {
      cartData = cartDataStorage
   }

   return cartData
}

export default cartDataFn