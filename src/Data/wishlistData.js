const wishlistFn = () => {

    let wishlist = []
    const wishlistStorage = JSON.parse(localStorage.getItem('wishlist'))
    
    if (wishlistStorage !== null) {
        wishlist = wishlistStorage
    } 
    
    return wishlist
} 

export default wishlistFn