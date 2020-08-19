import React, { Component, Fragment } from 'react'

import ShopProducts from '../../components/Shop/ShopProducts/ShopProducts'
import ProductCard from '../../components/Shop/ProductCard/ProductCard'

import './ShopConfig.css'

class ShopConfig extends Component {

    render () {
        return (
            <Fragment>
                <ShopProducts />
                {/* <ProductCard /> */}
            </Fragment>
        )
    }
}

export default ShopConfig