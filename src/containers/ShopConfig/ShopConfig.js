import React, { Component } from 'react'

import classes from './ShopConfig.module.css'

import Filter from '../../components/Shop/Filter/Filter'
import BestDealSlider from '../../components/Shop/BestDealSlider/BestDealSlider'

import products from '../../Data/productsData'


class ShopConfig extends Component {

    render () {
        return (
            <div>
                <h1>SHOP</h1>
                <Filter products={products}/>
                <BestDealSlider products={products} />
            </div>
        )
    }
}

export default ShopConfig