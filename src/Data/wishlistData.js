let wishlist = []
const wishlistStorage = JSON.parse(localStorage.getItem('wishlist'))

if (wishlistStorage !== null) {
    wishlist = wishlistStorage
} 

export default wishlist