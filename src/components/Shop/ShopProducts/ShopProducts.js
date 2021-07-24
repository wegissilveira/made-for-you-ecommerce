import React from 'react'

import Filter from '../Filter/Filter'
import BestDealSlider from '../BestDealSlider/BestDealSlider'
import products from '../../../Data/productsData'

import './ShopProducts.module.css'

const ShopProducts = props => {

    return (
        <div>
            <h1>SHOP</h1>
            <Filter 
                products={products}
            />
            <BestDealSlider products={products} />
        </div>
    )
}

export default ShopProducts