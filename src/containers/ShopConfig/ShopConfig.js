import React, { Component, Fragment } from 'react'

import ShopProducts from '../../components/Shop/ShopProducts/ShopProducts'


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