import React from 'react';

import './App.css';

import Layout from './containers/Layout/Layout'
import MainPageConfig from './containers/MainPageConfig/MainPageConfig'
import ShopConfig from './containers/ShopConfig/ShopConfig'
import ProductPage from './components/Shop/ProductPage/ProductPage'
import Cart from './components/Shop/Cart/Cart'
import Wishlist from './components/User/Wishlist/Wishlist'
import Products from './components/Shared/Products/Products'
import UserLogin from './components/User/UserLogin/UserLogin'
import UserSignUp from './components/User/UserSignUp/UserSignUp'
import Contact from './components/Contact/Contact'

import ScrollToTop from './HOC/ScrollToTop'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBars,
  faSearch,
  faSuitcase,
  faArrowRight,
  faArrowLeft,
  faEye,
  faPlane,
  faGift,
  faAward,
  faTrophy,
  faFilter,
  faShareAlt,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCaretDown,
  faTimes,
  faLongArrowAltLeft,
  faSyncAlt,
  faHeart,
  faPhoneAlt,
  faEnvelope,
  faShoppingBag
} from '@fortawesome/free-solid-svg-icons'

import {
  faUser,
  faHeart as regularFaheart
} from '@fortawesome/free-regular-svg-icons'



library.add(
  fab,
  faBars,
  faSearch,
  faUser,
  faHeart,
  faSuitcase,
  faArrowRight,
  faArrowLeft,
  faEye,
  faPlane,
  faGift,
  faAward,
  faTrophy,
  faFilter,
  faShareAlt,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCaretDown,
  faTimes,
  faLongArrowAltLeft,
  faSyncAlt,
  regularFaheart,
  faPhoneAlt,
  faEnvelope,
  faShoppingBag
)



function App() {
  return (
    
      <BrowserRouter >        
        <Layout>
          <ScrollToTop />
            <Switch>
              <Route path="/" exact component={MainPageConfig} />
              <Route path="/search/:searchKey" exact component={Products} />
              <Route path="/shop/" exact component={ShopConfig} />
              <Route path="/shop/:cat" exact component={Products} />
              <Route path="/shop/product/:id" exact component={ProductPage} />
              <Route path="/cart/" exact component={Cart} />
              <Route path="/wishlist/" exact component={Wishlist} />
              <Route path="/user-login/" exact component={UserLogin} />
              <Route path="/user-signup/" exact component={UserSignUp} />
              <Route path="/contact/" exact component={Contact} />
            </Switch>
        </Layout>
      </BrowserRouter>
    
    
  );
}

export default App;
