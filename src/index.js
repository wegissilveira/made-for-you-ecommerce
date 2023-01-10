import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'

import { cartListDataFn, wishlistDataFn } from "services"
import * as actionTypes from 'store/actions/actionTypes'
import reducer from './store/reducers/reducer'

const store = createStore(reducer)

store.dispatch({
  type: actionTypes.CARTLIST,
  value: cartListDataFn()
})

store.dispatch({
  type: actionTypes.WISHLIST,
  value: wishlistDataFn()
})

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
