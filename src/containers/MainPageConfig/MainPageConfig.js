import React, {Component, Fragment} from 'react'

import './MainPageConfig.css'

import MainPageHeader from '../../components/MainPageHeader/MainPageHeader'
import MainPageShop from '../../components/MainPageShop/MainPageShop'
import MainPageProducts from '../../components/MainPageProducts/MainPageProducts'
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