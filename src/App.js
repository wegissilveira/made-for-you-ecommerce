import React from 'react';

import './App.css';

import Layout from './containers/Layout/Layout'
import MainPageConfig from './containers/MainPageConfig/MainPageConfig'
import ShopConfig from './containers/ShopConfig/ShopConfig'

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
  faCheck
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
  faCheck
)

function App() {
  return (
    <Layout>
      {/* <MainPageConfig /> */}
      <ShopConfig />
    </Layout>
  );
}

export default App;
