import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'

import { cartListDataFn, wishlistDataFn } from "services"
import { ActionTypesGlobal } from 'store/actions/actionTypes'
import reducer from './store/reducers/reducer'

const store = createStore(reducer)

store.dispatch({
  type: ActionTypesGlobal.CARTLIST,
  cartList: cartListDataFn()
})

store.dispatch({
  type: ActionTypesGlobal.WISHLIST,
  wishlist: wishlistDataFn()
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
