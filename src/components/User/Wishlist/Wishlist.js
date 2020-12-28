import React from 'react'

import Products from '../../Shared/Products/Products'

import './Wishlist.module.css'

const Wishlist = props => {
    return (
        <div>
            <h1>WISHLIST</h1>
            <Products
                wishlist={true}
            />
        </div>
    )
}

export default Wishlist