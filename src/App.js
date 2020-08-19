import React from 'react';

import './App.css';

import Layout from './containers/Layout/Layout'
import MainPageConfig from './containers/MainPageConfig/MainPageConfig'
import ShopConfig from './containers/ShopConfig/ShopConfig'

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
  faChevronUp
} from '@fortawesome/free-solid-svg-icons'

import {
  faUser,
  faHeart,
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
  faChevronUp
)

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={MainPageConfig} />
          <Route path="/shop" exact component={ShopConfig} />
        </Switch>
      </Layout>
    </BrowserRouter>
    
  );
}

export default App;
