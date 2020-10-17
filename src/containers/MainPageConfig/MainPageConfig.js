import React, {Component, Fragment} from 'react'

import MainPageHeader from '../../components/MainPage/MainPageHeader/MainPageHeader'
import MainPageShopByRoom from '../../components/MainPage/MainPageShopByRoom/MainPageShopByRoom'
import MainPageProducts from '../../components/MainPage/MainPageProducts/MainPageProducts'
import MainPageDiscounts from '../../components/MainPage/MainPageDiscounts/MainPageDiscounts'

class MainPageConfig extends Component {

    render () {
        return (
            <Fragment>
                <MainPageHeader />
                <MainPageShopByRoom />
                <MainPageProducts />
                <MainPageDiscounts />
            </Fragment>
        )
    }
}

export default MainPageConfig