import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client'

import App from './App'

import { cartListDataFn, wishlistDataFn } from "services"
import { ActionTypesGlobal } from 'store/actions/actionTypes'
import reducer from './store/reducers/reducer'

import { onError } from '@apollo/client/link/error'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
  }
})

const client = new ApolloClient({
  link: errorLink.concat(new HttpLink({
    uri: 'http://localhost/mfy_back/',
  })),
  cache: new InMemoryCache()
})

const store = createStore(reducer)

store.dispatch({
  type: ActionTypesGlobal.CARTLIST,
  cartList: cartListDataFn()
})

store.dispatch({
  type: ActionTypesGlobal.WISHLIST,
  wishlist: wishlistDataFn()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
