import React, {Component, Fragment} from 'react'

import './MainPageConfig.css'

import MainPageHeader from '../../components/MainPage/MainPageHeader/MainPageHeader'
import MainPageShop from '../../components/MainPage/MainPageShop/MainPageShop'
import MainPageProducts from '../../components/MainPage/MainPageProducts/MainPageProducts'
import MainPageDiscounts from '../../components/MainPage/MainPageDiscounts/MainPageDiscounts'

class MainPageConfig extends Component {

    render () {
        return (
            <Fragment>
                <MainPageHeader />
                <MainPageShop />
                <MainPageProducts />
                <MainPageDiscounts />
            </Fragment>
        )
    }
}

export default MainPageConfig